# 🐕 Breed Predictor App

A complete mobile application built with **React Native (Expo)** and **Supabase** that identifies dog breeds using AI and supports multiple languages.

## ✨ Features

- 🔐 **Authentication System** - Email/password login and registration
- 🌐 **Multi-language Support** - Tamil, Hindi, and English
- 📷 **Camera Integration** - Capture photos or select from gallery
- 🤖 **AI Breed Prediction** - Mock AI service with 30+ dog breeds
- 💾 **Database Integration** - Supabase for data persistence
- 💬 **Feedback System** - Rate predictions and add comments
- 🎨 **Professional UI** - Clean, modern design with loading states

## 🛠️ Tech Stack

- **Frontend**: React Native with Expo
- **Backend**: Supabase (Auth, Database, Storage)
- **Language**: TypeScript
- **Navigation**: React Navigation v6
- **State Management**: React Context API
- **Styling**: React Native StyleSheet
- **Internationalization**: Custom i18n service

## 📱 Screenshots

*Add screenshots of your app here after running it*

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI: `npm install -g @expo/cli`
- Mobile device with Expo Go app

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/breed-predictor-app.git
   cd breed-predictor-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env file (optional - app works with hardcoded values)
   cat > .env << 'EOF'
   SUPABASE_URL=your_supabase_url_here
   SUPABASE_ANON_KEY=your_supabase_anon_key_here
   EOF
   ```

4. **Set up Supabase database**
   - Go to [Supabase Dashboard](https://supabase.com/dashboard)
   - Create a new project or use existing one
   - Open SQL Editor
   - Copy and paste the contents of `supabase-schema.sql`
   - Execute the SQL to create tables and policies

5. **Start the development server**
   ```bash
   # For mobile testing (generates QR code)
   npx expo start --tunnel
   
   # For web testing
   npx expo start --web
   
   # For local development
   npx expo start
   ```

## 📱 Testing

### Mobile Testing (Recommended)
1. Install **Expo Go** app on your phone
2. Run `npx expo start --tunnel`
3. Scan the QR code with your phone
4. Test all features including camera

### Web Testing
1. Run `npx expo start --web`
2. Opens automatically in browser
3. Camera features will show sample images

## 🎯 App Flow

1. **Authentication** → Register/Login with email and password
2. **Language Selection** → Choose Tamil, Hindi, or English
3. **Camera Screen** → Take photo or select from gallery
4. **AI Prediction** → Get top 3 breed predictions with confidence scores
5. **Feedback** → Rate prediction accuracy and add comments

## 📁 Project Structure

```
/
├── src/
│   ├── components/common/     # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── ErrorMessage.tsx
│   ├── contexts/             # React contexts
│   │   └── AuthContext.tsx
│   ├── localization/         # Internationalization
│   │   ├── i18n.ts
│   │   └── translations.ts
│   ├── navigation/           # App navigation
│   │   └── AppNavigator.tsx
│   ├── screens/             # App screens
│   │   ├── LoginScreen.tsx
│   │   ├── SignupScreen.tsx
│   │   ├── LanguageSelectionScreen.tsx
│   │   ├── CameraScreen.tsx
│   │   └── FeedbackScreen.tsx
│   ├── services/            # Business logic
│   │   ├── authService.ts
│   │   ├── databaseService.ts
│   │   ├── predictionService.ts
│   │   ├── cameraService.ts
│   │   └── storageService.ts
│   └── config/              # Configuration
│       └── supabase.ts
├── App.tsx                  # Main app component
├── supabase-schema.sql      # Database setup script
└── package.json            # Dependencies
```

## 🗄️ Database Schema

The app uses Supabase with the following tables:

- **profiles** - User profiles with language preferences
- **predictions** - AI prediction results with metadata
- **feedback** - User feedback on predictions

All tables have Row Level Security (RLS) enabled for data protection.

## 🌐 Internationalization

The app supports three languages:
- **English** (en) - Default
- **Hindi** (hi) - हिंदी
- **Tamil** (ta) - தமிழ்

All UI strings are localized and switch in real-time when language is changed.

## 🤖 AI Integration

Currently uses a mock AI service for demonstration. The architecture is ready for:
- TensorFlow Lite integration
- Custom ML models
- Cloud-based AI services

Mock service includes:
- 30+ dog breed classifications
- Realistic confidence scores
- Top 3 predictions display

## 📸 Camera Features

- **Take Photo** - Capture new images (currently shows sample images)
- **Gallery Selection** - Choose from existing photos
- **Image Preview** - Review before prediction
- **Retake Option** - Capture again if needed

## 🔐 Authentication

- Email/password registration and login
- Form validation (email format, password length)
- Session persistence
- Secure logout

## 🎨 UI/UX Features

- **Loading States** - Smooth user experience
- **Error Handling** - Graceful error messages
- **Responsive Design** - Works on all screen sizes
- **Professional Styling** - Modern, clean interface

## 🚀 Deployment

### Expo Build
```bash
# Build for production
npx expo build:android
npx expo build:ios
```

### EAS Build (Recommended)
```bash
# Install EAS CLI
npm install -g @expo/eas-cli

# Configure build
npx eas build:configure

# Build for stores
npx eas build --platform all
```

## 🐛 Troubleshooting

### Common Issues

1. **Metro bundler fails**
   ```bash
   npx expo start --clear
   ```

2. **Dependencies conflicts**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   npx expo install --fix
   ```

3. **Supabase connection issues**
   - Check your credentials in `src/config/supabase.ts`
   - Verify database tables are created using `supabase-schema.sql`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@your-username](https://github.com/your-username)
- Email: your.email@example.com

## 🙏 Acknowledgments

- [Expo](https://expo.dev/) for the amazing development platform
- [Supabase](https://supabase.com/) for backend services
- [Unsplash](https://unsplash.com/) for sample dog images
- React Native community for excellent documentation

## 📊 Project Status

- ✅ Authentication System
- ✅ Multi-language Support  
- ✅ Mock Camera Integration
- ✅ AI Prediction Service (Mock)
- ✅ Database Integration
- ✅ Feedback System
- 🔄 Real Camera Integration (Coming Soon)
- 🔄 TensorFlow Lite Integration (Coming Soon)
- 🔄 Push Notifications (Coming Soon)

---

**⭐ If you found this project helpful, please give it a star!**
