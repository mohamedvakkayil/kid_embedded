# Quick Start Guide

## 🚀 Getting Started (5 minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
```bash
cp .env.example .env
```

Edit `.env` and add your database URL:
```
DATABASE_URL="postgresql://user:password@localhost:5432/robotbuilder?schema=public"
```

### 3. Set Up Database
```bash
# Generate Prisma Client
npx prisma generate

# Run migrations (creates tables)
npx prisma migrate dev
```

### 4. Move Media Files
```bash
# Copy images and videos to public folder
cp -r properties/* public/properties/
```

### 5. Start Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser!

## 📁 Project Structure

```
website/
├── app/                    # Next.js App Router
│   ├── api/               # API endpoints
│   ├── tutorial/          # Tutorial page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── Header.tsx
│   ├── RobotBuilder.tsx
│   ├── WorkshopCards.tsx
│   ├── Gallery.tsx
│   └── Footer.tsx
├── prisma/                # Database schema
│   └── schema.prisma
├── public/                # Static files
│   └── properties/        # Images & videos
└── properties/            # Original media (move to public/)
```

## 🎨 Key Features

- ✅ Interactive robot builder with real-time preview
- ✅ Claymorphism UI design (retained from original)
- ✅ Smooth animations and transitions
- ✅ Responsive design (mobile-friendly)
- ✅ Tutorial page with step-by-step guide
- ✅ Media support (images & videos)
- ✅ Database integration ready
- ✅ AWS deployment ready

## 🔧 Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

## 🗄️ Database Commands

```bash
npx prisma studio           # Open database GUI
npx prisma migrate dev      # Create new migration
npx prisma migrate deploy   # Apply migrations (production)
npx prisma generate         # Regenerate Prisma Client
```

## 🚢 Deployment

### AWS Amplify (Recommended)
1. Connect your Git repository to AWS Amplify
2. Amplify auto-detects Next.js
3. Add environment variables in Amplify console
4. Deploy!

### Manual AWS Deployment
```bash
# Build the application
npm run build

# Use the deployment script
./aws-deploy.sh
```

## 🐛 Troubleshooting

### TypeScript Errors
These are normal until you run `npm install`. After installing dependencies, errors should resolve.

### Database Connection Issues
- Check your `DATABASE_URL` in `.env`
- Ensure PostgreSQL is running
- Verify credentials are correct

### Media Files Not Loading
- Ensure files are in `public/properties/` folder
- Check file names match exactly (case-sensitive)
- Clear browser cache

### Build Errors
- Delete `.next` folder and `node_modules`
- Run `npm install` again
- Run `npx prisma generate`

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [AWS Amplify Documentation](https://docs.amplify.aws/)

## 💡 Tips

1. **Development**: Use `npm run dev` for hot-reloading
2. **Production**: Use `npm run build` then `npm start`
3. **Database**: Use Prisma Studio to view/edit data
4. **Styling**: Customize colors in `tailwind.config.js`
5. **Components**: All components are in `/components` folder

## 🎯 What's Next?

1. Customize colors and branding
2. Add more tutorial steps
3. Integrate with AWS services
4. Add user authentication (optional)
5. Deploy to production!

Happy coding! 🤖

