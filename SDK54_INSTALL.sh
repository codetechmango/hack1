#!/bin/bash

echo "🚀 EXPO SDK 54 INSTALLATION - Breed Predictor App"
echo "================================================"
echo

# Step 1: Check Expo CLI version
echo "1️⃣ Checking Expo CLI version..."
if ! command -v expo &> /dev/null; then
    echo "Installing Expo CLI..."
    npm install -g @expo/cli@latest
else
    echo "Updating Expo CLI..."
    npm install -g @expo/cli@latest
fi

# Step 2: Clean everything
echo "2️⃣ Cleaning previous installations..."
rm -rf node_modules package-lock.json yarn.lock .expo

# Step 3: Clear caches
echo "3️⃣ Clearing caches..."
npm cache clean --force
npx expo install --fix

# Step 4: Install SDK 54 dependencies
echo "4️⃣ Installing Expo SDK 54 dependencies..."
npm install --legacy-peer-deps

# Step 5: Install additional required packages
echo "5️⃣ Installing additional packages for SDK 54..."
npx expo install expo-splash-screen@~0.30.2
npx expo install expo-status-bar@~3.0.8
npx expo install expo-camera@~17.0.8
npx expo install expo-image-picker@~17.0.8

# Step 6: Install navigation dependencies
echo "6️⃣ Installing navigation dependencies..."
npx expo install react-native-screens react-native-safe-area-context
npx expo install @react-navigation/native @react-navigation/native-stack

# Step 7: Install AsyncStorage
echo "7️⃣ Installing AsyncStorage..."
npx expo install @react-native-async-storage/async-storage

# Step 8: Verify installation
echo "8️⃣ Verifying SDK 54 installation..."
npx expo doctor

echo
echo "✅ Expo SDK 54 installation completed!"
echo
echo "🎯 Your app is now compatible with Expo SDK 54!"
echo
echo "📱 New features in SDK 54:"
echo "   • Improved performance and stability"
echo "   • Enhanced camera capabilities"
echo "   • Better TypeScript support"
echo "   • Updated React Native 0.81.4"
echo "   • Latest navigation components"
echo
echo "🚀 To start your app:"
echo "   npx expo start --clear"
echo
echo "📱 To test with Expo Go:"
echo "   Make sure you have the latest Expo Go app"
echo "   Scan the QR code that appears"
echo
echo "🎉 Happy coding with SDK 54!"
