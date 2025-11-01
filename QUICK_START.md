# ⚡ Quick Start Guide

Get the Real-Time Doubt Board running in **3 minutes**!

## 🚀 Installation (1 minute)

```bash
# Navigate to project
cd Real-Time-Doubt-Board

# Install all dependencies
npm run install:all
```

## ▶️ Start Development Servers (30 seconds)

```bash
# Start both backend and frontend
npm run dev
```

**That's it!** 🎉

## 🌐 Access the Application

Open your browser and go to:
```
http://localhost:3000/doubts
```

## 🧪 Test the API (Optional)

1. Install Bruno: https://www.usebruno.com/
2. Open Bruno → Open Collection
3. Navigate to `Real-Time-Doubt-Board/bruno/DoubtBoardAPI`
4. Select `local` environment
5. Run the requests!

## ✅ Verify Everything Works

### Test 1: Post a Doubt
1. Fill in your name
2. Enter a doubt title and description
3. Select a subject
4. Click "Post"
5. ✅ Doubt appears instantly

### Test 2: Real-Time Sync
1. Open `http://localhost:3000/doubts` in **two browser windows**
2. Post a doubt in one window
3. ✅ It appears instantly in the other window

### Test 3: Add Reply
1. Type a reply in the reply box
2. Click send
3. ✅ Reply appears instantly in all windows

### Test 4: Resolve Doubt
1. Click "Resolve" button
2. ✅ Doubt marked as resolved in all windows

## 🎯 What You Get

- ✅ Real-time doubt board
- ✅ Instant synchronization
- ✅ Live user count
- ✅ Search & filters
- ✅ Responsive design
- ✅ Toast notifications

## 📚 Next Steps

- Read [README.md](./README.md) for full documentation
- Check [ARCHITECTURE.md](./ARCHITECTURE.md) for technical details
- See [PROMPTS.md](./PROMPTS.md) for development ideas

## 🆘 Having Issues?

### Backend won't start?
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Frontend won't start?
```bash
cd frontend
rm -rf node_modules package-lock.json .next
npm install
npm run dev
```

### Port already in use?
Kill the process or change ports in `.env` files.

## 🎉 You're Ready!

Start building amazing features on top of this solid foundation!

---

**Happy Coding! 🚀**
