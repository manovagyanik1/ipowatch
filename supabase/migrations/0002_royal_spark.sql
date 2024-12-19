/*
  # Fix subscribers table RLS policy

  1. Changes
    - Drop existing policy
    - Create new policy that explicitly enables public access for inserts
    - Simplify the select policy
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can subscribe" ON subscribers;
DROP POLICY IF EXISTS "Users can view own subscription" ON subscribers;

-- Create new policies
CREATE POLICY "Enable insert for anonymous users" ON subscribers
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Enable read access for all users" ON subscribers
  FOR SELECT
  USING (true);