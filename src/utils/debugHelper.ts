// Debug helper utilities
import { supabase } from '../config/supabase';

export const debugHelper = {
  async logAuthState() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      console.log('🔍 Current Auth State:');
      console.log('User:', user);
      console.log('User ID:', user?.id);
      console.log('Email:', user?.email);
      console.log('Auth Error:', error);
      
      const { data: { session } } = await supabase.auth.getSession();
      console.log('Session:', session);
      console.log('Access Token:', session?.access_token ? 'Present' : 'Missing');
      
      return { user, session, error };
    } catch (error) {
      console.error('Debug auth state error:', error);
      return { user: null, session: null, error };
    }
  },

  async testDatabaseConnection(userId: string) {
    try {
      console.log('🧪 Testing database connection for user:', userId);
      
      // Test profiles table
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .limit(1);
      
      console.log('Profiles query result:', { data: profileData, error: profileError });
      
      // Test predictions table
      const { data: predData, error: predError } = await supabase
        .from('predictions')
        .select('count')
        .eq('user_id', userId);
      
      console.log('Predictions query result:', { data: predData, error: predError });
      
      // Test feedback table
      const { data: feedbackData, error: feedbackError } = await supabase
        .from('feedback')
        .select('count')
        .eq('user_id', userId);
      
      console.log('Feedback query result:', { data: feedbackData, error: feedbackError });
      
    } catch (error) {
      console.error('Database connection test error:', error);
    }
  },

  logImageUploadAttempt(imageUri: string, userId: string) {
    console.log('📤 Image Upload Attempt:');
    console.log('Image URI:', imageUri);
    console.log('User ID:', userId);
    console.log('URI Type:', imageUri.startsWith('http') ? 'HTTP URL' : 'Local File');
  }
};
