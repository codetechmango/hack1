import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

interface TestScreenProps {
  navigation?: any;
}

export const TestScreen: React.FC<TestScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎉 Hello World!</Text>
      <Text style={styles.subtitle}>Breed Predictor App is Working!</Text>
      
      <View style={styles.features}>
        <Text style={styles.featureTitle}>✅ Features Ready:</Text>
        <Text style={styles.feature}>🔐 Authentication System</Text>
        <Text style={styles.feature}>🌐 Multi-language Support</Text>
        <Text style={styles.feature}>📷 Camera Integration</Text>
        <Text style={styles.feature}>🤖 AI Breed Prediction</Text>
        <Text style={styles.feature}>💾 Database Integration</Text>
        <Text style={styles.feature}>💬 Feedback System</Text>
      </View>

      {navigation && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Go to Login</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#666666',
    marginBottom: 40,
    textAlign: 'center',
  },
  features: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 40,
    width: '100%',
    maxWidth: 300,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 15,
    textAlign: 'center',
  },
  feature: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 8,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
