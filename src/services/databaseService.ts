import { supabase, Prediction, Feedback } from '../config/supabase';

export interface PredictionData {
  breed_predicted: string;
  probabilities: Record<string, number>;
  confidence: number;
  image_url: string;
  model_version: string;
  language: string;
}

export interface FeedbackData {
  prediction_id: string;
  is_correct: boolean;
  comment?: string;
}

class DatabaseService {
  // Prediction operations
  async createPrediction(userId: string, predictionData: PredictionData): Promise<{ prediction: Prediction | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('predictions')
        .insert({
          user_id: userId,
          ...predictionData,
          created_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) {
        console.error('Create prediction error:', error);
        return { prediction: null, error: 'predictionError' };
      }

      return { prediction: data, error: null };
    } catch (error) {
      console.error('Create prediction exception:', error);
      return { prediction: null, error: 'predictionError' };
    }
  }

  async createFeedback(userId: string, feedbackData: FeedbackData): Promise<{ feedback: Feedback | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('feedback')
        .insert({
          user_id: userId,
          ...feedbackData,
          created_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) {
        console.error('Create feedback error:', error);
        return { feedback: null, error: 'feedbackError' };
      }

      return { feedback: data, error: null };
    } catch (error) {
      console.error('Create feedback exception:', error);
      return { feedback: null, error: 'feedbackError' };
    }
  }

  async getUserPredictions(userId: string, limit?: number): Promise<{ predictions: Prediction[]; error: string | null }> {
    try {
      let query = supabase
        .from('predictions')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (limit) {
        query = query.limit(limit);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Get user predictions error:', error);
        return { predictions: [], error: 'fetchError' };
      }

      return { predictions: data || [], error: null };
    } catch (error) {
      console.error('Get user predictions exception:', error);
      return { predictions: [], error: 'fetchError' };
    }
  }
}

export const databaseService = new DatabaseService();