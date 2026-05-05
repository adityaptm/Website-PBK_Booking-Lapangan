-- Create bookings table
CREATE TABLE bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  field_name TEXT NOT NULL,
  booking_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  phone_number TEXT NOT NULL,
  photo_url TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert (public booking)
CREATE POLICY "Allow public insert" ON bookings FOR INSERT WITH CHECK (true);

-- Create policy to allow public to view confirmed bookings
CREATE POLICY "Allow public select" ON bookings FOR SELECT USING (true);

-- Storage Setup (Run these in the Storage section or SQL editor)
-- 1. Create a bucket named 'bookings'
-- 2. Set the bucket to PUBLIC if you want the images to be visible to everyone
-- 3. Add storage policies to allow uploads:
--    CREATE POLICY "Allow public upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'bookings');
