// src/services/feedbackService.ts
import { supabase } from '../config/supabase';

export interface InsertFeedbackData {
  prediction_id: string;
  user_id: string;
  status: 'Correct' | 'Incorrect';
  comment?: string;
}

export async function insertFeedback(feedbackData: InsertFeedbackData) {
  const { data, error } = await supabase
    .from('feedback')
    .insert([{
      prediction_id: feedbackData.prediction_id,
      user_id: feedbackData.user_id,
      is_correct: feedbackData.status === 'Correct',
      comment: feedbackData.comment || null,
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export default {
  insertFeedback,
};
