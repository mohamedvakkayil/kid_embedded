#!/bin/bash

# AWS Deployment Script for Robot Builder Pro
# This script helps deploy to various AWS services

set -e

echo "🤖 Robot Builder Pro - AWS Deployment"
echo "====================================="

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI is not installed. Please install it first."
    exit 1
fi

# Check if environment variables are set
if [ -z "$AWS_REGION" ]; then
    echo "⚠️  AWS_REGION not set. Using us-east-1 as default."
    export AWS_REGION=us-east-1
fi

echo ""
echo "Select deployment method:"
echo "1) AWS Amplify (Recommended for Next.js)"
echo "2) AWS ECS/Fargate (Docker)"
echo "3) AWS EC2 (Manual)"
echo "4) AWS S3 + CloudFront (Static Export)"
echo ""
read -p "Enter choice [1-4]: " choice

case $choice in
    1)
        echo "📦 Deploying to AWS Amplify..."
        echo "Please connect your repository to AWS Amplify Console"
        echo "Amplify will auto-detect Next.js and configure build settings"
        ;;
    2)
        echo "🐳 Building Docker image..."
        docker build -t robot-builder:latest .
        
        echo "📤 Pushing to ECR..."
        AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
        ECR_REPO="robot-builder"
        
        aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com
        
        docker tag robot-builder:latest $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPO:latest
        docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPO:latest
        
        echo "✅ Image pushed to ECR. Deploy to ECS/Fargate using the image."
        ;;
    3)
        echo "🖥️  For EC2 deployment:"
        echo "1. Build the application: npm run build"
        echo "2. Copy files to EC2 instance"
        echo "3. Install dependencies: npm ci --production"
        echo "4. Run migrations: npx prisma migrate deploy"
        echo "5. Start with PM2: pm2 start npm --name robot-builder -- start"
        ;;
    4)
        echo "☁️  Building static export..."
        # Note: This requires modifying next.config.js to enable static export
        npm run build
        
        echo "📤 Uploading to S3..."
        aws s3 sync out/ s3://your-bucket-name --delete
        
        echo "🔄 Invalidating CloudFront cache..."
        aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
        ;;
    *)
        echo "❌ Invalid choice"
        exit 1
        ;;
esac

echo ""
echo "✅ Deployment process initiated!"
echo "Remember to:"
echo "- Set up RDS PostgreSQL database"
echo "- Configure environment variables"
echo "- Set up proper IAM roles and permissions"
echo "- Configure security groups and VPC settings"

