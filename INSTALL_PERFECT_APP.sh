#!/bin/bash

echo "🚀 INSTALLING PERFECT BREED PREDICTOR APP - SDK 54"
echo "=================================================="
echo "Fixing all 12 problems and creating perfect app..."
echo

# Step 1: Update npm and expo CLI
echo "1️⃣ Updating tools..."
npm install -g npm@latest
npm install -g @expo/cli@latest

# Step 2: Install core dependencies
echo "2️⃣ Installing core dependencies..."
npm install --legacy-peer-deps

# Step 3: Install Expo packages using expo install
echo "3️⃣ Installing Expo SDK 54 packages..."
npx expo install expo@~54.0.7
npx expo install expo-status-bar@~3.0.8
npx expo install expo-camera@~17.0.8 
npx expo install expo-image-picker@~17.0.8
npx expo install expo-splash-screen@~0.30.2

# Step 4: Install React Navigation
echo "4️⃣ Installing React Navigation..."
npm install @react-navigation/native@^6.1.18 --legacy-peer-deps
npm install @react-navigation/native-stack@^6.11.0 --legacy-peer-deps
npx expo install react-native-screens react-native-safe-area-context
npx expo install react-native-gesture-handler react-native-reanimated

# Step 5: Install other dependencies
echo "5️⃣ Installing other dependencies..."
npx expo install @react-native-async-storage/async-storage
npm install @supabase/supabase-js@^2.57.4 --legacy-peer-deps
npm install uuid@^9.0.1 react-native-get-random-values@^1.11.0 --legacy-peer-deps

# Step 6: Install TensorFlow (optional)
echo "6️⃣ Installing TensorFlow..."
npm install @tensorflow/tfjs@^4.21.0 @tensorflow/tfjs-react-native@^1.0.0 --legacy-peer-deps

# Step 7: Install dev dependencies
echo "7️⃣ Installing dev dependencies..."
npm install --save-dev typescript@~5.9.2 @types/react@~19.1.0 @babel/core@^7.25.8 --legacy-peer-deps

# Step 8: Verify installation
echo "8️⃣ Verifying installation..."
npm list --depth=0

echo
echo "✅ Perfect app installation completed!"
echo "🎯 All 12 problems should now be resolved!"
echo
echo "🚀 To start your perfect app:"
echo "   npx expo start --clear"
echo
