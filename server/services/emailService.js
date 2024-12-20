import sgMail from '@sendgrid/mail';
import { createClient } from '@supabase/supabase-js';
import { scrapeIpoData } from './ipoScraper.js';
import getEmailTemplate from '../templates/emails.js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export async function sendDailyUpdates() {
  try {
    // Get active subscribers
    const { data: subscribers, error: subscriberError } = await supabase
      .from('subscribers')
      .select('email')
      .eq('status', 'active');

    if (subscriberError) throw subscriberError;
    if (!subscribers.length) {
      console.log('No active subscribers found');
      return;
    }

    // Get today's IPO data
    const ipos = await scrapeIpoData();
    const activeIpos = ipos.filter(ipo => ipo.status === 'active');

    // Prepare email
    const date = new Date().toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

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
      return sgMail.send({
        ...msg,
        to: subscriber.email
      });
    });

    await Promise.all(emailPromises);
    console.log(`Daily update sent to ${subscribers.length} subscribers`);

  } catch (error) {
    console.error('Error sending daily updates:', error);
    throw error;
  }
} 