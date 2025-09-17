import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/common/Button';
import { i18n } from '../localization/i18n';
import { databaseService } from '../services/databaseService';
import { PredictionResponse } from '../services/predictionService';

interface FeedbackScreenProps {
  navigation: any;
  route: {
    params: {
      prediction: PredictionResponse;
    };
  };
}

export const FeedbackScreen: React.FC<FeedbackScreenProps> = ({
  navigation,
  route,
}) => {
  const { user } = useAuth();
  const { prediction } = route.params;
  
  const [selectedFeedback, setSelectedFeedback] = useState<boolean | null>(null);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [, forceUpdate] = useState({});

  useEffect(() => {
    const unsubscribe = i18n.subscribe(() => {
      forceUpdate({});
    });
    return unsubscribe;
  }, []);

  const handleFeedbackSelect = (isCorrect: boolean) => {
    setSelectedFeedback(isCorrect);
    setError(null);
  };

  const handleSubmitFeedback = async () => {
    if (!user) {
      setError('User not authenticated');
      return;
    }

    if (selectedFeedback === null) {
      setError('Please select whether the prediction was correct or incorrect');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // For demo, using a mock prediction ID
      const mockPredictionId = `prediction_${Date.now()}`;

      const result = await databaseService.createFeedback(user.id, {
        prediction_id: mockPredictionId,
        is_correct: selectedFeedback,
        comment: comment.trim() || undefined,
      });

      if (result.error) {
        setError(i18n.t(result.error) || 'Failed to submit feedback');
        return;
      }

      Alert.alert(
        i18n.t('success'),
        i18n.t('feedbackSuccess'),
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Camera'),
          },
        ]
      );

    } catch (error) {
      console.error('Submit feedback error:', error);
      setError('An unexpected error occurred while submitting feedback');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Text style={styles.backText}>← {i18n.t('back')}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{i18n.t('feedback')}</Text>
      </View>

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {/* Prediction Summary */}
      <View style={styles.predictionSummary}>
        <Text style={styles.summaryTitle}>Prediction Summary</Text>
        <View style={styles.predictionResult}>
          <Text style={styles.predictedBreed}>{prediction.topPrediction.breed}</Text>
          <Text style={styles.confidence}>
            {(prediction.topPrediction.confidence * 100).toFixed(1)}% {i18n.t('confidence')}
          </Text>
        </View>
      </View>

      {/* Feedback Question */}
      <View style={styles.feedbackSection}>
        <Text style={styles.questionText}>{i18n.t('wasThisCorrect')}</Text>
        
        <View style={styles.feedbackOptions}>
          <TouchableOpacity
            style={[
              styles.feedbackOption,
              selectedFeedback === true && styles.selectedCorrect,
            ]}
            onPress={() => handleFeedbackSelect(true)}
          >
            <Text style={styles.feedbackIcon}>✅</Text>
            <Text style={[
              styles.feedbackText,
              selectedFeedback === true && styles.selectedText,
            ]}>
              {i18n.t('correct')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.feedbackOption,
              selectedFeedback === false && styles.selectedIncorrect,
            ]}
            onPress={() => handleFeedbackSelect(false)}
          >
            <Text style={styles.feedbackIcon}>❌</Text>
            <Text style={[
              styles.feedbackText,
              selectedFeedback === false && styles.selectedText,
            ]}>
              {i18n.t('incorrect')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Comment Section */}
      <View style={styles.commentSection}>
        <Text style={styles.commentLabel}>{i18n.t('addComment')}</Text>
        <TextInput
          style={styles.commentInput}
          value={comment}
          onChangeText={setComment}
          placeholder="Share your thoughts about this prediction..."
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <Button
          title={i18n.t('submitFeedback')}
          onPress={handleSubmitFeedback}
          disabled={selectedFeedback === null}
          loading={loading}
          style={styles.submitButton}
        />
        
        <Button
          title={i18n.t('cancel')}
          onPress={handleBack}
          variant="outline"
          style={styles.cancelButton}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  contentContainer: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 20,
  },
  backButton: {
    padding: 8,
    marginRight: 16,
  },
  backText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  errorContainer: {
    backgroundColor: '#FFEBEE',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  errorText: {
    color: '#C62828',
    fontSize: 14,
    textAlign: 'center',
  },
  predictionSummary: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  predictionResult: {
    alignItems: 'center',
  },
  predictedBreed: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 4,
  },
  confidence: {
    fontSize: 16,
    color: '#666666',
  },
  feedbackSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 20,
    textAlign: 'center',
  },
  feedbackOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  feedbackOption: {
    alignItems: 'center',
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E5EA',
    backgroundColor: '#F8F9FA',
    flex: 0.4,
  },
  selectedCorrect: {
    borderColor: '#34C759',
    backgroundColor: '#F1F8E9',
  },
  selectedIncorrect: {
    borderColor: '#FF3B30',
    backgroundColor: '#FFEBEE',
  },
  feedbackIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  feedbackText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666666',
  },
  selectedText: {
    color: '#1A1A1A',
  },
  commentSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
  },
  commentLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#F8F9FA',
    color: '#1A1A1A',
    minHeight: 100,
  },
  actionButtons: {
    gap: 12,
  },
  submitButton: {
    marginBottom: 12,
  },
  cancelButton: {
    marginBottom: 24,
  },
});