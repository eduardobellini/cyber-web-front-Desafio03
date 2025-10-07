#!/bin/bash

# Simple deploy script for EC2 - cyber-web-front

echo "🚀 Simple EC2 deployment..."

# Create .env
echo "VITE_URL_API=http://3.22.168.72:7777/api" > .env
echo "VITE_CLERK_KEY=pk_test_aG9wZWZ1bC13YWxsZXllLTQuY2xlcmsuYWNjb3VudHMuZGV2JA" >> .env

# Install and build
npm install

# Try different build methods
if npm run build:ec2 2>/dev/null; then
    echo "✅ Built with build:ec2"
elif npx vite build 2>/dev/null; then
    echo "✅ Built with vite build"
else
    echo "❌ Build failed"
    exit 1
fi

# Deploy to nginx
if [ -d "dist" ]; then
    sudo cp -r dist/* /var/www/html/
    sudo systemctl restart nginx
    echo "🎉 Deployed successfully!"
else
    echo "❌ No dist folder found"
    exit 1
fi