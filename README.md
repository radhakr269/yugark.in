# YUGARK — Digital Growth Agency

Official website for **YUGARK Digital Growth Agency**, led by CEO & MD **Mr. Radha Krishna**. Built with React, Vite, TypeScript, and Tailwind CSS.

## 🚀 One-Click Vercel Deployment

This project is fully configured for zero-config deployment on Vercel.

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit for YUGARK Digital Growth Agency"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/yugark-website.git
   git push -u origin main
   ```

2. **Deploy on Vercel**:
   - Go to [Vercel Dashboard](https://vercel.com/new)
   - Import your GitHub repository
   - Keep default settings:
     - **Framework Preset**: Vite
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`
   - Click **Deploy**

## 🛠 Local Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build
```

## 📁 Directory Structure

```
.
├── public/
│   ├── images/
│   ├── logos/
│   ├── icons/
│   ├── favicon.ico
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── assets/
│   ├── components/
│   ├── hooks/
│   ├── pages/
│   ├── styles/
│   ├── utils/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── vercel.json
├── package.json
└── vite.config.ts
```

## 🌟 Core Features

- **Executive Branding**: Dedicated profile for Founder Mr. Radha Krishna
- **Services Portfolio**: Full-service agency breakdowns (Web Engineering, AI Ads, SEO, Social Media)
- **Instant Search**: Indexed search modal across all pages and sections
- **WhatsApp Direct Connect**: Floating official WhatsApp icon linking directly to `wa.me/919125205132`
- **SPA Routing**: Full Vercel rewrite rules (`vercel.json`) ensuring deep links load smoothly
