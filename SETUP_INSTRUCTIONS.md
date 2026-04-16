# 🚀 Portfolio Setup Instructions for Mashfiq

## 📋 **Step 1: Install Dependencies**

Run this command in your terminal:

```bash
pnpm install
```

This will install the Groq SDK and other dependencies.

## 🔐 **Step 2: Set Up Environment Variables**

Create a file called `.env.local` in your project root with this content:

```env
# Groq API Configuration
GROQ_API_KEY=your_actual_groq_api_key_here

# TMDB API for movie game mode
TMDB_API_KEY=your_tmdb_api_key_here

# GitHub stats integration
GITHUB_REPO=NuhashMaq/Portfolio_Maashfiiiiq
GITHUB_TOKEN=your_optional_github_token

# Environment
NODE_ENV=development
```

**Replace placeholder values with your real API keys before running the app.**

## 🎯 **Step 3: Test Locally**

Run the development server:

```bash
pnpm dev
```

Visit `http://localhost:3000` to test your portfolio.

## 🚀 **Step 4: Deploy to Vercel**

1. **Push to GitHub** (if not already done)
2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Set Node.js version to `20.x`
   - Add environment variables: `GROQ_API_KEY`, `TMDB_API_KEY`, `GITHUB_REPO`, and optional `GITHUB_TOKEN`
3. **Deploy!**

## ✅ **What's Included:**

- ✅ **Personal Information**: Mashfiq Naushad
- ✅ **Contact Details**: Email, phone, LinkedIn, GitHub, Instagram
- ✅ **AI Personality**: Customized with Mashfiq's background and experience
- ✅ **API Integration**: Switched to Groq
- ✅ **Professional Experience**: All your internships and projects
- ✅ **Skills**: Data science, AI, machine learning focus

## 🎨 **Next Steps:**

1. **Add your projects** (I'll help you with this)
2. **Customize colors** (if desired)
3. **Add your own logo** (when ready)
4. **Test the AI chat** functionality

## 📈 **Monitoring Checklist:**

1. Open `http://localhost:3000/api/health` and verify `status: ok`
2. Add production health check in your uptime monitor of choice
3. Keep `GROQ_API_KEY` and monitoring secrets only in environment settings

## 🔧 **Troubleshooting:**

If you see linter errors about missing modules:
1. Make sure you ran `pnpm install`
2. Restart your development server
3. The errors should disappear after installation
