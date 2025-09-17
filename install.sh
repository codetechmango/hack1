#!/bin/bash

echo "Installing dependencies for Breed Predictor App..."

# Navigate to project directory
cd /Users/saikiran/hack1

# Install all dependencies
npm install

# Install any missing Expo dependencies
npx expo install --fix

echo "Installation complete!"
echo "To start the app, run: npx expo start --tunnel"
