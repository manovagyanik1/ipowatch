import express from 'express';
import sgMail from '@sendgrid/mail';
import { createClient } from '@supabase/supabase-js';
import getEmailTemplate from '../templates/emails.js';

const router = express.Router();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

console.log('Supabase URL:', process.env.SUPABASE_URL);
console.log('Supabase Service Key:', process.env.SUPABASE_SERVICE_KEY);

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// Subscribe endpoint
router.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body;
    
    // Check if user exists and their status
    const { data: existingSubscriber } = await supabase
      .from('subscribers')
      .select('status, confirmation_token')
      .eq('email', email)
      .single();

    if (existingSubscriber) {
      if (existingSubscriber.status === 'active') {
        return res.status(400).json({ error: 'This email is already subscribed' });
      }
      
      if (existingSubscriber.status === 'pending') {
        // User exists but hasn't confirmed, send confirmation email again
        const confirmationUrl = `${process.env.APP_URL}/confirm-subscription?token=${existingSubscriber.confirmation_token}`;
        
        const msg = {
          to: email,
          from: {
            email: process.env.FROM_EMAIL,
            name: 'IPO Watch'
          },
          subject: 'Confirm your IPO Watch subscription',
          html: getEmailTemplate('confirmSubscription', { confirmationUrl })
        };

        try {
          const [response] = await sgMail.send(msg);
          console.log('SendGrid Resend Response:', {
            statusCode: response.statusCode,
            headers: response.headers,
            body: response.body
          });
          
          if (response.statusCode !== 202) {
            throw new Error(`SendGrid returned status ${response.statusCode}`);
          }
        } catch (emailError) {
          console.error('SendGrid Resend Error:', {
            error: emailError.message,
            response: emailError.response?.body,
            code: emailError.code,
            stack: emailError.stack
          });
          throw emailError;
        }
        
        return res.status(200).json({ 
          message: 'Please check your email (including spam/junk folder) to confirm your subscription'
        });
      }
    }

    // Create new subscriber with pending status
    const { data: subscriber, error } = await supabase
      .from('subscribers')
      .insert([{ 
        email, 
        status: 'pending',
        confirmation_sent_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) {
      throw error;
    }

    // Send confirmation email
    const confirmationUrl = `${process.env.APP_URL}/confirm-subscription?token=${subscriber.confirmation_token}`;
    
    const msg = {
      to: email,
      from: {
        email: process.env.FROM_EMAIL,
        name: 'IPO Watch'
      },
      subject: 'Confirm your IPO Watch subscription',
      html: getEmailTemplate('confirmSubscription', { confirmationUrl })
    };

    try {
      const [response] = await sgMail.send(msg);
      console.log('SendGrid Response:', {
        statusCode: response.statusCode,
        headers: response.headers,
        body: response.body
      });
      
      if (response.statusCode !== 202) {
        throw new Error(`SendGrid returned status ${response.statusCode}`);
      }
    } catch (emailError) {
      // If email fails to send, update status to unsubscribed
      console.error('SendGrid Error:', {
        error: emailError.message,
        response: emailError.response?.body,
        code: emailError.code,
        stack: emailError.stack
      });

      await supabase
        .from('subscribers')
        .update({ status: 'unsubscribed' })
        .eq('id', subscriber.id);
      
      throw emailError;
    }
    
    res.status(200).json({ 
      message: 'Please check your email (including spam/junk folder) to confirm your subscription'
    });
  } catch (error) {
    console.error('Subscription error:', error);
    if (error.response) {
      console.error('SendGrid Error Details:', {
        status: error.code,
        errors: error.response.body.errors
      });
    }
    res.status(500).json({ 
      error: error.response?.body?.errors?.[0]?.message || 'Failed to process subscription. Please try again.'
    });
  }
});

// Confirmation endpoint
router.get('/confirm/:token', async (req, res) => {
  try {
    const { token } = req.params;
  
    // First check if the token exists and is valid
    const { data: existingSubscriber } = await supabase
      .from('subscribers')
      .select('status')
      .match({ confirmation_token: token })
      .single();
  
    if (!existingSubscriber) {
      return res.status(400).json({ 
        error: 'Invalid confirmation link' 
      });
    }
  
    if (existingSubscriber.status === 'active') {
      return res.status(200).json({ 
        message: 'Email already confirmed' 
      });
    }
  
    const { data: subscriber, error } = await supabase
      .from('subscribers')
      .update({ 
        status: 'active',
        confirmed_at: new Date().toISOString()
      })
      .match({ confirmation_token: token, status: 'pending' })
      .select()
      .single();
  
    if (error) {
      console.error('Confirmation update error:', error);
      return res.status(400).json({ 
        error: 'Failed to confirm subscription' 
      });
    }
  
    res.status(200).json({ 
      message: 'Subscription confirmed successfully' 
    });
  } catch (error) {
    console.error('Confirmation error:', error);
    res.status(500).json({ 
      error: 'Failed to confirm subscription' 
    });
  }
});

export const subscriberRouter = router; 