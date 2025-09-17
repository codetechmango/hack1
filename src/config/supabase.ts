import { createClient } from '@supabase/supabase-js';
import env from './env';

// Simple storage fallback for AsyncStorage
const createStorage = () => {
  try {
    // Try to import AsyncStorage
    const AsyncStorage = require('@react-native-async-storage/async-storage').default;
    return AsyncStorage;
  } catch (error) {
    // Fallback storage for when AsyncStorage is not available
    console.warn('AsyncStorage not available, using fallback storage');
    return {
      getItem: (key: string) => Promise.resolve(null),
      setItem: (key: string, value: string) => Promise.resolve(),
      removeItem: (key: string) => Promise.resolve(),
    };
  }
};

// Supabase credentials from local config
const SUPABASE_URL = env.SUPABASE_URL;
const SUPABASE_ANON_KEY = env.SUPABASE_ANON_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: createStorage(),
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