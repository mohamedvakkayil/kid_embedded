# Robot Builder Pro - Technoplus Creative Labs

A professional, modern web application for building and customizing robot faces with AI-powered design tools.

## 🚀 Features

- **Interactive Robot Builder**: Create custom robot faces with real-time preview
- **Professional Design**: Claymorphism UI with smooth animations
- **Tutorial System**: Step-by-step guide for building real robot faces
- **Media Support**: Images and videos for tutorial content
- **Database Integration**: PostgreSQL with Prisma ORM
- **AWS Ready**: Configured for AWS deployment

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL (via Prisma)
- **Animations**: Framer Motion
- **Deployment**: AWS (Amplify/EC2/ECS)

## 📦 Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

3. **Set up database:**
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

4. **Run development server:**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)**

## 🗄️ Database Setup

### Option 1: PostgreSQL (Recommended)

1. Install PostgreSQL locally or use a cloud service (AWS RDS, Supabase, etc.)
2. Update `DATABASE_URL` in `.env`
3. Run migrations: `npx prisma migrate dev`

### Option 2: AWS RDS PostgreSQL

1. Create an RDS PostgreSQL instance
2. Update `DATABASE_URL` with your RDS endpoint
3. Run migrations: `npx prisma migrate deploy`

## 🚢 AWS Deployment

### Option 1: AWS Amplify (Easiest)

1. Connect your repository to AWS Amplify
2. Amplify will auto-detect Next.js
3. Add environment variables in Amplify console
4. Deploy!

### Option 2: AWS ECS/Fargate

1. Build Docker image:
   ```bash
   docker build -t robot-builder .
   ```

2. Push to ECR
3. Deploy to ECS/Fargate

### Option 3: AWS EC2

1. Build the application:
   ```bash
   npm run build
   ```

2. Start production server:
   ```bash
   npm start
   ```

3. Use PM2 or systemd for process management

## 📁 Project Structure

```
├── app/
│   ├── api/              # API routes
│   ├── tutorial/         # Tutorial page
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Homepage
├── components/           # React components
├── prisma/              # Database schema
├── properties/          # Media files (images, videos)
└── public/              # Static assets
```

## 🎨 Customization

- **Colors**: Edit `tailwind.config.js` and `app/globals.css`
- **Animations**: Modify component files or add Framer Motion animations
- **Content**: Update tutorial steps in `app/tutorial/page.tsx`

## 📝 API Endpoints

- `POST /api/designs` - Save a robot design
- `GET /api/designs` - Fetch saved designs
- `POST /api/interactions` - Log user interactions

## 🔒 Environment Variables

- `DATABASE_URL` - PostgreSQL connection string
- `NEXT_PUBLIC_APP_URL` - Application URL
- `AWS_REGION` - AWS region for services
- `AWS_ACCESS_KEY_ID` - AWS access key
- `AWS_SECRET_ACCESS_KEY` - AWS secret key

## 📄 License

© 2025 Technoplus Creative Labs

## 🤝 Contributing

This is a private project for Technoplus Creative Labs.

