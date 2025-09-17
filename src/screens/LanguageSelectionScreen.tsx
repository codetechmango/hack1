import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/common/Button';
import { i18n } from '../localization/i18n';
import { Language } from '../localization/translations';

interface LanguageSelectionScreenProps {
  navigation: any;
}

interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
}

const languageOptions: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
];

export const LanguageSelectionScreen = ({
  navigation,
}: LanguageSelectionScreenProps) => {
  const { updateUserProfile, user } = useAuth();
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [loading, setLoading] = useState(false);
  const [, forceUpdate] = useState({});

  useEffect(() => {
    const unsubscribe = i18n.subscribe(() => {
      forceUpdate({});
    });
    
    if (user?.profile?.preferred_language) {
      setSelectedLanguage(user.profile.preferred_language);
    }
    
    return unsubscribe;
  }, [user]);

  const handleLanguageSelect = (language: Language) => {
    setSelectedLanguage(language);
    i18n.setLanguage(language);
  };

  const handleContinue = async () => {
    setLoading(true);
    
    try {
      const result = await updateUserProfile(selectedLanguage);
      
      if (!result.success) {
        Alert.alert(
          i18n.t('error'),
          result.error ? i18n.t(result.error) : 'Failed to update language preference'
        );
        return;
      }

      Alert.alert(
        i18n.t('success'),
        'Language preference saved successfully!',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Camera'),
          },
        ]
      );
    } catch (error) {
      console.error('Language selection error:', error);
      Alert.alert(i18n.t('error'), 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{i18n.t('selectLanguage')}</Text>
        <Text style={styles.subtitle}>Choose your preferred language</Text>
      </View>

      <View style={styles.languageList}>
        {languageOptions.map((option) => (
          <TouchableOpacity
            key={option.code}
            style={[
              styles.languageOption,
              selectedLanguage === option.code && styles.selectedOption,
            ]}
            onPress={() => handleLanguageSelect(option.code)}
          >
            <View style={styles.languageContent}>
              <Text style={styles.flag}>{option.flag}</Text>
              <View style={styles.languageText}>
                <Text style={styles.languageName}>{option.name}</Text>
                <Text style={styles.nativeName}>{option.nativeName}</Text>
              </View>
              {selectedLanguage === option.code && (
                <Text style={styles.checkmark}>✓</Text>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footer}>
        <Button
          title={i18n.t('continue')}
          onPress={handleContinue}
          loading={loading}
          style={styles.continueButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 48,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
  languageList: {
    flex: 1,
  },
  languageOption: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedOption: {
    borderColor: '#007AFF',
    backgroundColor: '#F0F8FF',
  },
  languageContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flag: {
    fontSize: 32,
    marginRight: 16,
  },
  languageText: {
    flex: 1,
  },
  languageName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  nativeName: {
    fontSize: 16,
    color: '#666666',
  },
  checkmark: {
    fontSize: 24,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  footer: {
    paddingTop: 24,
  },
  continueButton: {
    marginTop: 8,
  },
});