import { Alert } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

export interface ImageResult {
  uri: string;
  width: number;
  height: number;
  type?: string;
  fileSize?: number;
}

class AlternativeCameraService {
  async requestCameraPermission(): Promise<boolean> {
    try {
      const { status } = await Camera.requestCameraPermissionsAsync();
      return status === 'granted';
    } catch (error) {
      console.error('Camera permission error:', error);
      return false;
    }
  }

  async requestMediaLibraryPermission(): Promise<boolean> {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      return status === 'granted';
    } catch (error) {
      console.error('Media library permission error:', error);
      return false;
    }
  }

  // This is a simplified version that would need a Camera component
  // For now, we'll simulate image capture
  async capturePhoto(): Promise<{ result: ImageResult | null; error: string | null }> {
    try {
      const hasPermission = await this.requestCameraPermission();
      if (!hasPermission) {
        return { result: null, error: 'Camera permission denied' };
      }

      // For demo purposes, return a mock image result
      // In a real implementation, you would use the Camera component to take a photo
      const mockResult: ImageResult = {
        uri: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=300&h=300&fit=crop',
        width: 300,
        height: 300,
        type: 'image/jpeg',
        fileSize: 50000,
      };

      return { result: mockResult, error: null };
    } catch (error) {
      console.error('Camera capture error:', error);
      return { result: null, error: 'Failed to capture photo' };
    }
  }

  async selectFromGallery(): Promise<{ result: ImageResult | null; error: string | null }> {
    try {
      const hasPermission = await this.requestMediaLibraryPermission();
      if (!hasPermission) {
        return { result: null, error: 'Media library permission denied' };
      }

      // For demo purposes, return a mock image result
      // In a real implementation, you would use MediaLibrary to select an image
      const mockResults = [
        'https://images.unsplash.com/photo-1552053831-71594a27632d?w=300&h=300&fit=crop',
        'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=300&h=300&fit=crop',
        'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=300&h=300&fit=crop',
        'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=300&h=300&fit=crop',
        'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=300&h=300&fit=crop',
      ];

      const randomImage = mockResults[Math.floor(Math.random() * mockResults.length)];

      const mockResult: ImageResult = {
        uri: randomImage,
        width: 300,
        height: 300,
        type: 'image/jpeg',
        fileSize: 50000,
      };

      return { result: mockResult, error: null };
    } catch (error) {
      console.error('Gallery selection error:', error);
      return { result: null, error: 'Failed to select from gallery' };
    }
  }

  showImageSourceAlert(
    onCamera: () => void,
    onGallery: () => void,
    onCancel?: () => void
  ): void {
    Alert.alert(
      'Select Image',
      'Choose an option',
      [
        {
          text: 'Camera',
          onPress: onCamera,
        },
        {
          text: 'Gallery',
          onPress: onGallery,
        },
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: onCancel,
        },
      ]
    );
  }

  validateImage(image: ImageResult): { isValid: boolean; error?: string } {
    // Check file size (max 10MB)
    if (image.fileSize && image.fileSize > 10 * 1024 * 1024) {
      return { isValid: false, error: 'Image size too large (max 10MB)' };
    }

    // Check dimensions (min 100x100)
    if (image.width < 100 || image.height < 100) {
      return { isValid: false, error: 'Image too small (minimum 100x100px)' };
    }

    return { isValid: true };
  }
}

export const alternativeCameraService = new AlternativeCameraService();
