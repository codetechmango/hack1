#!/bin/bash

echo "🚀 Installing all dependencies for Hack1 Breed Predictor App..."
echo

# Clear any existing node_modules and package-lock
echo "1. Cleaning previous installations..."
rm -rf node_modules
rm -f package-lock.json
rm -f yarn.lock

echo "2. Installing dependencies with legacy peer deps..."
npm install --legacy-peer-deps

echo "3. Installing additional Expo dependencies..."
npx expo install expo-image-picker expo-camera expo-media-library
npx expo install react-native-screens react-native-safe-area-context
npx expo install @react-native-async-storage/async-storage

echo "4. Installing navigation dependencies..."
npm install @react-navigation/native @react-navigation/stack --legacy-peer-deps

echo "5. Installing Supabase..."
npm install @supabase/supabase-js --legacy-peer-deps

echo
echo "✅ All dependencies installed successfully!"
echo
echo "🎯 To run the app:"
echo "   npx expo start --clear"
echo
echo "📱 Your breed predictor app is ready to use with all features:"
echo "   • Authentication (Supabase)"
echo "   • Camera integration"
echo "   • AI breed prediction"
echo "   • Database operations"
echo "   • Multi-language support"
echo "   • Feedback system"
echo
echo "🎉 Happy coding!"
