import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { i18n } from '../localization/i18n';

interface SignupScreenProps {
  navigation: any;
}

export const SignupScreen = ({ navigation }: SignupScreenProps) => {
  const { signUp, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [, forceUpdate] = useState({});

  useEffect(() => {
    const unsubscribe = i18n.subscribe(() => {
      forceUpdate({});
    });
    return unsubscribe;
  }, []);

  const validateForm = (): boolean => {
    if (!email.trim()) {
      setError(i18n.t('emailRequired'));
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError(i18n.t('invalidEmail'));
      return false;
    }

    if (!password.trim()) {
      setError(i18n.t('passwordRequired'));
      return false;
    }

    if (password.length < 8) {
      setError(i18n.t('passwordMinLength'));
      return false;
    }

    if (password !== confirmPassword) {
      setError(i18n.t('passwordsDoNotMatch'));
      return false;
    }

    return true;
  };

  const handleSignup = async () => {
    setError(null);
    
    if (!validateForm()) {
      return;
    }

    const result = await signUp(email.trim(), password, confirmPassword);
    
    if (!result.success) {
      setError(result.error ? i18n.t(result.error) : i18n.t('signupError'));
    } else {
      Alert.alert(
        i18n.t('success'),
        i18n.t('signupSuccess'),
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('LanguageSelection'),
          },
        ]
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.title}>{i18n.t('signup')}</Text>
          <Text style={styles.subtitle}>🐕 Create Your Account</Text>
        </View>

        <View style={styles.form}>
          <Input
            label={i18n.t('email')}
            value={email}
            onChangeText={setEmail}
            placeholder={i18n.t('email')}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Input
            label={i18n.t('password')}
            value={password}
            onChangeText={setPassword}
            placeholder={i18n.t('password')}
            isPassword
          />

          <Input
            label={i18n.t('confirmPassword')}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder={i18n.t('confirmPassword')}
            isPassword
          />

          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          <Button
            title={i18n.t('signup')}
            onPress={handleSignup}
            loading={loading}
            style={styles.signupButton}
          />

          <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.loginLink}>
            <Text style={styles.loginText}>
              {i18n.t('alreadyHaveAccount')} {' '}
              <Text style={styles.loginLinkText}>{i18n.t('login')}</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#666666',
  },
  form: {
    width: '100%',
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
  signupButton: {
    marginTop: 24,
  },
  loginLink: {
    marginTop: 24,
    alignItems: 'center',
  },
  loginText: {
    fontSize: 16,
    color: '#666666',
  },
  loginLinkText: {
    color: '#007AFF',
    fontWeight: '600',
  },
});