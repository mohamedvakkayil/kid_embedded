#!/bin/bash

# AWS Deployment Script for Robot Builder Pro
# This script helps deploy to various AWS services
#
# Usage: ./aws-deploy.sh [option]
# Options: amplify, ecs, ec2, s3

set -e

echo "🤖 Robot Builder Pro - AWS Deployment"
echo "====================================="
echo ""

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI is not installed."
    echo "   Install it from: https://aws.amazon.com/cli/"
    exit 1
fi

# Check AWS credentials
if ! aws sts get-caller-identity &> /dev/null; then
    echo "⚠️  AWS credentials not configured."
    echo "   Run: aws configure"
    echo "   Or set AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY"
    exit 1
fi

# Set default region if not set
if [ -z "$AWS_REGION" ]; then
    echo "⚠️  AWS_REGION not set. Using us-east-1 as default."
    export AWS_REGION=us-east-1
fi

# Get AWS account ID
AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
echo "✓ AWS Account: $AWS_ACCOUNT_ID"
echo "✓ AWS Region: $AWS_REGION"
echo ""

# If option provided as argument, use it; otherwise prompt
if [ -n "$1" ]; then
    choice="$1"
else
    echo "Select deployment method:"
    echo "1) AWS Amplify (Recommended for Next.js)"
    echo "2) AWS ECS/Fargate (Docker)"
    echo "3) AWS EC2 (Manual)"
    echo "4) AWS S3 + CloudFront (Static Export)"
    echo ""
    read -p "Enter choice [1-4]: " choice
fi

