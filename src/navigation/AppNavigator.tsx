import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../contexts/AuthContext';

// Screens
import { LoginScreen } from '../screens/LoginScreen';
import { SignupScreen } from '../screens/SignupScreen';
import { LanguageSelectionScreen } from '../screens/LanguageSelectionScreen';
import { CameraScreen } from '../screens/CameraScreen';
import { FeedbackScreen } from '../screens/FeedbackScreen';

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  LanguageSelection: undefined;
  Camera: undefined;
  Feedback: {
    prediction: any;
  };
};

const Stack = createStackNavigator<RootStackParamList>();

const AuthStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#F8F9FA' },
    }}
  >
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Signup" component={SignupScreen} />
    <Stack.Screen name="LanguageSelection" component={LanguageSelectionScreen} />
  </Stack.Navigator>
);

const AppStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#F8F9FA' },
    }}
  >
    <Stack.Screen name="Camera" component={CameraScreen} />
    <Stack.Screen name="Feedback" component={FeedbackScreen} />
  </Stack.Navigator>
);

export const AppNavigator: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return null; // You could add a loading screen here
  }

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};