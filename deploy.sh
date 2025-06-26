#!/bin/bash

# KAI Netlify Deployment Script
echo "🚀 Starting KAI deployment to Netlify..."

# Check if Netlify CLI is installed
if ! command -v netlify &> /dev/null; then
    echo "❌ Netlify CLI not found. Installing..."
    npm install -g netlify-cli
fi

# Build the project
echo "📦 Building project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Deploy to Netlify
    echo "🌐 Deploying to Netlify..."
    netlify deploy --prod --dir=out
    
    echo "🎉 Deployment complete!"
else
    echo "❌ Build failed. Please check for errors."
    exit 1
fi 