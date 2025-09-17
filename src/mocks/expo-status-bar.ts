// Mock for expo-status-bar
import React from 'react';

export interface StatusBarProps {
  style?: 'auto' | 'inverted' | 'light' | 'dark';
  backgroundColor?: string;
  translucent?: boolean;
  hidden?: boolean;
  networkActivityIndicatorVisible?: boolean;
  animated?: boolean;
}

export const StatusBar: React.FC<StatusBarProps> = () => null;
