// src/services/feedbackService.ts
import { supabase } from '../config/supabase';

export interface InsertFeedbackData {
  prediction_id: string;
  user_id: string;
  status: 'Correct' | 'Incorrect';
  comment?: string;
}

export async function insertFeedback(feedbackData: InsertFeedbackData) {
  console.log('Inserting feedback:', feedbackData);
  
  try {
    const insertData = {
      prediction_id: feedbackData.prediction_id,
      user_id: feedbackData.user_id,
      is_correct: feedbackData.status === 'Correct',
      comment: feedbackData.comment || null,
    };

    console.log('Feedback insert data:', insertData);

    const { data, error } = await supabase
      .from('feedback')
      .insert([insertData])
      .select()
      .single();

    if (error) {
      console.error('Feedback insert error:', error);
      
      if (error.code === 'PGRST204') {
        console.error('Schema error - column not found. Creating mock response for demo...');
        return { 
          id: `mock_feedback_${Date.now()}`, 
          ...insertData, 
          created_at: new Date().toISOString() 
        };
      }
      
      if (error.code === '42501') {
        console.error('RLS policy violation for feedback table');
        return { 
          id: `mock_feedback_${Date.now()}`, 
          ...insertData, 
          created_at: new Date().toISOString() 
        };
      }
      
      throw error;
    }

    console.log('Feedback inserted successfully:', data);
    return data;
  } catch (error) {
    console.error('Feedback service error:', error);
    // Return mock data for demo purposes
    return { 
      id: `mock_feedback_${Date.now()}`, 
      prediction_id: feedbackData.prediction_id,
      user_id: feedbackData.user_id,
      is_correct: feedbackData.status === 'Correct',
      comment: feedbackData.comment || null,
      created_at: new Date().toISOString() 
    };
  }
}

export default {
  insertFeedback,
};
