/*
  # Create subscribers table

  1. New Tables
    - `subscribers`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `created_at` (timestamp)
      - `status` (text) - For tracking subscription status (active/unsubscribed)
  
  2. Security
    - Enable RLS on `subscribers` table
    - Add policy for inserting new subscribers
    - Add policy for authenticated users to read their own data
*/

CREATE TABLE IF NOT EXISTS subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  status text DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed'))
);

ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert new subscribers
CREATE POLICY "Anyone can subscribe" ON subscribers
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Users can only see their own subscription
CREATE POLICY "Users can view own subscription" ON subscribers
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);