# 🚀 AWS Deployment Guide - Complete Steps

## 📋 Pre-Deployment Checklist

Before deploying to AWS, ensure you have:

- [x] ✅ Code is ready (builds successfully)
- [ ] ⚠️ AWS Account created
- [ ] ⚠️ AWS CLI installed and configured
- [ ] ⚠️ PostgreSQL database set up (AWS RDS or external)
- [ ] ⚠️ Domain name (optional but recommended)

---

## 🎯 Option 1: AWS Amplify (Easiest - Recommended)

### Why Amplify?
- ✅ Zero configuration needed
- ✅ Automatic deployments on git push
- ✅ Built-in CDN and SSL
- ✅ Auto-scaling
- ✅ Perfect for Next.js

### Step-by-Step:

#### 1. Prepare Your Repository
```bash
# Ensure your code is in a Git repository (GitHub, GitLab, or Bitbucket)
git add .
git commit -m "Ready for AWS deployment"
git push origin main
```

#### 2. Create Amplify App
1. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify)
2. Click **"New app"** → **"Host web app"**
3. Choose your Git provider (GitHub, GitLab, Bitbucket, or AWS CodeCommit)
4. Authorize AWS to access your repository
5. Select your repository and branch (usually `main` or `master`)

#### 3. Configure Build Settings
Amplify auto-detects Next.js, but verify these settings:

**Build settings:**
```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
        - npx prisma generate
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
      - .next/cache/**/*
```

**Environment variables** (Add these in Amplify Console):
```
DATABASE_URL=postgresql://user:password@your-rds-endpoint:5432/robotbuilder
NEXT_PUBLIC_APP_URL=https://your-amplify-app.amplifyapp.com
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

#### 4. Set Up Database (AWS RDS)
1. Go to [AWS RDS Console](https://console.aws.amazon.com/rds)
2. Click **"Create database"**
3. Choose **PostgreSQL**
4. Select **Free tier** (for testing) or production instance
5. Configure:
   - DB instance identifier: `robotbuilder-db`
   - Master username: `admin` (or your choice)
   - Master password: (create strong password)
   - Database name: `robotbuilder`
6. **Important**: Set VPC security group to allow connections from Amplify
7. Note the **Endpoint** (e.g., `robotbuilder-db.xxxxx.us-east-1.rds.amazonaws.com`)

#### 5. Run Database Migrations
After Amplify deploys, you need to run migrations:

**Option A: Via Amplify Console (SSH)**
1. Go to Amplify app → App settings → Build settings
2. Add post-build command:
```bash
npx prisma migrate deploy
```

**Option B: Via AWS Systems Manager Session Manager**
1. Connect to your RDS database
2. Run: `npx prisma migrate deploy`

#### 6. Deploy
- Click **"Save and deploy"** in Amplify
- Wait for build to complete (5-10 minutes first time)
- Your app will be live at: `https://your-app-id.amplifyapp.com`

#### 7. Custom Domain (Optional)
1. In Amplify Console → Domain management
2. Add your domain
3. Follow DNS configuration instructions
4. SSL certificate is automatically provisioned

**Cost**: ~$15-50/month (depending on traffic)

---

## 🐳 Option 2: AWS ECS/Fargate (Docker)

### Why ECS?
- ✅ Container-based deployment
- ✅ Auto-scaling
- ✅ Load balancing included
- ✅ Good for production workloads

### Step-by-Step:

#### 1. Create ECR Repository
```bash
# Create ECR repository
aws ecr create-repository --repository-name robot-builder --region us-east-1

# Get login token
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin YOUR_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com
```

#### 2. Build and Push Docker Image
```bash
# Build image
docker build -t robot-builder:latest .

# Tag for ECR
docker tag robot-builder:latest YOUR_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/robot-builder:latest

# Push to ECR
docker push YOUR_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/robot-builder:latest
```

