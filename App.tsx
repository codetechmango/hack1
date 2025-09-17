import React, { useEffect } from 'react';
import { StatusBar } from './src/mocks/expo-status-bar';
import { View, StyleSheet } from 'react-native';
import { AuthProvider } from './src/contexts/AuthContext';
import { AppNavigator } from './src/navigation/AppNavigator';
import { i18n } from './src/localization/i18n';
import { ErrorBoundary } from './src/components/common/ErrorBoundary';

export default function App() {
  useEffect(() => {
    // Initialize i18n on app start
    i18n.initialize().catch(error => {
      console.error('Failed to initialize i18n:', error);
    });
  }, []);

  return (
    <ErrorBoundary children={
      <View style={styles.container}>
        <StatusBar style="auto" />
        <AuthProvider children={<AppNavigator />} />
      </View>
    } />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
