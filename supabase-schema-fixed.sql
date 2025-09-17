-- Supabase Schema Setup for Breed Predictor App - FIXED VERSION
-- Run these SQL commands in your Supabase SQL editor

-- First, drop existing tables and policies if they exist
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view own predictions" ON public.predictions;
DROP POLICY IF EXISTS "Users can insert own predictions" ON public.predictions;
DROP POLICY IF EXISTS "Users can view own feedback" ON public.feedback;
DROP POLICY IF EXISTS "Users can insert own feedback" ON public.feedback;

-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    preferred_language TEXT CHECK (preferred_language IN ('en', 'hi', 'ta')) DEFAULT 'en',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id)
);

-- Create predictions table
CREATE TABLE IF NOT EXISTS public.predictions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    breed_predicted TEXT NOT NULL,
    probabilities JSONB NOT NULL DEFAULT '{}',
    confidence DECIMAL(5,4) NOT NULL CHECK (confidence >= 0 AND confidence <= 1),
    image_url TEXT NOT NULL,
    model_version TEXT NOT NULL DEFAULT '1.0.0',
    language TEXT CHECK (language IN ('en', 'hi', 'ta')) DEFAULT 'en',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create feedback table
CREATE TABLE IF NOT EXISTS public.feedback (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    prediction_id TEXT NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    is_correct BOOLEAN NOT NULL,
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON public.profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_predictions_user_id ON public.predictions(user_id);
CREATE INDEX IF NOT EXISTS idx_predictions_created_at ON public.predictions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_feedback_user_id ON public.feedback(user_id);

-- Enable Row Level Security (RLS) for all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.predictions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

-- Create more permissive RLS policies for development

-- Profiles policies
CREATE POLICY "Enable read access for authenticated users" ON public.profiles
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Enable insert for authenticated users" ON public.profiles
    FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Enable update for users based on user_id" ON public.profiles
    FOR UPDATE TO authenticated USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Predictions policies  
CREATE POLICY "Enable read access for authenticated users" ON public.predictions
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Enable insert for authenticated users" ON public.predictions
    FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Enable update for users based on user_id" ON public.predictions
    FOR UPDATE TO authenticated USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Feedback policies
CREATE POLICY "Enable read access for authenticated users" ON public.feedback
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Enable insert for authenticated users" ON public.feedback
    FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Enable update for users based on user_id" ON public.feedback
    FOR UPDATE TO authenticated USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for profiles table
DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at 
    BEFORE UPDATE ON public.profiles 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create storage bucket for prediction images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('predictions-images', 'predictions-images', true)
ON CONFLICT (id) DO NOTHING;

-- Grant permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- Grant storage permissions
INSERT INTO storage.objects (bucket_id, name, owner, metadata) VALUES ('predictions-images', 'test', auth.uid(), '{}') ON CONFLICT DO NOTHING;

-- Verify tables are created
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name IN ('profiles', 'predictions', 'feedback');
