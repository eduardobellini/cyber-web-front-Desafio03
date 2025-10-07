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
    
# Deploy options
echo "🚀 Choose deployment method:"
echo "1. Static files with Nginx (Recommended)"
echo "2. PM2 with Vite preview server"

read -p "Enter option (1 or 2): " DEPLOY_OPTION

if [ "$DEPLOY_OPTION" = "1" ]; then
    # Copy new files to nginx
    echo "📂 Copying files to web directory..."
    sudo cp -r dist/* /var/www/html/
    
    # Restart nginx
    echo "🔄 Restarting nginx..."
    sudo systemctl restart nginx
    
    echo "🎉 Static deployment completed successfully!"
    echo "🌐 Your application is available at your EC2 public IP"
    
elif [ "$DEPLOY_OPTION" = "2" ]; then
    # PM2 deployment
    echo "🔄 Stopping PM2 processes..."
    pm2 stop all 2>/dev/null || echo "No PM2 processes to stop"
    pm2 delete all 2>/dev/null || echo "No PM2 processes to delete"
    
    echo "🚀 Starting with PM2..."
    pm2 start npm --name "cyber-web-front" -- start
    pm2 save
    
    echo "🎉 PM2 deployment completed successfully!"
    echo "🌐 Your application is available at your EC2 public IP:3000"
    echo "📊 Check PM2 status with: pm2 status"
    
else
    echo "❌ Invalid option selected"
    exit 1
fielse
    echo "❌ Build failed - dist folder not found"
    exit 1
fi