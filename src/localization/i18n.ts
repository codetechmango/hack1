import AsyncStorage from '@react-native-async-storage/async-storage';
import { translations, Language } from './translations';

class I18nService {
  private currentLanguage: Language = 'en';
  private listeners: Array<() => void> = [];

  async initialize(): Promise<void> {
    try {
      const savedLanguage = await AsyncStorage.getItem('preferred_language');
      if (savedLanguage && this.isValidLanguage(savedLanguage)) {
        this.currentLanguage = savedLanguage as Language;
      }
    } catch (error) {
      console.error('Failed to load saved language:', error);
    }
  }

  private isValidLanguage(lang: string): lang is Language {
    return ['en', 'hi', 'ta'].includes(lang);
  }

  async setLanguage(language: Language): Promise<void> {
    this.currentLanguage = language;
    try {
      await AsyncStorage.setItem('preferred_language', language);
      this.notifyListeners();
    } catch (error) {
      console.error('Failed to save language preference:', error);
    }
  }

  getCurrentLanguage(): Language {
    return this.currentLanguage;
  }

  t(key: string): string {
    const keys = key.split('.');
    let value: any = translations[this.currentLanguage];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback to English if key not found
        value = translations.en;
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object' && fallbackKey in value) {
            value = value[fallbackKey];
          } else {
            return key; // Return key if not found in any language
          }
        }
        break;
      }
    }
    
    return typeof value === 'string' ? value : key;
  }

  subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener());
  }
}

export const i18n = new I18nService();