# Deployment Guide

## Overview
- **Frontend**: Vercel (Next.js)
- **Backend**: Render (Express + Socket.io)
- **Database**: lowdb (JSON file on Render)

## 🚀 Backend Deployment (Render)

### Step 1: Prepare Repository
```bash
git add .
git commit -m "Add deployment configs"
git push origin main
```

### Step 2: Deploy to Render
1. Go to [render.com](https://render.com) and sign in
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Name**: `doubt-board-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

### Step 3: Set Environment Variables
Add in Render dashboard:
```
NODE_ENV=production
PORT=10000
```

### Step 4: Note Your Backend URL
After deployment, copy the URL (e.g., `https://doubt-board-backend.onrender.com`)

## 🌐 Frontend Deployment (Vercel)

### Step 1: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New"** → **"Project"**
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

### Step 2: Set Environment Variables
Add in Vercel dashboard:
```
NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com/api
NEXT_PUBLIC_SOCKET_URL=https://your-backend-url.onrender.com
```

Replace `your-backend-url` with your actual Render URL.

### Step 3: Deploy
Click **"Deploy"** and wait for build to complete.

## 🔧 Backend Code Updates for Production

The backend needs CORS configuration to allow Vercel domain. Update in `backend/src/server.ts`:

```typescript
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://your-vercel-app.vercel.app', // Add your Vercel URL
    /\.vercel\.app$/ // Allow all Vercel preview deployments
  ],
  credentials: true
};
```

## 📦 Database Persistence on Render

Render's free tier has ephemeral storage. For production:

### Option 1: Keep lowdb (Simple)
- Data persists during runtime
- Resets on service restart
- Good for demo/testing

### Option 2: Upgrade to Persistent Storage
1. Use Render Disk (paid feature)
2. Mount disk to `/data`
3. Update db path: `backend/src/data/db.json` → `/data/db.json`

### Option 3: Use External Database (Recommended for Production)
- MongoDB Atlas (free tier available)
- PostgreSQL on Render
- Supabase

## ✅ Post-Deployment Checklist

### Backend (Render)
- [ ] Service is running (green status)
- [ ] Logs show no errors
- [ ] Test API: `curl https://your-backend.onrender.com/api/doubts`
- [ ] WebSocket connects (check browser console)

### Frontend (Vercel)
- [ ] Build successful
- [ ] Environment variables set correctly
- [ ] App loads without errors
- [ ] Real-time updates working
- [ ] API calls successful

## 🧪 Testing Deployment

### Test API Endpoint
```bash
curl https://your-backend.onrender.com/api/doubts
```

### Test WebSocket Connection
Open browser console on your Vercel app:
```javascript
// Should see: "Connected to Socket.io server"
```

### Test Real-Time Features
1. Open app in two browser windows
2. Post a doubt in one window
3. Verify it appears instantly in the other

## 🐛 Troubleshooting

### CORS Errors
- Verify Vercel URL is in backend CORS config
- Check environment variables are set correctly
- Redeploy backend after CORS changes

### WebSocket Connection Failed
- Ensure `NEXT_PUBLIC_SOCKET_URL` uses `https://` (not `http://`)
- Check Render service is running
- Verify no firewall blocking WebSocket

### Build Failures

**Backend:**
```bash
# Test locally first
cd backend
npm run build
npm start
```

**Frontend:**
```bash
# Test locally first
cd frontend
npm run build
npm start
```

### Data Not Persisting
- Expected on Render free tier
- Service restarts reset data
- Consider upgrading to persistent disk or external DB

## 🔄 Continuous Deployment

Both Vercel and Render support auto-deployment:

1. **Push to GitHub** → Automatic deployment
2. **Preview Deployments** (Vercel) → Every PR gets preview URL
3. **Production Branch** → Deploy from `main` branch

## 💰 Cost Breakdown

| Service | Tier | Cost | Limits |
|---------|------|------|--------|
| Vercel | Hobby | Free | 100GB bandwidth/month |
| Render | Free | Free | 750 hours/month, sleeps after 15min inactivity |

### Render Free Tier Notes
- Service sleeps after 15 minutes of inactivity
- First request after sleep takes ~30 seconds (cold start)
- Consider paid tier ($7/month) for always-on service

## 🚀 Quick Deploy Commands

```bash
# 1. Commit changes
git add .
git commit -m "Deploy to production"
git push origin main

# 2. Both services auto-deploy from GitHub

# 3. Update frontend env vars in Vercel dashboard
# 4. Verify deployment
```

## 📝 Environment Variables Reference

### Backend (Render)
```env
NODE_ENV=production
PORT=10000
```

### Frontend (Vercel)
```env
NEXT_PUBLIC_API_URL=https://doubt-board-backend.onrender.com/api
NEXT_PUBLIC_SOCKET_URL=https://doubt-board-backend.onrender.com
```

## 🎉 Success!

Your app is now live:
- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-backend.onrender.com`

Share the Vercel URL with users to access the Real-Time Doubt Board!
