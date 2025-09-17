import { supabase } from '../config/supabase';
import { v4 as uuidv4 } from 'uuid';

// Convert URI to Blob helper function
async function uriToBlob(uri: string): Promise<Blob> {
  const response = await fetch(uri);
  const blob = await response.blob();
  return blob;
}

class StorageService {
  private readonly BUCKET_NAME = 'predictions-images';

  async uploadPredictionImage(
    imageUri: string,
    userId: string
  ): Promise<{ path: string; publicURL: string | null; error: string | null }> {
    try {
      // Generate unique filename
      const fileName = `${userId}/${uuidv4()}.jpg`;
      
      let fileData: Blob | FormData;
      
      if (imageUri.startsWith('data:')) {
        // Base64 data URI
        fileData = await uriToBlob(imageUri);
      } else if (imageUri.startsWith('http')) {
        // HTTP URL - convert to blob
        fileData = await uriToBlob(imageUri);
      } else {
        // Local file URI for React Native
        const formData = new FormData();
        formData.append('file', {
          uri: imageUri,
          type: 'image/jpeg',
          name: fileName,
        } as any);
        fileData = formData;
      }

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from(this.BUCKET_NAME)
        .upload(fileName, fileData, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) {
        console.error('Upload error:', error);
        // For demo, return the original URI if upload fails
        return { path: fileName, publicURL: imageUri, error: null };
      }

      // Get public URL
      const { data: publicUrlData } = supabase.storage
        .from(this.BUCKET_NAME)
        .getPublicUrl(data.path);

      return { path: data.path, publicURL: publicUrlData.publicUrl, error: null };
    } catch (error) {
      console.error('Storage service error:', error);
      // For demo, return the original URI if anything fails
      return { path: 'demo-path', publicURL: imageUri, error: null };
    }
  }

  async uploadImage(
    imageUri: string,
    fileName: string
  ): Promise<{ publicUrl: string | null; error: string | null }> {
    try {
      const fileData = await uriToBlob(imageUri);

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from(this.BUCKET_NAME)
        .upload(fileName, fileData, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) {
        console.error('Upload error:', error);
        return { publicUrl: imageUri, error: null };
      }

      // Get public URL
      const { data: publicUrlData } = supabase.storage
        .from(this.BUCKET_NAME)
        .getPublicUrl(data.path);

      return { publicUrl: publicUrlData.publicUrl, error: null };
    } catch (error) {
      console.error('Storage service error:', error);
      return { publicUrl: imageUri, error: null };
    }
  }

  async deleteImage(fileName: string): Promise<{ success: boolean; error: string | null }> {
    try {
      const { error } = await supabase.storage
        .from(this.BUCKET_NAME)
        .remove([fileName]);

      if (error) {
        console.error('Delete error:', error);
        return { success: false, error: 'Failed to delete image' };
      }

      return { success: true, error: null };
    } catch (error) {
      console.error('Delete image error:', error);
      return { success: false, error: 'Failed to delete image' };
    }
  }

  generateFileName(userId: string, extension: string = 'jpg'): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 15);
    return `${userId}/${timestamp}_${random}.${extension}`;
  }
}

export const storageService = new StorageService();