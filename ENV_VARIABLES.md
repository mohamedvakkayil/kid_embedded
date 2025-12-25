# 🔐 Environment Variables Reference

This document lists all environment variables used by the application and their configuration for different deployment environments.

---

## 📋 Required Variables

### `DATABASE_URL`
**Description**: PostgreSQL database connection string  
**Format**: `postgresql://USERNAME:PASSWORD@HOST:PORT/DATABASE_NAME?schema=public`  
**Example**: `postgresql://admin:MySecurePass123@robotbuilder-db.xxxxx.us-east-1.rds.amazonaws.com:5432/robotbuilder?schema=public`  
**Required**: ✅ Yes  
**Used by**: Prisma ORM, Database connections

### `NODE_ENV`
**Description**: Node.js environment  
**Values**: `development` | `production` | `test`  
**Default**: `development`  
**Required**: ✅ Yes (for production)  
**Used by**: Next.js, Application logic

---

## 📋 Recommended Variables

### `NEXT_PUBLIC_APP_URL`
**Description**: Public URL of the deployed application  
**Format**: `https://your-domain.com` or `https://your-app-id.amplifyapp.com`  
**Example**: `https://d1234567890.amplifyapp.com`  
**Required**: ⚠️ Recommended for production  
**Used by**: Client-side code, API calls, CORS configuration

### `NEXT_TELEMETRY_DISABLED`
**Description**: Disable Next.js telemetry  
**Values**: `1` (disabled) | `0` (enabled)  
**Default**: Not set (telemetry enabled)  
**Required**: ❌ Optional  
**Used by**: Next.js telemetry

---

## 📋 Optional AWS Variables

### `AWS_REGION`
**Description**: AWS region for services  
**Values**: `us-east-1`, `us-west-2`, `eu-west-1`, etc.  
**Default**: `us-east-1`  
**Required**: ❌ Optional (only if using AWS services directly)  
**Used by**: AWS SDK, AWS CLI

### `AWS_ACCESS_KEY_ID`
**Description**: AWS access key ID  
**Format**: AWS access key  
**Required**: ❌ Optional (only if using AWS SDK in code)  
**Used by**: AWS SDK  
**⚠️ Security**: Store in AWS Secrets Manager, not in environment variables

### `AWS_SECRET_ACCESS_KEY`
**Description**: AWS secret access key  
**Format**: AWS secret key  
**Required**: ❌ Optional (only if using AWS SDK in code)  
**Used by**: AWS SDK  
**⚠️ Security**: Store in AWS Secrets Manager, not in environment variables

---

## 🚀 Environment-Specific Configurations

### Development (.env.local)

```bash
DATABASE_URL="postgresql://user:password@localhost:5432/robotbuilder?schema=public"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"
NEXT_TELEMETRY_DISABLED=1
```

### Production (AWS Amplify)

```bash
DATABASE_URL="postgresql://admin:password@robotbuilder-db.xxxxx.us-east-1.rds.amazonaws.com:5432/robotbuilder"
NEXT_PUBLIC_APP_URL="https://d1234567890.amplifyapp.com"
NODE_ENV="production"
NEXT_TELEMETRY_DISABLED=1
```

### Production (AWS ECS/Fargate)

```bash
DATABASE_URL="postgresql://admin:password@robotbuilder-db.xxxxx.us-east-1.rds.amazonaws.com:5432/robotbuilder"
NEXT_PUBLIC_APP_URL="https://your-domain.com"
NODE_ENV="production"
NEXT_TELEMETRY_DISABLED=1
PORT=3000
```

### Production (AWS EC2)

```bash
DATABASE_URL="postgresql://admin:password@robotbuilder-db.xxxxx.us-east-1.rds.amazonaws.com:5432/robotbuilder"
NEXT_PUBLIC_APP_URL="https://your-domain.com"
NODE_ENV="production"
NEXT_TELEMETRY_DISABLED=1
```

---

## 🔒 Security Best Practices

1. **Never commit `.env` files to Git**
   - Already configured in `.gitignore`
   - Use `.env.example` as a template

2. **Use AWS Secrets Manager for production**
   - Store sensitive credentials (database passwords, API keys)
   - Reference secrets in your deployment configuration
   - Rotate credentials regularly

3. **Use different credentials for each environment**
   - Development database ≠ Production database
   - Use strong, unique passwords

4. **Limit access to environment variables**
   - Use IAM roles and policies
   - Restrict who can view/modify environment variables

5. **Validate environment variables at startup**
   - Application should fail fast if required variables are missing
   - Provide clear error messages

---

## 📝 How to Set Environment Variables

### Local Development

Create a `.env.local` file in the project root:

```bash
cp .env.example .env.local
# Edit .env.local with your values
```

### AWS Amplify

1. Go to AWS Amplify Console
2. Select your app
3. Go to **App settings** → **Environment variables**
4. Add each variable with its value
5. Click **Save**
6. Redeploy the app

### AWS ECS/Fargate

1. Go to ECS Console
2. Select your task definition
3. Go to **Container definitions** → **Environment**
4. Add environment variables
5. Create new revision
6. Update service

### AWS EC2

Add to your `.env` file or system environment:

```bash
# In .env file
export DATABASE_URL="postgresql://..."
export NODE_ENV="production"

# Or add to /etc/environment (system-wide)
```

---

## 🔍 Verifying Environment Variables

### Check variables at runtime (Development)

```bash
# In Node.js/Next.js
console.log(process.env.DATABASE_URL)
console.log(process.env.NEXT_PUBLIC_APP_URL)
```

### Test database connection

```bash
# Using psql
psql $DATABASE_URL

# Using Prisma
npx prisma db pull
```

---

## 🐛 Troubleshooting

### "DATABASE_URL is not defined"
- Check that `.env` file exists
- Verify variable name spelling (case-sensitive)
- Restart development server after adding variables

### "Database connection failed"
- Verify `DATABASE_URL` format is correct
- Check database is accessible (security groups, VPC)
- Test connection string with `psql`

### "NEXT_PUBLIC_APP_URL not found"
- This is only needed for production
- Check that variable starts with `NEXT_PUBLIC_` (required for client-side access)
- Verify URL is correctly formatted (includes https://)

---

## 📚 Additional Resources

- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Prisma Connection Strings](https://www.prisma.io/docs/concepts/database-connectors/postgresql)
- [AWS Secrets Manager](https://aws.amazon.com/secrets-manager/)
- [AWS Amplify Environment Variables](https://docs.amplify.aws/guides/hosting/nextjs/q/platform/js/#environment-variables)

