// AI prediction service for dog breed classification
import { storageService } from './storageService';
import { databaseService } from './databaseService';
import { runTFLiteInference } from './tfliteService';
import { i18n } from '../localization/i18n';

export interface PredictionResult {
  breed: string;
  confidence: number;
}

export interface PredictionResponse {
  predictions: PredictionResult[];
  topPrediction: PredictionResult;
  modelVersion: string;
  predictionId?: string;
}

export interface FullPredictionResult {
  record: any;
  top3: PredictionResult[];
  predictionResponse: PredictionResponse;
}

// Helper function to convert URI to Blob
async function uriToBlob(uri: string): Promise<Blob> {
  const response = await fetch(uri);
  const blob = await response.blob();
  return blob;
}

class PredictionService {
  private labels: string[] = [];
  private readonly MODEL_VERSION = '1.0.0';
  private isInitialized = false;

  // Full prediction flow: upload → inference → database insert
  async handlePrediction(imageUri: string, currentUser: any, modelVersion = 'v1.0.0'): Promise<FullPredictionResult> {
    try {
      console.log('Starting full prediction flow for user:', currentUser.id);
      
      // 1. Upload image to storage
      console.log('Uploading image to storage...');
      const uploadResult = await storageService.uploadPredictionImage(imageUri, currentUser.id);
      
      if (uploadResult.error) {
        throw new Error(`Upload failed: ${uploadResult.error}`);
      }

      // 2. Run TensorFlow Lite inference
      console.log('Running TFLite inference...');
      const { top3, probabilities, confidence, predictedLabel } = await runTFLiteInference(imageUri);

      // 3. Insert prediction into database
      console.log('Inserting prediction into database...');
      const predictionRecord = await databaseService.insertPrediction({
        user_id: currentUser.id,
        breed_predicted: predictedLabel,
        probabilities: JSON.stringify(probabilities),
        confidence,
        image_url: uploadResult.publicURL || imageUri,
        model_version: modelVersion,
        language: currentUser.preferred_language || i18n.getCurrentLanguage() || 'en',
      });

      if (predictionRecord.error) {
        console.error('Database insert failed:', predictionRecord.error);
        // Continue anyway for demo purposes
      }

      // 4. Create prediction response
      const predictionResponse: PredictionResponse = {
        predictions: top3,
        topPrediction: top3[0],
        modelVersion,
        predictionId: predictionRecord.data?.id,
      };

      console.log('Full prediction flow completed successfully');
      
      return {
        record: predictionRecord.data,
        top3,
        predictionResponse,
      };

    } catch (error) {
      console.error('Full prediction flow error:', error);
      throw error;
    }
  }

  async initialize(): Promise<{ success: boolean; error: string | null }> {
    try {
      if (this.isInitialized) {
        return { success: true, error: null };
      }

      // Load breed labels
      await this.loadLabels();

      this.isInitialized = true;
      return { success: true, error: null };
    } catch (error) {
      console.error('Prediction service initialization error:', error);
      return { success: false, error: 'modelLoadError' };
    }
  }

  private async loadLabels(): Promise<void> {
    // Mock dog breed labels - in a real app, you would load from labels.txt
    this.labels = [
      'Golden Retriever',
      'Labrador Retriever',
      'German Shepherd',
      'Bulldog',
      'Beagle',
      'Poodle',
      'Rottweiler',
      'Yorkshire Terrier',
      'Dachshund',
      'Siberian Husky',
      'Boxer',
      'Border Collie',
      'Chihuahua',
      'Cocker Spaniel',
      'Australian Shepherd',
      'Shih Tzu',
      'Boston Terrier',
      'Pomeranian',
      'Mastiff',
      'Great Dane',
      'Dalmatian',
      'Schnauzer',
      'Doberman Pinscher',
      'Basset Hound',
      'Saint Bernard',
      'Newfoundland',
      'Bernese Mountain Dog',
      'Collie',
      'Weimaraner',
      'Bloodhound'
    ];
    
    console.log(`Loaded ${this.labels.length} breed labels`);
  }

  async predictBreed(imageUri: string): Promise<{ result: PredictionResponse | null; error: string | null }> {
    try {
      if (!this.isInitialized) {
        const initResult = await this.initialize();
        if (!initResult.success) {
          return { result: null, error: initResult.error };
        }
      }

      console.log('Starting breed prediction...');

      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Generate mock predictions with realistic confidence scores
      const mockPredictions = this.generateMockPredictions();

      // Get top 3 predictions
      const sortedPredictions = mockPredictions
        .map((confidence, index) => ({
          breed: this.labels[index] || `Breed ${index}`,
          confidence: confidence,
        }))
        .sort((a, b) => b.confidence - a.confidence)
        .slice(0, 3);

      const result: PredictionResponse = {
        predictions: sortedPredictions,
        topPrediction: sortedPredictions[0],
        modelVersion: this.MODEL_VERSION,
      };

      console.log('Prediction completed:', result);

      return { result, error: null };
    } catch (error) {
      console.error('Prediction error:', error);
      return { result: null, error: 'predictionError' };
    }
  }

  private generateMockPredictions(): number[] {
    // Generate realistic-looking prediction scores
    const predictions: number[] = [];
    
    // Generate a high confidence prediction for the first breed
    predictions.push(Math.random() * 0.3 + 0.6); // 60-90%
    
    // Generate medium confidence for second breed
    predictions.push(Math.random() * 0.2 + 0.1); // 10-30%
    
    // Generate low confidence for remaining breeds
    for (let i = 2; i < this.labels.length; i++) {
      predictions.push(Math.random() * 0.1); // 0-10%
    }
    
    // Normalize to sum to 1
    const sum = predictions.reduce((a, b) => a + b, 0);
    return predictions.map(p => p / sum);
  }

  getModelVersion(): string {
    return this.MODEL_VERSION;
  }

  getAvailableBreeds(): string[] {
    return [...this.labels];
  }
}

export const predictionService = new PredictionService();