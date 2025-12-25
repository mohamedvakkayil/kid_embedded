# 🚀 Deployment Checklist

## ✅ Pre-Deployment Status

- ✅ **Dependencies Installed** - All npm packages installed
- ✅ **TypeScript Configuration** - All type errors resolved
- ✅ **Build Successful** - Project builds without errors
- ✅ **Prisma Client Generated** - Database client ready
- ✅ **Media Files** - Images and videos in `public/properties/`
- ✅ **Environment Variables** - `.env` file created (needs database URL)

## 📋 Pre-Deployment Steps

### 1. Database Setup

**Option A: Local PostgreSQL (Development)**
```bash
# Install PostgreSQL locally, then:
DATABASE_URL="postgresql://user:password@localhost:5432/robotbuilder?schema=public"
```

**Option B: AWS RDS PostgreSQL (Production)**
1. Create RDS PostgreSQL instance in AWS Console
2. Get connection string
3. Update `.env` with RDS endpoint:
```bash
DATABASE_URL="postgresql://username:password@your-rds-endpoint:5432/robotbuilder?schema=public"
```

**Run Migrations:**
```bash
npx prisma migrate deploy
```

### 2. Environment Variables

Update `.env` with production values:
```bash
DATABASE_URL="your-production-database-url"
NEXT_PUBLIC_APP_URL="https://your-domain.com"
AWS_REGION="us-east-1"  # If using AWS services
```

### 3. Test Build Locally
```bash
npm run build
npm start
# Visit http://localhost:3000 to verify
```

## 🚢 Deployment Options

### Option 1: AWS Amplify (Recommended - Easiest)

1. **Connect Repository**
   - Go to AWS Amplify Console
   - Connect your Git repository
   - Amplify auto-detects Next.js

2. **Configure Build Settings**
   - Build command: `npm run build`
   - Output directory: `.next`
   - Node version: `18.x`

3. **Add Environment Variables**
   - `DATABASE_URL` - Your PostgreSQL connection string
   - `NEXT_PUBLIC_APP_URL` - Your Amplify app URL
   - `NODE_ENV` - `production`

4. **Deploy**
   - Amplify automatically deploys on git push
   - Or click "Deploy" in console

**Pros:** Zero-config, auto-scaling, CDN included  
**Cons:** Slightly more expensive than EC2

---

### Option 2: AWS ECS/Fargate (Docker)

1. **Build Docker Image**
   ```bash
   docker build -t robot-builder:latest .
   ```

2. **Push to ECR**
   ```bash
   aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin YOUR_ACCOUNT.dkr.ecr.us-east-1.amazonaws.com
   docker tag robot-builder:latest YOUR_ACCOUNT.dkr.ecr.us-east-1.amazonaws.com/robot-builder:latest
   docker push YOUR_ACCOUNT.dkr.ecr.us-east-1.amazonaws.com/robot-builder:latest
   ```

3. **Create ECS Task Definition**
   - Use the pushed image
   - Set environment variables
   - Configure port 3000

4. **Deploy to Fargate**
   - Create service with the task definition
   - Configure load balancer

**Pros:** Container-based, scalable, managed  
**Cons:** Requires Docker knowledge

---

### Option 3: AWS EC2 (Traditional)

1. **Launch EC2 Instance**
   - Ubuntu 22.04 LTS
   - t3.medium or larger
   - Security group: Allow port 3000

2. **SSH into Instance**
   ```bash
   ssh -i your-key.pem ubuntu@your-ec2-ip
   ```

3. **Install Dependencies**
   ```bash
   sudo apt update
   sudo apt install -y nodejs npm postgresql-client
   ```

4. **Deploy Application**
   ```bash
   git clone your-repo
   cd website
   npm install
   npm run build
   ```

5. **Run with PM2**
   ```bash
   npm install -g pm2
   pm2 start npm --name robot-builder -- start
   pm2 save
   pm2 startup
   ```

6. **Configure Nginx (Optional)**
   - Reverse proxy to port 3000
   - SSL with Let's Encrypt

**Pros:** Full control, cost-effective  
**Cons:** Manual setup, you manage scaling

---

### Option 4: AWS S3 + CloudFront (Static)

**Note:** This requires modifying `next.config.js` to enable static export.

1. **Enable Static Export**
   ```javascript
   // next.config.js
   output: 'export'
   ```

2. **Build Static Site**
   ```bash
   npm run build
   ```

3. **Upload to S3**
   ```bash
   aws s3 sync out/ s3://your-bucket-name --delete
   ```

4. **Configure CloudFront**
   - Point to S3 bucket
   - Configure caching

**Pros:** Very fast, very cheap  
**Cons:** No server-side features (API routes won't work)

## 🔒 Security Checklist

- [ ] Database credentials stored securely (AWS Secrets Manager)
- [ ] Environment variables not committed to git
- [ ] HTTPS enabled (SSL certificate)
- [ ] Security groups configured correctly
- [ ] Database not publicly accessible (use VPC)
- [ ] Regular security updates

## 📊 Post-Deployment

1. **Verify Deployment**
   - Visit your domain
   - Test robot builder
   - Test tutorial page
   - Check API endpoints

2. **Monitor**
   - Set up CloudWatch alarms
   - Monitor database connections
   - Track error rates

3. **Backup**
   - Enable RDS automated backups
   - Set up database snapshots

## 🐛 Troubleshooting

**Build Fails:**
- Check Node.js version (18+)
- Clear `.next` folder
- Run `npm install` again

**Database Connection Issues:**
- Verify `DATABASE_URL` format
- Check security groups (RDS)
- Test connection locally first

**Media Files Not Loading:**
- Verify files in `public/properties/`
- Check file permissions
- Clear CDN cache (if using CloudFront)

## 📝 Notes

- The build is **production-ready** ✅
- Only warnings (not errors) about `<img>` tags - these are non-blocking
- Database migrations need to be run before first deployment
- Consider using AWS Secrets Manager for sensitive credentials

## 🎯 Quick Deploy Command

For AWS Amplify (after connecting repo):
```bash
git add .
git commit -m "Ready for deployment"
git push
# Amplify auto-deploys!
```

---

**Status: ✅ READY TO DEPLOY**

All code is production-ready. Just set up your database and choose a deployment method!

