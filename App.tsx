import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from './src/contexts/AuthContext';
import { AppNavigator } from './src/navigation/AppNavigator';
import { i18n } from './src/localization/i18n';

export default function App() {
  useEffect(() => {
    // Initialize i18n on app start
    i18n.initialize().catch(error => {
      console.error('Failed to initialize i18n:', error);
    });
  }, []);

  return (
    <>
      <StatusBar style="auto" />
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </>
  );
}
