import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../contexts/AuthContext';

// Screens
import { TestScreen } from '../screens/TestScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { SignupScreen } from '../screens/SignupScreen';
import { LanguageSelectionScreen } from '../screens/LanguageSelectionScreen';
import { CameraScreen } from '../screens/CameraScreen';
import { FeedbackScreen } from '../screens/FeedbackScreen';

// Components
import { LoadingScreen } from '../components/common/LoadingScreen';

export type RootStackParamList = {
  Test: undefined;
  Login: undefined;
  Signup: undefined;
  LanguageSelection: undefined;
  Camera: undefined;
  Feedback: {
    prediction: any;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#F8F9FA' },
    }}
    initialRouteName="Login"
  >
    <Stack.Screen name="Test" component={TestScreen} />
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

  // Show loading screen while checking authentication
  if (loading) {
    return <LoadingScreen message="Initializing app..." />;
  }

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};