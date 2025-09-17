import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
} from 'react-native';

interface LoadingScreenProps {
  message?: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  message = 'Loading...',
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=100&h=100&fit=crop' }}
          style={styles.logo}
        />
        <Text style={styles.title}>🐕 Breed Predictor</Text>
        <ActivityIndicator size="large" color="#007AFF" style={styles.spinner} />
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 30,
  },
  spinner: {
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
});
