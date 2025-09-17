#!/bin/bash

echo "🚀 FINAL INSTALLATION - Complete Breed Predictor App Setup"
echo "=========================================================="
echo

# Step 1: Clean everything
echo "1️⃣ Cleaning previous installations..."
rm -rf node_modules package-lock.json yarn.lock .expo

# Step 2: Clear caches
echo "2️⃣ Clearing caches..."
npm cache clean --force

# Step 3: Install dependencies
echo "3️⃣ Installing all dependencies..."
npm install --legacy-peer-deps

# Step 4: Install AsyncStorage separately
echo "4️⃣ Installing AsyncStorage..."
npx expo install @react-native-async-storage/async-storage

# Step 5: Setup environment
echo "5️⃣ Setting up environment..."
if [ ! -f "src/config/env.ts" ]; then
  echo "Creating env.ts file..."
  cat > src/config/env.ts << 'EOF'
export default {
  SUPABASE_URL: 'https://dtzhwxgfuosuktelilkd.supabase.co',
  SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0emh3eGdmdW9zdWt0ZWxpbGtkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwOTEzMzUsImV4cCI6MjA3MzY2NzMzNX0.PJNyljxOpXMgaxdYOm6ElXWAvnAnOT-zkhoVEQQE-uI',
};
EOF
fi

# Step 6: Verify installation
echo "6️⃣ Verifying installation..."
npm list --depth=0 | grep -E "(expo|react|navigation|supabase)"

echo
echo "✅ Installation completed successfully!"
echo
echo "🎯 Your Breed Predictor App is ready!"
echo
echo "🚀 To start:"
echo "   npx expo start --clear"
echo
echo "📱 Features available:"
echo "   • Complete authentication system"
echo "   • Multi-language support (Tamil, Hindi, English)"
echo "   • Camera integration with image picker"
echo "   • AI breed prediction (mock ready for TensorFlow)"
echo "   • Supabase database operations"
echo "   • Cloud storage for images"
echo "   • User feedback system"
echo "   • Professional navigation"
echo
echo "🎉 Happy coding!"