#### 3. Create ECS Cluster
1. Go to [ECS Console](https://console.aws.amazon.com/ecs)
2. Create new cluster:
   - Name: `robot-builder-cluster`
   - Infrastructure: AWS Fargate
   - Click **Create**

#### 4. Create Task Definition
1. In ECS Console → Task Definitions → Create new
2. Configure:
   - Family: `robot-builder`
   - Launch type: **Fargate**
   - Task memory: 1 GB
   - Task CPU: 0.5 vCPU
   - Container:
     - Image: `YOUR_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/robot-builder:latest`
     - Port: `3000`
     - Environment variables:
       ```
       DATABASE_URL=postgresql://...
       NODE_ENV=production
       PORT=3000
       ```

#### 5. Create ECS Service
1. In your cluster → Services → Create
2. Configure:
   - Launch type: Fargate
   - Task definition: `robot-builder`
   - Service name: `robot-builder-service`
   - Number of tasks: 1 (or more for scaling)
   - VPC: Select your VPC
   - Subnets: Select public subnets
   - Security group: Allow port 3000

#### 6. Create Application Load Balancer
1. Go to [EC2 Console](https://console.aws.amazon.com/ec2) → Load Balancers
2. Create Application Load Balancer:
   - Scheme: Internet-facing
   - Listeners: HTTP (80) and HTTPS (443)
   - Target group: Create new for port 3000
   - Health check: `/` path

#### 7. Connect Load Balancer to ECS Service
- In ECS Service → Update → Add load balancer
- Select your ALB and target group

#### 8. Set Up Database (Same as Option 1)
- Create RDS PostgreSQL instance
- Update security group to allow ECS tasks

#### 9. Run Migrations
```bash
# Connect to a running ECS task
aws ecs execute-command --cluster robot-builder-cluster --task TASK_ID --container robot-builder --command "npx prisma migrate deploy" --interactive
```

**Cost**: ~$30-100/month (depending on traffic and instance size)

---

## 🖥️ Option 3: AWS EC2 (Traditional Server)

### Why EC2?
- ✅ Full control
- ✅ Cost-effective for small projects
- ✅ Good for learning

### Step-by-Step:

#### 1. Launch EC2 Instance
1. Go to [EC2 Console](https://console.aws.amazon.com/ec2)
2. Launch instance:
   - AMI: Ubuntu Server 22.04 LTS
   - Instance type: t3.medium (or t3.small for testing)
   - Key pair: Create or select existing
   - Security group: Allow SSH (22) and HTTP (80), HTTPS (443)
   - Storage: 20 GB minimum

#### 2. Connect to Instance
```bash
ssh -i your-key.pem ubuntu@your-ec2-ip
```

#### 3. Install Dependencies
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2 (process manager)
sudo npm install -g pm2

# Install Git
sudo apt install -y git
```

#### 4. Clone and Set Up Application
```bash
# Clone your repository
git clone https://github.com/your-username/your-repo.git
cd website

# Install dependencies
npm install

# Create .env file
nano .env
# Add your DATABASE_URL and other variables

# Generate Prisma client
npx prisma generate

# Build application
npm run build
```

#### 5. Set Up Database
- Create RDS PostgreSQL (same as Option 1)
- Update security group to allow EC2 instance

#### 6. Run Migrations
```bash
npx prisma migrate deploy
```

#### 7. Start Application with PM2
```bash
# Start application
pm2 start npm --name robot-builder -- start

# Save PM2 configuration
pm2 save

# Set up PM2 to start on boot
pm2 startup
# Follow the instructions it provides
```

#### 8. Set Up Nginx (Reverse Proxy)
```bash
# Install Nginx
sudo apt install -y nginx

# Configure Nginx
sudo nano /etc/nginx/sites-available/robot-builder
```

Add this configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/robot-builder /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### 9. Set Up SSL with Let's Encrypt
```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d your-domain.com

# Auto-renewal is set up automatically
```

**Cost**: ~$15-30/month (t3.small instance)

---

## 🗄️ Database Setup (Required for All Options)

### AWS RDS PostgreSQL Setup:

1. **Create RDS Instance**
   - Go to [RDS Console](https://console.aws.amazon.com/rds)
   - Click **"Create database"**
   - Engine: PostgreSQL (latest version)
   - Template: Production or Free tier
   - Settings:
     - DB instance identifier: `robotbuilder-db`
     - Master username: `admin`
     - Master password: (strong password)
     - Database name: `robotbuilder`
   - Instance configuration: db.t3.micro (free tier) or db.t3.small (production)
   - Storage: 20 GB (auto-scaling enabled)
   - Connectivity:
     - VPC: Default or your VPC
     - Public access: **No** (for security)
     - Security group: Create new or select existing

2. **Configure Security Group**
   - Allow inbound from your application (Amplify/ECS/EC2)
   - Port: 5432
   - Source: Your application's security group or IP

3. **Get Connection String**
   ```
   postgresql://admin:password@robotbuilder-db.xxxxx.us-east-1.rds.amazonaws.com:5432/robotbuilder
   ```

4. **Run Migrations**
   ```bash
   # Set DATABASE_URL in your environment
   export DATABASE_URL="postgresql://..."
   
   # Run migrations
   npx prisma migrate deploy
   ```

**Cost**: 
- Free tier: $0/month (first 12 months, db.t2.micro)
- Production: ~$15-50/month (db.t3.small)

---

## 🔐 Security Best Practices

### 1. Environment Variables
- ✅ Never commit `.env` to git
- ✅ Use AWS Secrets Manager for production
- ✅ Rotate database passwords regularly

### 2. Database Security
- ✅ Use private subnets for RDS
- ✅ Restrict security groups (only allow from app)
- ✅ Enable encryption at rest
- ✅ Enable automated backups

### 3. Application Security
- ✅ Enable HTTPS (SSL certificates)
- ✅ Use security headers
- ✅ Regular security updates
- ✅ Monitor with CloudWatch

---

## 📊 Monitoring & Maintenance

### CloudWatch Setup
1. Set up CloudWatch alarms for:
   - High CPU usage
   - High memory usage
   - Database connection errors
   - Application errors

### Backup Strategy
1. **RDS Automated Backups**: Enabled by default
2. **Manual Snapshots**: Before major updates
3. **Application Backups**: Consider backing up user designs

### Updates
```bash
# Pull latest code
git pull origin main

# Install new dependencies
npm install

# Run migrations (if any)
npx prisma migrate deploy

# Rebuild
npm run build

# Restart (PM2)
pm2 restart robot-builder
```

---

## 💰 Cost Estimation

### Option 1: Amplify
- Amplify: ~$15/month
- RDS (db.t3.small): ~$25/month
- **Total: ~$40/month**

### Option 2: ECS/Fargate
- ECS Fargate: ~$30/month
- ALB: ~$20/month
- RDS: ~$25/month
- **Total: ~$75/month**

### Option 3: EC2
- EC2 (t3.small): ~$15/month
- RDS (db.t3.small): ~$25/month
- **Total: ~$40/month**

*Note: Costs vary by region and usage*

---

## 🚨 Troubleshooting

### Database Connection Issues
```bash
# Test connection
psql $DATABASE_URL

# Check security groups
# Verify RDS is in same VPC or accessible
```

### Build Failures
```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run build
```

### Application Not Starting
```bash
# Check logs
pm2 logs robot-builder

# Check environment variables
pm2 env robot-builder
```

---

## ✅ Quick Start Commands

### For Amplify:
1. Push code to Git
2. Connect to Amplify
3. Add environment variables
4. Deploy!

### For ECS:
```bash
./aws-deploy.sh  # Select option 2
```

### For EC2:
```bash
# Follow the step-by-step guide above
```

---

## 📞 Need Help?

- [AWS Amplify Docs](https://docs.amplify.aws/)
- [AWS ECS Docs](https://docs.aws.amazon.com/ecs/)
- [AWS EC2 Docs](https://docs.aws.amazon.com/ec2/)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

---

**Recommended**: Start with **AWS Amplify** - it's the easiest and fastest way to deploy Next.js to AWS!

