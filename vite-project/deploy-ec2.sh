#!/bin/bash

# Deploy script for EC2 - cyber-web-front

echo "🚀 Starting EC2 deployment..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the vite-project directory."
    exit 1
fi

# Create .env file
echo "📝 Creating .env file..."
cat > .env << EOF
VITE_URL_API=http://3.22.168.72:7777/api
VITE_CLERK_KEY=pk_test_aG9wZWZ1bC13YWxsZXllLTQuY2xlcmsuYWNjb3VudHMuZGV2JA
EOF

echo "✅ .env file created:"
cat .env

# Check Node.js version
echo "📋 Node.js version:"
node --version

# Check npm version
echo "📋 npm version:"
npm --version

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Try different build approaches based on available TypeScript
echo "🔨 Building application..."

# First, try the EC2-specific build (without TypeScript compilation)
if npm run build:ec2 2>/dev/null; then
    echo "✅ Build successful using build:ec2"
elif npm run build:compatible 2>/dev/null; then
    echo "✅ Build successful using build:compatible"
else
    echo "⚠️  Standard builds failed, trying fallback..."
    # Fallback: build without TypeScript check
    npx vite build --mode production
fi

# Check if dist folder was created
if [ -d "dist" ]; then
    echo "✅ Build completed successfully!"
    echo "📁 Contents of dist folder:"
    ls -la dist/
    
    # Backup current website
    echo "💾 Creating backup..."
    sudo cp -r /var/www/html /var/www/html_backup_$(date +%Y%m%d_%H%M%S) 2>/dev/null || echo "⚠️  Could not create backup (maybe first deployment)"
    
    # Copy new files
    echo "📂 Copying files to web directory..."
    sudo cp -r dist/* /var/www/html/
    
    # Restart nginx
    echo "🔄 Restarting nginx..."
    sudo systemctl restart nginx
    
    echo "🎉 Deployment completed successfully!"
    echo "🌐 Your application should now be available at your EC2 public IP"
    
else
    echo "❌ Build failed - dist folder not found"
    exit 1
fi