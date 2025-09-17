export type Language = 'en' | 'hi' | 'ta';

export const translations = {
  en: {
    // Authentication
    login: 'Login',
    signup: 'Sign Up',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    dontHaveAccount: "Don't have an account?",
    alreadyHaveAccount: 'Already have an account?',
    
    // Language Selection
    selectLanguage: 'Select Your Preferred Language',
    english: 'English',
    hindi: 'Hindi',
    tamil: 'Tamil',
    continue: 'Continue',
    
    // Camera & Prediction
    captureImage: 'Capture Image',
    selectFromGallery: 'Select from Gallery',
    takePhoto: 'Take Photo',
    retakePhoto: 'Retake Photo',
    predict: 'Predict Breed',
    predicting: 'Predicting...',
    
    // Results
    predictionResults: 'Prediction Results',
    topPredictions: 'Top 3 Predictions',
    confidence: 'Confidence',
    
    // Feedback
    feedback: 'Feedback',
    wasThisCorrect: 'Was this prediction correct?',
    correct: 'Correct',
    incorrect: 'Incorrect',
    addComment: 'Add a comment (optional)',
    submitFeedback: 'Submit Feedback',
    
    // Common
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    cancel: 'Cancel',
    save: 'Save',
    back: 'Back',
    
    // Validation
    emailRequired: 'Email is required',
    invalidEmail: 'Please enter a valid email',
    passwordRequired: 'Password is required',
    passwordMinLength: 'Password must be at least 8 characters',
    passwordsDoNotMatch: 'Passwords do not match',
    
    // Messages
    loginSuccess: 'Login successful',
    signupSuccess: 'Account created successfully',
    predictionSuccess: 'Prediction completed',
    feedbackSuccess: 'Feedback submitted successfully',
    
    // Errors
    loginError: 'Login failed. Please check your credentials.',
    signupError: 'Sign up failed. Please try again.',
    predictionError: 'Failed to predict breed',
    feedbackError: 'Failed to submit feedback',
  },
  
  hi: {
    // Authentication
    login: 'लॉग इन',
    signup: 'साइन अप',
    email: 'ईमेल',
    password: 'पासवर्ड',
    confirmPassword: 'पासवर्ड की पुष्टि करें',
    dontHaveAccount: 'खाता नहीं है?',
    alreadyHaveAccount: 'पहले से खाता है?',
    
    // Language Selection
    selectLanguage: 'अपनी पसंदीदा भाषा चुनें',
    english: 'अंग्रेजी',
    hindi: 'हिंदी',
    tamil: 'तमिल',
    continue: 'जारी रखें',
    
    // Camera & Prediction
    captureImage: 'तस्वीर लें',
    selectFromGallery: 'गैलरी से चुनें',
    takePhoto: 'फोटो लें',
    retakePhoto: 'दोबारा फोटो लें',
    predict: 'नस्ल की भविष्यवाणी करें',
    predicting: 'भविष्यवाणी कर रहे हैं...',
    
    // Results
    predictionResults: 'भविष्यवाणी परिणाम',
    topPredictions: 'शीर्ष 3 भविष्यवाणियां',
    confidence: 'आत्मविश्वास',
    
    // Feedback
    feedback: 'प्रतिक्रिया',
    wasThisCorrect: 'क्या यह भविष्यवाणी सही थी?',
    correct: 'सही',
    incorrect: 'गलत',
    addComment: 'टिप्पणी जोड़ें (वैकल्पिक)',
    submitFeedback: 'प्रतिक्रिया जमा करें',
    
    // Common
    loading: 'लोड हो रहा है...',
    error: 'त्रुटि',
    success: 'सफलता',
    cancel: 'रद्द करें',
    save: 'सेव करें',
    back: 'वापस',
    
    // Validation
    emailRequired: 'ईमेल आवश्यक है',
    invalidEmail: 'कृपया एक वैध ईमेल दर्ज करें',
    passwordRequired: 'पासवर्ड आवश्यक है',
    passwordMinLength: 'पासवर्ड कम से कम 8 अक्षर का होना चाहिए',
    passwordsDoNotMatch: 'पासवर्ड मेल नहीं खाते',
    
    // Messages
    loginSuccess: 'लॉगिन सफल',
    signupSuccess: 'खाता सफलतापूर्वक बनाया गया',
    predictionSuccess: 'भविष्यवाणी पूर्ण',
    feedbackSuccess: 'प्रतिक्रिया सफलतापूर्वक जमा की गई',
    
    // Errors
    loginError: 'लॉगिन विफल। कृपया अपनी साख जांचें।',
    signupError: 'साइन अप विफल। कृपया पुनः प्रयास करें।',
    predictionError: 'नस्ल की भविष्यवाणी करने में विफल',
    feedbackError: 'प्रतिक्रिया जमा करने में विफल',
  },
  
  ta: {
    // Authentication
    login: 'உள்நுழைவு',
    signup: 'பதிவு செய்யவும்',
    email: 'மின்னஞ்சல்',
    password: 'கடவுச்சொல்',
    confirmPassword: 'கடவுச்சொல்லை உறுதிப்படுத்தவும்',
    dontHaveAccount: 'கணக்கு இல்லையா?',
    alreadyHaveAccount: 'ஏற்கனவே கணக்கு உள்ளதா?',
    
    // Language Selection
    selectLanguage: 'உங்கள் விருப்பமான மொழியைத் தேர்ந்தெடுக்கவும்',
    english: 'ஆங்கிலம்',
    hindi: 'இந்தி',
    tamil: 'தமிழ்',
    continue: 'தொடரவும்',
    
    // Camera & Prediction
    captureImage: 'படம் எடுக்கவும்',
    selectFromGallery: 'கேலரியில் இருந்து தேர்ந்தெடுக்கவும்',
    takePhoto: 'புகைப்படம் எடுக்கவும்',
    retakePhoto: 'மீண்டும் புகைப்படம் எடுக்கவும்',
    predict: 'இனம் கணிக்கவும்',
    predicting: 'கணிக்கிறது...',
    
    // Results
    predictionResults: 'கணிப்பு முடிவுகள்',
    topPredictions: 'முதல் 3 கணிப்புகள்',
    confidence: 'நம்பிக்கை',
    
    // Feedback
    feedback: 'கருத்து',
    wasThisCorrect: 'இந்த கணிப்பு சரியானதா?',
    correct: 'சரி',
    incorrect: 'தவறு',
    addComment: 'கருத்து சேர்க்கவும் (விருப்பம்)',
    submitFeedback: 'கருத்தை சமர்ப்பிக்கவும்',
    
    // Common
    loading: 'ஏற்றுகிறது...',
    error: 'பிழை',
    success: 'வெற்றி',
    cancel: 'ரத்து செய்யவும்',
    save: 'சேமிக்கவும்',
    back: 'திரும்ப',
    
    // Validation
    emailRequired: 'மின்னஞ்சல் தேவை',
    invalidEmail: 'தயவுசெய்து சரியான மின்னஞ்சலை உள்ளிடவும்',
    passwordRequired: 'கடவுச்சொல் தேவை',
    passwordMinLength: 'கடவுச்சொல் குறைந்தது 8 எழுத்துகளாக இருக்க வேண்டும்',
    passwordsDoNotMatch: 'கடவுச்சொற்கள் பொருந்தவில்லை',
    
    // Messages
    loginSuccess: 'உள்நுழைவு வெற்றிகரமானது',
    signupSuccess: 'கணக்கு வெற்றிகரமாக உருவாக்கப்பட்டது',
    predictionSuccess: 'கணிப்பு முடிந்தது',
    feedbackSuccess: 'கருத்து வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது',
    
    // Errors
    loginError: 'உள்நுழைவு தோல்வி. தயவுசெய்து உங்கள் சான்றுகளை சரிபார்க்கவும்.',
    signupError: 'பதிவு தோல்வி. தயவுசெய்து மீண்டும் முயற்சிக்கவும்.',
    predictionError: 'இனம் கணிப்பதில் தோல்வி',
    feedbackError: 'கருத்து சமர்ப்பிப்பதில் தோல்வி',
  },
};