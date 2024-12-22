import sgMail from '@sendgrid/mail';
import { createClient } from '@supabase/supabase-js';
import { scrapeIpoData } from './ipoScraper.js';
import getEmailTemplate from '../templates/emails.js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export async function sendDailyUpdates() {
  const startTime = new Date().toISOString();
  console.log(`[${startTime}] Starting email service`);

  try {
    // Get active subscribers
    console.log(`[${startTime}] Fetching subscribers from Supabase`);
    const { data: subscribers, error: subscriberError } = await supabase
      .from('subscribers')
      .select('email')
      .eq('status', 'active');

    if (subscriberError) {
      console.error(`[${startTime}] Supabase error:`, subscriberError);
      throw subscriberError;
    }
    if (!subscribers.length) {
      console.log(`[${startTime}] No active subscribers found`);
      return;
    }
    console.log(`[${startTime}] Found ${subscribers.length} active subscribers`);

    // Get today's IPO data
    console.log(`[${startTime}] Fetching IPO data`);
    const ipos = await scrapeIpoData();
    // Process IPOs with sort values
    const processedIpos = ipos.map(ipo => ({
      ...ipo,
      statusSortValue: ipo.status === 'live' ? 2 : ipo.status === 'upcoming' ? 1 : 0,
      recommendationSortValue: ipo.recommendation === 'subscribe' ? 1 : 0
    }));
    
    // Sort by status (live first) and recommendation (subscribe first)
    const sortedIpos = processedIpos.sort((a, b) => {
      if (a.statusSortValue !== b.statusSortValue) {
        return b.statusSortValue - a.statusSortValue;
      }
      return b.recommendationSortValue - a.recommendationSortValue;
    });
    
    const activeIpos = sortedIpos.filter(ipo => ipo.status === 'live');
    console.log(`[${startTime}] Found ${activeIpos.length} active IPOs`);

    if (!activeIpos.length) {
      console.log(`[${startTime}] No active IPOs to send updates about`);
      return;
    }

    // Prepare email
    const date = new Date().toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    console.log(`[${startTime}] Preparing to send emails`);
    const msg = {
      from: {
        email: process.env.FROM_EMAIL,
        name: 'IPO Watch'
      },
      subject: `IPO Watch Daily Update - ${date}`,
      html: getEmailTemplate('dailyIpoUpdate', {
        ipos: activeIpos,
        date
      })
    };

    // Send to all subscribers
    const emailPromises = subscribers.map(subscriber => {
      console.log(`[${startTime}] Sending email to: ${subscriber.email}`);
      return sgMail.send({
        ...msg,
        to: subscriber.email
      });
    });

    await Promise.all(emailPromises);
    console.log(`[${startTime}] Successfully sent updates to ${subscribers.length} subscribers`);

  } catch (error) {
    console.error(`[${startTime}] Email service error:`, {
      message: error.message,
      stack: error.stack,
      type: error.name,
      supabaseError: error.code === 'supabase-error',
      sendgridError: error.code === 'sendgrid-error',
      details: error.response?.body
    });
    throw error;
  }
}
