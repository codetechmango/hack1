-- ===================================================================
-- COMPLETE SUPABASE SCHEMA FOR HACK1 BREED PREDICTOR APP
-- ===================================================================
-- Run this entire script in your Supabase SQL Editor to set up
-- all tables, RLS policies, and storage buckets properly.

-- ===================================================================
-- 1. ENABLE RLS ON ALL TABLES
-- ===================================================================
-- Note: This should already be enabled by default in Supabase

-- ===================================================================
-- 2. CREATE PROFILES TABLE
-- ===================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT,
    preferred_language TEXT DEFAULT 'en',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = user_id);

-- ===================================================================
-- 3. CREATE PREDICTIONS TABLE
-- ===================================================================
CREATE TABLE IF NOT EXISTS public.predictions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    breed_predicted TEXT NOT NULL,
    probabilities JSONB NOT NULL,
    confidence DECIMAL(5,4) NOT NULL,
    image_url TEXT NOT NULL,
    model_version TEXT DEFAULT 'v1.0.0',
    language TEXT DEFAULT 'en',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.predictions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for predictions (more permissive for development)
DROP POLICY IF EXISTS "Users can view own predictions" ON public.predictions;
CREATE POLICY "Users can view own predictions" ON public.predictions
    FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own predictions" ON public.predictions;
CREATE POLICY "Users can insert own predictions" ON public.predictions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Allow authenticated users to insert predictions (for development)
DROP POLICY IF EXISTS "Authenticated users can insert predictions" ON public.predictions;
CREATE POLICY "Authenticated users can insert predictions" ON public.predictions
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- ===================================================================
-- 4. CREATE FEEDBACK TABLE
-- ===================================================================
CREATE TABLE IF NOT EXISTS public.feedback (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    prediction_id UUID REFERENCES public.predictions(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    is_correct BOOLEAN NOT NULL,
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for feedback (more permissive for development)
DROP POLICY IF EXISTS "Users can view own feedback" ON public.feedback;
CREATE POLICY "Users can view own feedback" ON public.feedback
    FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own feedback" ON public.feedback;
CREATE POLICY "Users can insert own feedback" ON public.feedback
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Allow authenticated users to insert feedback (for development)
DROP POLICY IF EXISTS "Authenticated users can insert feedback" ON public.feedback;
CREATE POLICY "Authenticated users can insert feedback" ON public.feedback
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- ===================================================================
-- 5. CREATE STORAGE BUCKET
-- ===================================================================
-- Create the predictions-images bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('predictions-images', 'predictions-images', true)
ON CONFLICT (id) DO NOTHING;

-- ===================================================================
-- 6. CREATE STORAGE POLICIES
-- ===================================================================
-- Allow authenticated users to upload images
DROP POLICY IF EXISTS "Authenticated users can upload images" ON storage.objects;
CREATE POLICY "Authenticated users can upload images" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'predictions-images' 
        AND auth.role() = 'authenticated'
    );

-- Allow users to view images
DROP POLICY IF EXISTS "Public can view images" ON storage.objects;
CREATE POLICY "Public can view images" ON storage.objects
    FOR SELECT USING (bucket_id = 'predictions-images');

-- Allow users to delete their own images
DROP POLICY IF EXISTS "Users can delete own images" ON storage.objects;
CREATE POLICY "Users can delete own images" ON storage.objects
    FOR DELETE USING (
        bucket_id = 'predictions-images' 
        AND auth.uid()::text = (storage.foldername(name))[1]
    );

-- ===================================================================
-- 7. CREATE INDEXES FOR PERFORMANCE
-- ===================================================================
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON public.profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_predictions_user_id ON public.predictions(user_id);
CREATE INDEX IF NOT EXISTS idx_predictions_created_at ON public.predictions(created_at);
CREATE INDEX IF NOT EXISTS idx_feedback_user_id ON public.feedback(user_id);
CREATE INDEX IF NOT EXISTS idx_feedback_prediction_id ON public.feedback(prediction_id);

-- ===================================================================
-- 8. CREATE FUNCTIONS (OPTIONAL)
-- ===================================================================
-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for profiles table
DROP TRIGGER IF EXISTS handle_updated_at ON public.profiles;
CREATE TRIGGER handle_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE PROCEDURE public.handle_updated_at();

-- ===================================================================
-- 9. GRANT PERMISSIONS
-- ===================================================================
-- Grant usage on schema
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA public TO anon;

-- Grant permissions on tables
GRANT ALL ON public.profiles TO authenticated;
GRANT ALL ON public.predictions TO authenticated;
GRANT ALL ON public.feedback TO authenticated;

-- Grant permissions on sequences
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- ===================================================================
-- 10. VERIFY SETUP
-- ===================================================================
-- Check that tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN ('profiles', 'predictions', 'feedback');

-- Check that RLS is enabled
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename IN ('profiles', 'predictions', 'feedback');

-- Check storage bucket
SELECT id, name, public 
FROM storage.buckets 
WHERE id = 'predictions-images';

-- ===================================================================
-- SUCCESS MESSAGE
-- ===================================================================
-- If you see this message, the schema setup is complete!
SELECT 'Schema setup completed successfully! Your Hack1 app is ready to use.' as status;
