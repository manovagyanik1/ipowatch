import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function subscribeToNewsletter(email: string) {
  const { data, error } = await supabase
    .from('subscribers')
    .insert([{ email }])
    .select()
    .single();

  if (error) {
    if (error.code === '23505') { // Unique violation
      throw new Error('This email is already subscribed');
    }
    throw new Error('Failed to subscribe. Please try again.');
  }

  return data;
}