#!/bin/bash

# Ultra simple deploy script for EC2

echo "🚀 Ultra Simple EC2 deployment..."

# Stop PM2 if running
pm2 stop all 2>/dev/null || echo "No PM2 to stop"
pm2 delete all 2>/dev/null || echo "No PM2 to delete"

# Create .env
echo "VITE_URL_API=http://3.22.168.72:7777/api" > .env
echo "VITE_CLERK_KEY=pk_test_aG9wZWZ1bC13YWxsZXllLTQuY2xlcmsuYWNjb3VudHMuZGV2JA" >> .env
echo "✅ .env created"

# Install
npm install
echo "✅ Dependencies installed"

# Build - try multiple approaches
echo "🔨 Attempting build..."

# Method 1: Simple vite build
if vite build; then
    echo "✅ Method 1 success: vite build"
    BUILD_OK=true
# Method 2: npx vite build  
elif npx vite build; then
    echo "✅ Method 2 success: npx vite build"
    BUILD_OK=true
# Method 3: npm run build:simple
elif npm run build:simple; then
    echo "✅ Method 3 success: npm run build:simple"
    BUILD_OK=true
else
    echo "❌ All build methods failed"
    BUILD_OK=false
fi

# Deploy if build succeeded
if [ "$BUILD_OK" = true ] && [ -d "dist" ]; then
    echo "📂 Deploying to nginx..."
    sudo cp -r dist/* /var/www/html/
    sudo systemctl restart nginx
    echo "🎉 SUCCESS! Application deployed!"
    echo "🌐 Visit your EC2 public IP to see the app"
else
    echo "❌ FAILED: Build unsuccessful or no dist folder"
    ls -la
fi