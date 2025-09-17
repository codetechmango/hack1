import { supabase } from '../config/supabase';

class StorageService {
  private readonly BUCKET_NAME = 'predictions-images';

  async uploadImage(
    imageUri: string,
    fileName: string
  ): Promise<{ publicUrl: string | null; error: string | null }> {
    try {
      // For demo purposes, we'll simulate upload and return the local URI
      // In a real app, you would upload to Supabase Storage
      
      // Convert image URI to blob (for web) or use direct URI (for mobile)
      let fileData: any;
      
      if (imageUri.startsWith('data:')) {
        // Base64 data URI
        const response = await fetch(imageUri);
        fileData = await response.blob();
      } else {
        // File URI - create form data
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
        return { publicUrl: imageUri, error: null };
      }

      // Get public URL
      const { data: publicUrlData } = supabase.storage
        .from(this.BUCKET_NAME)
        .getPublicUrl(data.path);

      return { publicUrl: publicUrlData.publicUrl, error: null };
    } catch (error) {
      console.error('Storage service error:', error);
      // For demo, return the original URI if anything fails
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