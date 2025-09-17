import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from 'react-native';

interface ErrorMessageProps {
  message: string;
  title?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  onRetry?: () => void;
  retryText?: string;
  variant?: 'error' | 'warning' | 'info';
}

export const ErrorMessage = ({
  message,
  title,
  style,
  textStyle,
  onRetry,
  retryText = 'Retry',
  variant = 'error',
}) => {
  const containerStyle = [
    styles.container,
    styles[variant],
    style,
  ];

  const messageStyle = [
    styles.message,
    textStyle,
  ];

  return (
    <View style={containerStyle}>
      {title && <Text style={styles.title}>{title}</Text>}
      <Text style={messageStyle}>{message}</Text>
      {onRetry && (
        <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
          <Text style={styles.retryText}>{retryText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
  },
  error: {
    backgroundColor: '#FFEBEE',
    borderLeftWidth: 4,
    borderLeftColor: '#F44336',
  },
  warning: {
    backgroundColor: '#FFF8E1',
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
  },
  info: {
    backgroundColor: '#E3F2FD',
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  message: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  retryButton: {
    marginTop: 12,
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#007AFF',
    borderRadius: 6,
  },
  retryText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});