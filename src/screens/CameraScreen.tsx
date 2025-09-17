import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/common/Button';
import { i18n } from '../localization/i18n';
import { predictionService, PredictionResponse } from '../services/predictionService';
import { databaseService } from '../services/databaseService';
import * as ImagePicker from '../mocks/expo-image-picker';

interface CameraScreenProps {
  navigation: any;
}

interface ImageResult {
  uri: string;
  width: number;
  height: number;
}

export const CameraScreen = ({ navigation }: CameraScreenProps) => {
  const { user, signOut } = useAuth();
  const [selectedImage, setSelectedImage] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [, forceUpdate] = useState({});

  useEffect(() => {
    const unsubscribe = i18n.subscribe(() => {
      forceUpdate({});
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const initializePredictionService = async () => {
      const result = await predictionService.initialize();
      if (!result.success) {
        setError(result.error ? i18n.t(result.error) : 'Failed to initialize AI model');
      }
    };

    initializePredictionService();
  }, []);

  const requestPermissions = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'We need camera roll permissions to select images');
        return false;
      }
      return true;
    } catch (error) {
      console.error('Permission error:', error);
      return false;
    }
  };

  const handleImageSelection = () => {
    Alert.alert(
      i18n.t('captureImage'),
      'Choose an option',
      [
        {
          text: i18n.t('takePhoto'),
          onPress: handleCameraCapture,
        },
        {
          text: i18n.t('selectFromGallery'),
          onPress: handleGallerySelection,
        },
        {
          text: i18n.t('cancel'),
          style: 'cancel',
        },
      ]
    );
  };

  const handleCameraCapture = async () => {
    setError(null);
    
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'We need camera permissions to take photos');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        const asset = result.assets[0];
        setSelectedImage({
          uri: asset.uri,
          width: asset.width,
          height: asset.height,
        });
        setPrediction(null);
      }
    } catch (error) {
      console.error('Camera capture error:', error);
      setError('Failed to capture photo');
    }
  };

  const handleGallerySelection = async () => {
    setError(null);
    
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        const asset = result.assets[0];
        setSelectedImage({
          uri: asset.uri,
          width: asset.width,
          height: asset.height,
        });
        setPrediction(null);
      }
    } catch (error) {
      console.error('Gallery selection error:', error);
      setError('Failed to select from gallery');
    }
  };

  const handlePredict = async () => {
    if (!selectedImage || !user) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log('Starting full prediction flow...');
      
      // Use the full prediction flow: upload → inference → database
      const fullResult = await predictionService.handlePrediction(
        selectedImage.uri, 
        user, 
        'v1.0.0'
      );
      
      // Create prediction response for UI
      const predictionResponse: PredictionResponse = {
        predictions: fullResult.top3,
        topPrediction: fullResult.top3[0],
        modelVersion: 'v1.0.0',
        predictionId: fullResult.record?.id,
      };

      setPrediction(predictionResponse);
      
      Alert.alert(i18n.t('success'), i18n.t('predictionSuccess'));

    } catch (error) {
      console.error('Full prediction flow error:', error);
      setError('An unexpected error occurred during prediction');
    } finally {
      setLoading(false);
    }
  };

  const handleRetakePhoto = () => {
    setSelectedImage(null);
    setPrediction(null);
    setError(null);
  };

  const handleFeedback = () => {
    if (prediction) {
      navigation.navigate('Feedback', { prediction });
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: () => signOut()
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>🐕 Breed Predictor</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {!selectedImage ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>📷</Text>
          <Text style={styles.emptyTitle}>{i18n.t('captureImage')}</Text>
          <Text style={styles.emptySubtitle}>
            Take a photo or select from gallery to identify dog breeds
          </Text>
          
          <Button
            title={i18n.t('captureImage')}
            onPress={handleImageSelection}
            style={styles.captureButton}
          />
        </View>
      ) : (
        <View style={styles.imageContainer}>
          <Image source={{ uri: selectedImage.uri }} style={styles.image} />
          
          <View style={styles.imageActions}>
            <Button
              title={i18n.t('retakePhoto')}
              onPress={handleRetakePhoto}
              variant="outline"
              style={styles.retakeButton}
            />
            
            {!prediction && !loading && (
              <Button
                title={i18n.t('predict')}
                onPress={handlePredict}
                style={styles.predictButton}
              />
            )}
          </View>

          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#007AFF" />
              <Text style={styles.loadingText}>{i18n.t('predicting')}</Text>
            </View>
          )}
        </View>
      )}

      {prediction && (
        <View style={styles.predictionContainer}>
          <Text style={styles.predictionTitle}>{i18n.t('predictionResults')}</Text>
          
          <View style={styles.topPrediction}>
            <Text style={styles.topBreed}>{prediction.topPrediction.breed}</Text>
            <Text style={styles.topConfidence}>
              {(prediction.topPrediction.confidence * 100).toFixed(1)}% {i18n.t('confidence')}
            </Text>
          </View>

          <Text style={styles.allPredictionsTitle}>{i18n.t('topPredictions')}</Text>
          
          {prediction.predictions.map((pred, index) => (
            <View key={index} style={styles.predictionItem}>
              <Text style={styles.breedName}>{pred.breed}</Text>
              <Text style={styles.confidence}>
                {(pred.confidence * 100).toFixed(1)}%
              </Text>
            </View>
          ))}

          <Button
            title={i18n.t('feedback')}
            onPress={handleFeedback}
            style={styles.feedbackButton}
          />
        </View>
      )}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  logoutButton: {
    padding: 8,
  },
  logoutText: {
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: '600',
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
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  captureButton: {
    paddingHorizontal: 32,
  },
  imageContainer: {
    marginBottom: 24,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  imageActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  retakeButton: {
    flex: 0.48,
  },
  predictButton: {
    flex: 0.48,
  },
  loadingContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666666',
  },
  predictionContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginTop: 16,
  },
  predictionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 16,
    textAlign: 'center',
  },
  topPrediction: {
    alignItems: 'center',
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  topBreed: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 8,
  },
  topConfidence: {
    fontSize: 18,
    color: '#666666',
  },
  allPredictionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  predictionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  breedName: {
    fontSize: 16,
    color: '#1A1A1A',
  },
  confidence: {
    fontSize: 16,
    color: '#666666',
    fontWeight: '500',
  },
  feedbackButton: {
    marginTop: 20,
  },
});