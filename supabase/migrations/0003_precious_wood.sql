/*
  # Fix subscribers table RLS policies

  1. Changes
    - Drop existing policies that may be causing authorization issues
    - Create a new simplified policy for anonymous subscriptions
    - Enable public read access for basic functionality

  2. Security
    - Maintains RLS but allows anonymous subscriptions
    - Keeps email uniqueness constraint
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Enable insert for anonymous users" ON subscribers;
DROP POLICY IF EXISTS "Enable read access for all users" ON subscribers;

-- Create new simplified policy for anonymous subscriptions
CREATE POLICY "Allow anonymous subscriptions"
ON subscribers
FOR INSERT
TO anon
WITH CHECK (true);

-- Allow public read access
CREATE POLICY "Allow public read access"
ON subscribers
FOR SELECT
TO anon
USING (true);