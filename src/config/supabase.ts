import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// Supabase credentials from environment variables or fallback to hardcoded values
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://dtzhwxgfuosuktelilkd.supabase.co';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0emh3eGdmdW9zdWt0ZWxpbGtkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwOTEzMzUsImV4cCI6MjA3MzY2NzMzNX0.PJNyljxOpXMgaxdYOm6ElXWAvnAnOT-zkhoVEQQE-uI';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Database Types
export interface Profile {
  id: string;
  user_id: string;
  preferred_language: 'en' | 'hi' | 'ta';
  created_at: string;
  updated_at: string;
}

export interface Prediction {
  id: string;
  user_id: string;
  breed_predicted: string;
  probabilities: Record<string, number>;
  confidence: number;
  image_url: string;
  model_version: string;
  language: string;
  created_at: string;
}

export interface Feedback {
  id: string;
  prediction_id: string;
  user_id: string;
  is_correct: boolean;
  comment?: string;
  created_at: string;
}