case $choice in
    1|amplify)
        echo "📦 AWS Amplify Deployment"
        echo "========================"
        echo ""
        echo "To deploy to AWS Amplify:"
        echo ""
        echo "1. Push your code to Git (GitHub/GitLab/Bitbucket)"
        echo "   git add ."
        echo "   git commit -m 'Ready for deployment'"
        echo "   git push origin main"
        echo ""
        echo "2. Go to AWS Amplify Console:"
        echo "   https://console.aws.amazon.com/amplify"
        echo ""
        echo "3. Click 'New app' → 'Host web app'"
        echo ""
        echo "4. Connect your Git repository"
        echo ""
        echo "5. Amplify will auto-detect Next.js (amplify.yml is ready)"
        echo ""
        echo "6. Add environment variables:"
        echo "   - DATABASE_URL"
        echo "   - NEXT_PUBLIC_APP_URL"
        echo "   - NODE_ENV=production"
        echo ""
        echo "7. Save and deploy!"
        echo ""
        echo "📚 See AWS_QUICK_START.md for detailed steps"
        ;;
    2|ecs|fargate)
        echo "🐳 AWS ECS/Fargate Deployment"
        echo "============================="
        echo ""
        
        # Check if Docker is installed
        if ! command -v docker &> /dev/null; then
            echo "❌ Docker is not installed."
            echo "   Install it from: https://docs.docker.com/get-docker/"
            exit 1
        fi
        
        ECR_REPO="robot-builder"
        ECR_URI="$AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPO"
        
        echo "Step 1: Creating ECR repository (if it doesn't exist)..."
        aws ecr describe-repositories --repository-names $ECR_REPO --region $AWS_REGION 2>/dev/null || \
        aws ecr create-repository --repository-name $ECR_REPO --region $AWS_REGION --output json > /dev/null
        echo "✓ ECR repository ready: $ECR_REPO"
        echo ""
        
        echo "Step 2: Building Docker image..."
        docker build -t robot-builder:latest .
        echo "✓ Docker image built"
        echo ""
        
        echo "Step 3: Logging in to ECR..."
        aws ecr get-login-password --region $AWS_REGION | \
            docker login --username AWS --password-stdin $ECR_URI
        echo "✓ Logged in to ECR"
        echo ""
        
        echo "Step 4: Tagging image..."
        docker tag robot-builder:latest $ECR_URI:latest
        echo "✓ Image tagged: $ECR_URI:latest"
        echo ""
        
        echo "Step 5: Pushing to ECR..."
        docker push $ECR_URI:latest
        echo "✓ Image pushed to ECR"
        echo ""
        
        echo "✅ Docker image is ready in ECR!"
        echo ""
        echo "Next steps:"
        echo "1. Create ECS cluster and task definition"
        echo "2. Configure environment variables in task definition"
        echo "3. Create ECS service with load balancer"
        echo "4. Run database migrations: npx prisma migrate deploy"
        echo ""
        echo "📚 See AWS_DEPLOYMENT_GUIDE.md (Option 2) for detailed steps"
        ;;
    3|ec2)
        echo "🖥️  AWS EC2 Deployment"
        echo "===================="
        echo ""
        echo "For EC2 deployment, follow these steps:"
        echo ""
        echo "1. Build the application locally:"
        echo "   npm run build"
        echo ""
        echo "2. Copy files to EC2 instance (using scp or git):"
        echo "   scp -r . user@your-ec2-ip:/path/to/app"
        echo "   # Or: git clone your-repo on EC2"
        echo ""
        echo "3. On EC2 instance, install dependencies:"
        echo "   npm ci --production"
        echo ""
        echo "4. Generate Prisma client:"
        echo "   npx prisma generate"
        echo ""
        echo "5. Set environment variables:"
        echo "   export DATABASE_URL='postgresql://...'"
        echo "   export NODE_ENV=production"
        echo ""
        echo "6. Run database migrations:"
        echo "   npx prisma migrate deploy"
        echo ""
        echo "7. Start with PM2:"
        echo "   npm install -g pm2"
        echo "   pm2 start npm --name robot-builder -- start"
        echo "   pm2 save"
        echo "   pm2 startup"
        echo ""
        echo "8. Configure Nginx as reverse proxy (optional)"
        echo ""
        echo "📚 See AWS_DEPLOYMENT_GUIDE.md (Option 3) for detailed steps"
        ;;
    4|s3|cloudfront)
        echo "☁️  AWS S3 + CloudFront (Static Export)"
        echo "======================================"
        echo ""
        echo "⚠️  WARNING: Static export disables API routes!"
        echo "   This means /api/designs and /api/interactions won't work."
        echo ""
        read -p "Continue? (yes/no): " confirm
        if [ "$confirm" != "yes" ]; then
            echo "Cancelled."
            exit 0
        fi
        echo ""
        
        echo "⚠️  You need to modify next.config.js first:"
        echo "   Change 'output: standalone' to 'output: export'"
        echo ""
        read -p "Have you modified next.config.js? (yes/no): " config_ready
        if [ "$config_ready" != "yes" ]; then
            echo "Please modify next.config.js first, then run this script again."
            exit 1
        fi
        
        echo "Building static export..."
        npm run build
        echo "✓ Build complete"
        echo ""
        
        read -p "Enter S3 bucket name: " S3_BUCKET
        read -p "Enter CloudFront distribution ID (optional, press Enter to skip): " CF_DIST_ID
        
        echo "Uploading to S3..."
        aws s3 sync out/ s3://$S3_BUCKET --delete
        echo "✓ Uploaded to S3: s3://$S3_BUCKET"
        echo ""
        
        if [ -n "$CF_DIST_ID" ]; then
            echo "Invalidating CloudFront cache..."
            aws cloudfront create-invalidation --distribution-id $CF_DIST_ID --paths "/*"
            echo "✓ Cache invalidation created"
        fi
        
        echo ""
        echo "✅ Static site deployed to S3!"
        ;;
    *)
        echo "❌ Invalid choice: $choice"
        echo ""
        echo "Valid options: 1 (or amplify), 2 (or ecs/fargate), 3 (or ec2), 4 (or s3/cloudfront)"
        exit 1
        ;;
esac

echo ""
echo "📋 Post-Deployment Checklist:"
echo "============================="
echo ""
echo "□ Set up RDS PostgreSQL database"
echo "□ Configure environment variables (DATABASE_URL, NEXT_PUBLIC_APP_URL, etc.)"
echo "□ Run database migrations: npx prisma migrate deploy"
echo "□ Configure security groups and VPC settings"
echo "□ Set up proper IAM roles and permissions"
echo "□ Test the application endpoints"
echo "□ Configure monitoring (CloudWatch)"
echo "□ Set up custom domain (optional)"
echo ""
echo "📚 Documentation:"
echo "  - Quick Start: AWS_QUICK_START.md"
echo "  - Full Guide: AWS_DEPLOYMENT_GUIDE.md"
echo "  - Environment Variables: ENV_VARIABLES.md"
echo ""

