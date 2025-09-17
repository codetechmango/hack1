import { Alert, Platform } from 'react-native';
// import * as ImagePicker from 'expo-image-picker'; // Commented out until package is installed

export interface ImageResult {
  uri: string;
  width: number;
  height: number;
  type?: string;
  fileSize?: number;
}

class CameraService {
  async requestCameraPermission(): Promise<boolean> {
    try {
      // Mock permission request - always granted for demo
      return true;
    } catch (error) {
      console.error('Camera permission error:', error);
      return false;
    }
  }

  async requestMediaLibraryPermission(): Promise<boolean> {
    try {
      // Mock permission request - always granted for demo
      return true;
    } catch (error) {
      console.error('Media library permission error:', error);
      return false;
    }
  }

  async capturePhoto(): Promise<{ result: ImageResult | null; error: string | null }> {
    try {
      // Request camera permission
      const hasPermission = await this.requestCameraPermission();
      if (!hasPermission) {
        return { result: null, error: 'Camera permission denied' };
      }

      // Mock camera capture with sample images
      const mockImages = [
        'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=400&fit=crop',
      ];
      
      const randomImage = mockImages[Math.floor(Math.random() * mockImages.length)];

      return {
        result: {
          uri: randomImage,
          width: 400,
          height: 400,
          type: 'image/jpeg',
          fileSize: 50000,
        },
        error: null,
      };
    } catch (error) {
      console.error('Camera capture error:', error);
      return { result: null, error: 'Failed to capture photo' };
    }
  }

  async selectFromGallery(): Promise<{ result: ImageResult | null; error: string | null }> {
    try {
      // Request media library permission
      const hasPermission = await this.requestMediaLibraryPermission();
      if (!hasPermission) {
        return { result: null, error: 'Media library permission denied' };
      }

      // Mock gallery selection with different sample images
      const mockImages = [
        'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=400&h=400&fit=crop',
      ];
      
      const randomImage = mockImages[Math.floor(Math.random() * mockImages.length)];

      return {
        result: {
          uri: randomImage,
          width: 400,
          height: 400,
          type: 'image/jpeg',
          fileSize: 50000,
        },
        error: null,
      };
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

export const cameraService = new CameraService();
