# 🚀 AWS Deployment - Quick Start

## ⚡ Fastest Path: AWS Amplify (15 minutes)

### Prerequisites:
- [ ] AWS Account
- [ ] Code in Git repository (GitHub/GitLab/Bitbucket)
- [ ] AWS CLI installed (optional, for database setup)

### Steps:

#### 1. Push Code to Git (2 min)
```bash
git add .
git commit -m "Ready for AWS deployment"
git push origin main
```

#### 2. Create RDS Database (5 min)
1. Go to [AWS RDS Console](https://console.aws.amazon.com/rds)
2. Click **"Create database"**
3. Select **PostgreSQL**
4. Choose **Free tier** template
5. Settings:
   - DB identifier: `robotbuilder-db`
   - Username: `admin`
   - Password: (create strong password)
   - Database name: `robotbuilder`
6. Click **Create database**
7. Wait 5 minutes, then note the **Endpoint** URL

#### 3. Deploy to Amplify (5 min)
1. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify)
2. Click **"New app"** → **"Host web app"**
3. Connect your Git repository
4. Select repository and branch
5. **Add environment variables:**
   ```
   DATABASE_URL=postgresql://admin:YOUR_PASSWORD@YOUR_RDS_ENDPOINT:5432/robotbuilder
   NEXT_PUBLIC_APP_URL=https://YOUR_APP_ID.amplifyapp.com
   NODE_ENV=production
   ```
6. Click **"Save and deploy"**
7. Wait 5-10 minutes for first build

#### 4. Run Database Migrations (3 min)
After first deployment:

**Option A: Add to build settings**
In Amplify → App settings → Build settings, add to build commands:
```bash
npx prisma migrate deploy
```

**Option B: Via AWS CloudShell**
1. Open AWS CloudShell
2. Clone your repo
3. Set DATABASE_URL
4. Run: `npx prisma migrate deploy`

#### 5. Done! 🎉
Your app is live at: `https://YOUR_APP_ID.amplifyapp.com`

---

## 📋 Complete Checklist

### Before Deployment:
- [x] Code builds successfully (`npm run build`)
- [x] All dependencies installed
- [x] Media files in `public/properties/`
- [ ] Git repository ready
- [ ] AWS account created

### During Deployment:
- [ ] RDS PostgreSQL database created
- [ ] Database endpoint noted
- [ ] Amplify app created
- [ ] Environment variables added
- [ ] First deployment completed
- [ ] Database migrations run

### After Deployment:
- [ ] Test homepage works
- [ ] Test tutorial page works
- [ ] Test API endpoints (if using database)
- [ ] Set up custom domain (optional)
- [ ] Configure monitoring (CloudWatch)

---

## 🔧 Environment Variables Needed

Add these in Amplify Console → App settings → Environment variables:

```
DATABASE_URL=postgresql://admin:password@endpoint:5432/robotbuilder
NEXT_PUBLIC_APP_URL=https://your-app.amplifyapp.com
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

---

## 🗄️ Database Connection String Format

```
postgresql://USERNAME:PASSWORD@ENDPOINT:5432/DATABASE_NAME
```

Example:
```
postgresql://admin:MySecurePass123@robotbuilder-db.xxxxx.us-east-1.rds.amazonaws.com:5432/robotbuilder
```

---

## ⚠️ Important Notes

1. **Security Groups**: Make sure RDS security group allows connections from Amplify
2. **VPC**: RDS should be in a VPC (default is fine)
3. **Public Access**: Set to **No** for security
4. **Backups**: Enabled by default (good!)

---

## 💰 Estimated Costs

- **Amplify**: ~$15/month (first 1000 build minutes free)
- **RDS Free Tier**: $0/month (first 12 months)
- **RDS Production**: ~$25/month (after free tier)
- **Total**: ~$15-40/month

---

## 🆘 Troubleshooting

**Build fails?**
- Check environment variables
- Verify DATABASE_URL format
- Check build logs in Amplify console

**Database connection fails?**
- Verify security group allows Amplify
- Check DATABASE_URL is correct
- Test connection from CloudShell

**App not loading?**
- Check deployment status
- View build logs
- Verify all environment variables set

---

## 📚 Full Documentation

See `AWS_DEPLOYMENT_GUIDE.md` for:
- Detailed step-by-step instructions
- ECS/Fargate deployment
- EC2 deployment
- Advanced configurations
- Security best practices

---

## ✅ You're Ready!

1. Push code to Git ✅
2. Create RDS database ✅
3. Deploy to Amplify ✅
4. Run migrations ✅
5. Go live! 🚀

**Time to deploy: ~15-20 minutes**

