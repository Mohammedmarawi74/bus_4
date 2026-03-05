<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# صانع خرائط الكاروسيل الاحترافي

تطبيق ويب احترافي لإنشاء كاروسيل خرائط تفاعلية باستخدام الذكاء الاصطناعي.

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```
2. Set the `GEMINI_API_KEY` in `.env.local` to your Gemini API key:
   ```bash
   GEMINI_API_KEY=your_api_key_here
   ```
3. Run the app:
   ```bash
   npm run dev
   ```

## Deploy to Vercel

This project is configured for easy deployment on Vercel.

### Option 1: Deploy via Vercel Dashboard

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Configure environment variables:
   - Add `GEMINI_API_KEY` with your API key
6. Click "Deploy"

### Option 2: Deploy via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```
2. Login to Vercel:
   ```bash
   vercel login
   ```
3. Deploy:
   ```bash
   vercel
   ```
4. Set environment variables in Vercel dashboard after deployment

### Environment Variables

Make sure to set the following environment variables in Vercel:
- `GEMINI_API_KEY`: Your Gemini API key for AI-powered content generation

## Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.
