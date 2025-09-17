#!/bin/bash

echo "🚀 COMPLETE FIX - Installing Hack1 Breed Predictor App"
echo "======================================================="
echo

# Step 1: Clean everything
echo "1️⃣ Cleaning previous installations..."
rm -rf node_modules
rm -f package-lock.json
rm -f yarn.lock

# Step 2: Clear caches
echo "2️⃣ Clearing all caches..."
npm cache clean --force
npx expo install --fix

# Step 3: Create necessary directories
echo "3️⃣ Creating necessary directories..."
mkdir -p assets

# Step 4: Install core dependencies first
echo "4️⃣ Installing core Expo dependencies..."
npm install expo@~54.0.7 --legacy-peer-deps

# Step 5: Install React packages
echo "5️⃣ Installing React packages..."
npm install react@19.1.0 react-native@0.81.4 --legacy-peer-deps

# Step 6: Install Expo packages
echo "6️⃣ Installing Expo packages..."
npm install expo-status-bar@~3.0.8 expo-image-picker@~17.0.8 --legacy-peer-deps

# Step 7: Install other dependencies
echo "7️⃣ Installing other dependencies..."
npm install @react-native-async-storage/async-storage@2.2.0 --legacy-peer-deps
npm install @supabase/supabase-js@2.57.4 --legacy-peer-deps

# Step 8: Install Navigation (carefully)
echo "8️⃣ Installing Navigation packages..."
npm install react-native-screens@4.7.1 --legacy-peer-deps
npm install react-native-safe-area-context@4.11.1 --legacy-peer-deps
npm install @react-navigation/native@6.1.18 --legacy-peer-deps
npm install @react-navigation/stack@6.4.1 --legacy-peer-deps

# Step 9: Install TypeScript
echo "9️⃣ Installing TypeScript..."
npm install --save-dev typescript@5.9.2 @types/react@19.1.10 --legacy-peer-deps

# Step 10: Final verification
echo "🔟 Verifying installation..."
npm ls --depth=0

echo
echo "✅ Installation completed successfully!"
echo "🚀 Now run: npx expo start --clear"
echo
