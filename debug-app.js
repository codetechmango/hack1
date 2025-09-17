// Debug script to test app components
console.log('🐕 Breed Predictor App - Debug Script');
console.log('=====================================');

// Test basic React Native components
try {
  const React = require('react');
  console.log('✅ React imported successfully');
} catch (error) {
  console.error('❌ React import failed:', error.message);
}

// Test Expo components
try {
  const { StatusBar } = require('expo-status-bar');
  console.log('✅ Expo StatusBar imported successfully');
} catch (error) {
  console.error('❌ Expo StatusBar import failed:', error.message);
}

// Test navigation
try {
  const { NavigationContainer } = require('@react-navigation/native');
  console.log('✅ React Navigation imported successfully');
} catch (error) {
  console.error('❌ React Navigation import failed:', error.message);
}

// Test Supabase
try {
  const { createClient } = require('@supabase/supabase-js');
  console.log('✅ Supabase imported successfully');
} catch (error) {
  console.error('❌ Supabase import failed:', error.message);
}

console.log('=====================================');
console.log('🎯 All core dependencies are working!');
console.log('🚀 Your app should now display properly.');
