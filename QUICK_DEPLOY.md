# Quick Deploy Checklist

## ✅ Pre-Deployment

- [ ] Test locally: `cd backend && npm run dev`
- [ ] Test locally: `cd frontend && npm run dev`
- [ ] Commit all changes: `git add . && git commit -m "Ready for deployment"`
- [ ] Push to GitHub: `git push origin main`

## 🔧 Backend (Render) - 5 minutes

1. **Go to [render.com](https://render.com)**
2. **New Web Service** → Connect GitHub repo
3. **Settings:**
   - Root Directory: `backend`
   - Build: `npm install && npm run build`
   - Start: `npm start`
4. **Environment Variables:**
   ```
   NODE_ENV=production
   PORT=10000
   ```
5. **Deploy** → Copy URL (e.g., `https://doubt-board-backend.onrender.com`)

## 🌐 Frontend (Vercel) - 3 minutes

1. **Go to [vercel.com](https://vercel.com)**
2. **New Project** → Import GitHub repo
3. **Settings:**
   - Root Directory: `frontend`
   - Framework: Next.js (auto-detected)
4. **Environment Variables:**
   ```
   NEXT_PUBLIC_API_URL=https://YOUR-BACKEND-URL.onrender.com/api
   NEXT_PUBLIC_SOCKET_URL=https://YOUR-BACKEND-URL.onrender.com
   ```
   ⚠️ Replace `YOUR-BACKEND-URL` with actual Render URL from step above
5. **Deploy**

## 🧪 Test Deployment

1. Open Vercel URL in browser
2. Post a doubt
3. Open in another browser/tab
4. Verify real-time updates work

## 🎉 Done!

Your app is live at: `https://your-app.vercel.app`

---

## 🐛 Common Issues

**CORS Error?**
- Backend already configured for Vercel domains
- Redeploy backend if needed

**WebSocket not connecting?**
- Check environment variables in Vercel
- Ensure using `https://` not `http://`

**Render service sleeping?**
- Free tier sleeps after 15min inactivity
- First request takes ~30s to wake up
- Upgrade to paid tier ($7/mo) for always-on

**Data resets?**
- Expected on Render free tier (ephemeral storage)
- Data persists during runtime only
- Consider MongoDB Atlas for production
