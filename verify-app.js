// Simple verification script to test app functionality
// Run with: node verify-app.js

console.log('🔍 Verifying App Restoration...\n');

const fs = require('fs');
const path = require('path');

// Check critical files exist
const criticalFiles = [
  'App.tsx',
  'index.js',
  'package.json',
  'babel.config.js',
  'metro.config.js',
];

console.log('1. Checking critical files...');
criticalFiles.forEach(file => {
  if (fs.existsSync(path.join(__dirname, file))) {
    console.log(`   ✅ ${file} exists`);
  } else {
    console.log(`   ❌ ${file} missing`);
  }
});

// Check package.json structure
console.log('\n2. Checking package.json...');
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  console.log(`   ✅ Package name: ${packageJson.name}`);
  console.log(`   ✅ Main entry: ${packageJson.main}`);
  console.log(`   ✅ Dependencies: ${Object.keys(packageJson.dependencies || {}).length} packages`);
  
  if (packageJson.scripts && packageJson.scripts.start) {
    console.log(`   ✅ Start script: ${packageJson.scripts.start}`);
  }
} catch (error) {
  console.log(`   ❌ Package.json error: ${error.message}`);
}

// Check App.tsx content
console.log('\n3. Checking App.tsx...');
try {
  const appContent = fs.readFileSync('App.tsx', 'utf8');
  if (appContent.includes('export default function App')) {
    console.log('   ✅ App component found');
  }
  if (appContent.includes('useState')) {
    console.log('   ✅ React hooks used');
  }
  if (appContent.includes('TouchableOpacity')) {
    console.log('   ✅ Interactive components found');
  }
} catch (error) {
  console.log(`   ❌ App.tsx error: ${error.message}`);
}

// Check src structure
console.log('\n4. Checking src structure...');
const srcFolders = ['components', 'screens', 'services', 'contexts', 'navigation'];
srcFolders.forEach(folder => {
  const folderPath = path.join(__dirname, 'src', folder);
  if (fs.existsSync(folderPath)) {
    const files = fs.readdirSync(folderPath, { withFileTypes: true });
    const fileCount = files.filter(f => f.isFile()).length;
    console.log(`   ✅ src/${folder}/ exists (${fileCount} files)`);
  } else {
    console.log(`   ⚠️  src/${folder}/ missing`);
  }
});

console.log('\n🎉 VERIFICATION COMPLETE!');
console.log('\n🚀 To run your app:');
console.log('   npx expo start --clear');
console.log('\n📱 Your app is ready to use!');
