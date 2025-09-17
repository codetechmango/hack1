# 🚀 Breed Predictor App - Setup Guide

## 📋 Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- Mobile device with Expo Go app (for testing)

## 🔧 Installation Steps

### Step 1: Install Dependencies
```bash
cd /Users/saikiran/hack1
npm install
```

### Step 2: Install Missing Expo Package
```bash
npx expo install expo-image-picker
```

### Step 3: Fix Dependencies (if needed)
```bash
npx expo install --fix
```

### Step 4: Start the App
```bash
# For tunnel mode (generates QR code for mobile testing)
npx expo start --tunnel

# For local development
npx expo start

# For web testing
npx expo start --web
```

## 📱 Testing Options

### Mobile Testing (Recommended)
1. Install Expo Go app on your phone
2. Run `npx expo start --tunnel`
3. Scan the QR code with your phone
4. Test all features including camera

### Web Testing
1. Run `npx expo start --web`
2. Opens in browser automatically
3. Camera features will be simulated

## 🗄️ Database Setup

### Supabase Configuration
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Open your project SQL Editor
3. Copy and paste the contents of `supabase-schema.sql`
4. Execute the SQL to create all tables and policies

## 🎯 Features to Test

1. **Authentication**
   - Register new account (email validation)
   - Login with existing account
   - Session persistence

2. **Language Selection**
   - Choose Tamil, Hindi, or English
   - UI updates immediately
   - Preference saved to database

3. **Camera & Prediction**
   - Take photo with camera
   - Select from gallery
   - AI breed prediction (mock)
   - View top 3 results

4. **Feedback System**
   - Rate predictions as correct/incorrect
   - Add optional comments
   - Data saved to database

## 🐛 Troubleshooting

### If `expo-image-picker` is missing:
```bash
npm install expo-image-picker@~16.1.0
```

### If Metro bundler fails:
```bash
npx expo start --clear
```

### If dependencies are conflicting:
```bash
rm -rf node_modules package-lock.json
npm install
npx expo install --fix
```

## 📁 Project Structure
```
/Users/saikiran/hack1/
├── src/
│   ├── components/common/     # Reusable UI components
│   ├── contexts/             # React contexts (Auth)
│   ├── localization/         # i18n system
│   ├── navigation/           # App navigation
│   ├── screens/             # App screens
│   ├── services/            # Business logic services
│   └── config/              # Configuration files
├── App.tsx                  # Main app component
├── package.json            # Dependencies
└── supabase-schema.sql     # Database setup
```

## ✅ Success Indicators
- QR code appears for mobile testing
- Web version loads without errors
- All screens navigate properly
- Multi-language switching works
- Camera permissions are requested
- Mock predictions show results
