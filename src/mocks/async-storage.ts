// Mock for @react-native-async-storage/async-storage
export interface AsyncStorageStatic {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
  mergeItem(key: string, value: string): Promise<void>;
  clear(): Promise<void>;
  getAllKeys(): Promise<readonly string[]>;
  multiGet(keys: readonly string[]): Promise<readonly [string, string | null][]>;
  multiSet(keyValuePairs: readonly [string, string][]): Promise<void>;
  multiRemove(keys: readonly string[]): Promise<void>;
  multiMerge(keyValuePairs: readonly [string, string][]): Promise<void>;
}

const AsyncStorage: AsyncStorageStatic = {
  getItem: (key: string) => Promise.resolve(null),
  setItem: (key: string, value: string) => Promise.resolve(),
  removeItem: (key: string) => Promise.resolve(),
  mergeItem: (key: string, value: string) => Promise.resolve(),
  clear: () => Promise.resolve(),
  getAllKeys: () => Promise.resolve([]),
  multiGet: (keys: readonly string[]) => Promise.resolve(keys.map(key => [key, null] as [string, string | null])),
  multiSet: (keyValuePairs: readonly [string, string][]) => Promise.resolve(),
  multiRemove: (keys: readonly string[]) => Promise.resolve(),
  multiMerge: (keyValuePairs: readonly [string, string][]) => Promise.resolve(),
};

export default AsyncStorage;
