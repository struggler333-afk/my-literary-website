/*
# Author portfolio: stories, books, and contact messages

1. New Tables
- `stories` — literary works / thoughts displayed on the public site.
  - id (uuid, pk)
  - title (text)
  - excerpt (text, short summary)
  - body (text, full content / markdown)
  - category (text, e.g. "Essay", "Short Story", "Poem")
  - cover_image_url (text, optional)
  - published (boolean, default false)
  - created_at (timestamptz)
- `books` — e-books sold / offered in the store.
  - id (uuid, pk)
  - title (text)
  - author (text)
  - description (text)
  - price_cents (integer, in cents; 0 = free)
  - cover_image_url (text)
  - download_url (text, for free/purchased downloads)
  - buy_url (text, external purchase link)
  - published (boolean, default false)
  - created_at (timestamptz)
- `messages` — contact form submissions from visitors.
  - id (uuid, pk)
  - name (text)
  - email (text)
  - message (text)
  - read (boolean, default false)
  - created_at (timestamptz)

2. Security
- RLS enabled on all three tables.
- Public reads: anon + authenticated can SELECT published stories and books.
  (Unpublished ones are admin-only via the published filter in the policy.)
- Public contact: anon + authenticated can INSERT messages (anyone can submit).
- Admin writes: authenticated users can INSERT/UPDATE/DELETE stories and books,
  and can SELECT/UPDATE/DELETE all messages.
- Grants match the verbs each role uses.
*/

CREATE TABLE IF NOT EXISTS stories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  excerpt text NOT NULL DEFAULT '',
  body text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT 'Essay',
  cover_image_url text,
  published boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS books (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  author text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  price_cents integer NOT NULL DEFAULT 0,
  cover_image_url text,
  download_url text,
  buy_url text,
  published boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  read boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Stories grants
GRANT SELECT ON stories TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON stories TO authenticated;

-- Books grants
GRANT SELECT ON books TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON books TO authenticated;

-- Messages grants: public can submit, admin can read/manage
GRANT INSERT ON messages TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON messages TO authenticated;

-- Stories policies
DROP POLICY IF EXISTS "public_read_published_stories" ON stories;
CREATE POLICY "public_read_published_stories" ON stories FOR SELECT
  TO anon, authenticated USING (published = true);

DROP POLICY IF EXISTS "admin_select_all_stories" ON stories;
CREATE POLICY "admin_select_all_stories" ON stories FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_stories" ON stories;
CREATE POLICY "admin_insert_stories" ON stories FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_stories" ON stories;
CREATE POLICY "admin_update_stories" ON stories FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_stories" ON stories;
CREATE POLICY "admin_delete_stories" ON stories FOR DELETE
  TO authenticated USING (true);

-- Books policies
DROP POLICY IF EXISTS "public_read_published_books" ON books;
CREATE POLICY "public_read_published_books" ON books FOR SELECT
  TO anon, authenticated USING (published = true);

DROP POLICY IF EXISTS "admin_select_all_books" ON books;
CREATE POLICY "admin_select_all_books" ON books FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_books" ON books;
CREATE POLICY "admin_insert_books" ON books FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_books" ON books;
CREATE POLICY "admin_update_books" ON books FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_books" ON books;
CREATE POLICY "admin_delete_books" ON books FOR DELETE
  TO authenticated USING (true);

-- Messages policies
DROP POLICY IF EXISTS "public_insert_messages" ON messages;
CREATE POLICY "public_insert_messages" ON messages FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_select_messages" ON messages;
CREATE POLICY "admin_select_messages" ON messages FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "admin_update_messages" ON messages;
CREATE POLICY "admin_update_messages" ON messages FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_messages" ON messages;
CREATE POLICY "admin_delete_messages" ON messages FOR DELETE
  TO authenticated USING (true);
