// Mock for expo-image-picker
export enum MediaTypeOptions {
  All = 'All',
  Videos = 'Videos',
  Images = 'Images',
}

export interface ImagePickerAsset {
  uri: string;
  width: number;
  height: number;
  type?: 'image' | 'video';
  fileName?: string;
  fileSize?: number;
}

export interface ImagePickerResult {
  canceled: boolean;
  assets?: ImagePickerAsset[];
}

export interface ImagePickerOptions {
  mediaTypes?: MediaTypeOptions;
  allowsEditing?: boolean;
  aspect?: [number, number];
  quality?: number;
  allowsMultipleSelection?: boolean;
}

export interface PermissionResponse {
  status: 'granted' | 'denied' | 'undetermined';
  granted: boolean;
  canAskAgain: boolean;
}

export const requestMediaLibraryPermissionsAsync = (): Promise<PermissionResponse> => {
  return Promise.resolve({ 
    status: 'granted' as const, 
    granted: true, 
    canAskAgain: true 
  });
};

export const requestCameraPermissionsAsync = (): Promise<PermissionResponse> => {
  return Promise.resolve({ 
    status: 'granted' as const, 
    granted: true, 
    canAskAgain: true 
  });
};

export const launchCameraAsync = (options?: ImagePickerOptions): Promise<ImagePickerResult> => {
  return Promise.resolve({
    canceled: false,
    assets: [{
      uri: 'mock://camera-image.jpg',
      width: 1920,
      height: 1080,
      type: 'image' as const
    }]
  });
};

export const launchImageLibraryAsync = (options?: ImagePickerOptions): Promise<ImagePickerResult> => {
  return Promise.resolve({
    canceled: false,
    assets: [{
      uri: 'mock://gallery-image.jpg',
      width: 1920,
      height: 1080,
      type: 'image' as const
    }]
  });
};
