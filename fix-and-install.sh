#!/bin/bash

echo "🔧 Fixing dependency conflicts and installing..."
echo

# Clean previous installations
echo "1. Cleaning previous installations..."
rm -rf node_modules
rm -f package-lock.json
rm -f yarn.lock

# Clear npm cache
echo "2. Clearing npm cache..."
npm cache clean --force

# Install dependencies with legacy peer deps to resolve conflicts
echo "3. Installing dependencies with legacy peer deps..."
npm install --legacy-peer-deps

# Install additional TypeScript types
echo "4. Installing TypeScript dependencies..."
npm install --save-dev typescript@~5.9.2 @types/react@~19.1.10 --legacy-peer-deps

echo
echo "✅ Dependencies installed successfully!"
echo
echo "🚀 Now you can run your app:"
echo "   npx expo start --clear"
echo
