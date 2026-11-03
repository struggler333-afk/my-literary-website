/*
# Create story cover image storage

1. New storage configuration
- Add the `story-covers` bucket for cover images used by published stories.
- Make the bucket public so published story covers can be displayed to visitors without signed-in access.
- Restrict uploads to common image MIME types and a maximum size of 5 MB.

2. Modified storage access
- Allow public and authenticated users to read objects from `story-covers`.
- Allow authenticated users to upload, update, and delete objects in `story-covers`.
- Keep all other storage buckets and objects unchanged.

3. Security notes
- The bucket only accepts configured image MIME types and files up to 5 MB.
- Upload, update, and delete operations require an authenticated Supabase session.
*/

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'story-covers',
  'story-covers',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public can read story covers" ON storage.objects;
CREATE POLICY "Public can read story covers"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'story-covers');

DROP POLICY IF EXISTS "Authenticated users can upload story covers" ON storage.objects;
CREATE POLICY "Authenticated users can upload story covers"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'story-covers');

DROP POLICY IF EXISTS "Authenticated users can update story covers" ON storage.objects;
CREATE POLICY "Authenticated users can update story covers"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'story-covers')
WITH CHECK (bucket_id = 'story-covers');

DROP POLICY IF EXISTS "Authenticated users can delete story covers" ON storage.objects;
CREATE POLICY "Authenticated users can delete story covers"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'story-covers');