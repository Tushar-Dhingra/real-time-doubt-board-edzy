# Quick Setup Guide

Follow these steps to get the Real-Time Doubt Board running on your local machine.

## Prerequisites

Ensure you have the following installed:
- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Bruno** (for API testing) - [Download](https://www.usebruno.com/)

## Step-by-Step Setup

### 1. Clone or Navigate to the Project

```bash
cd Real-Time-Doubt-Board
```

### 2. Install Dependencies

#### Option A: Install All at Once (Recommended)
```bash
npm run install:all
```

#### Option B: Install Separately
```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 3. Set Up Environment Variables

#### Backend
```bash
cd backend
cp .env.example .env
```

The default values work for local development.

#### Frontend
```bash
cd frontend
cp .env.example .env.local
```

The default values work for local development.

### 4. Start the Application

#### Option A: Start Both Servers Simultaneously (Recommended)
```bash
# From the root directory
npm run dev
```

This will start:
- Backend on `http://localhost:4000`
- Frontend on `http://localhost:3000`

#### Option B: Start Servers Separately

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### 5. Access the Application

Open your browser and navigate to:
```
http://localhost:3000/doubts
```

You should see the Doubt Board interface!

## Testing the API with Bruno

### 1. Open Bruno

Launch the Bruno application.

### 2. Open Collection

- Click "Open Collection"
- Navigate to `Real-Time-Doubt-Board/bruno/DoubtBoardAPI`
- Select the folder

### 3. Select Environment

- In the top-right corner, select the `local` environment
- This sets `BASE_URL` to `http://localhost:4000`

### 4. Run Requests

Execute requests in this order:

1. **Get All Doubts** - Verify the API is working (should return empty array initially)
2. **Post Doubt** - Create a new doubt
3. **Get All Doubts** - Verify the doubt was created
4. **Post Reply** - Add a reply (replace `:id` with the doubt ID from step 2)
5. **Resolve Doubt** - Mark the doubt as resolved

## Verifying Real-Time Functionality

### Test 1: Multiple Browser Windows

1. Open `http://localhost:3000/doubts` in two browser windows side-by-side
2. Post a doubt in one window
3. Verify it appears instantly in the other window
4. Add a reply in one window
5. Verify it appears instantly in the other window

### Test 2: User Count

1. Open the app in multiple browser tabs
2. Watch the user count increase in the top-right corner
3. Close a tab and watch the count decrease

### Test 3: Resolve Status

1. Create a doubt in one window
2. Mark it as resolved in another window
3. Verify the status updates instantly in all windows

## Troubleshooting

### Backend won't start

**Error:** `Port 4000 is already in use`

**Solution:** 
- Kill the process using port 4000, or
- Change the port in `backend/.env` and `frontend/.env.local`

### Frontend won't start

**Error:** `Port 3000 is already in use`

**Solution:**
- Kill the process using port 3000, or
- Start with a different port: `PORT=3001 npm run dev`

### Socket connection fails

**Error:** `WebSocket connection failed` in browser console

**Solution:**
- Ensure backend is running on port 4000
- Check `NEXT_PUBLIC_SOCKET_URL` in `frontend/.env.local`
- Verify CORS settings in `backend/src/server.ts`

### Database errors

**Error:** `Cannot read db.json`

**Solution:**
- Ensure `backend/src/data/db.json` exists
- If missing, create it with: `{"doubts": []}`

### Module not found errors

**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Or for specific workspace
cd backend  # or frontend
rm -rf node_modules package-lock.json
npm install
```

## Development Tips

### Hot Reload

Both backend and frontend support hot reload:
- **Backend**: Nodemon watches for file changes
- **Frontend**: Next.js Fast Refresh updates on save

### Viewing Logs

- **Backend logs**: Check the terminal where backend is running
- **Frontend logs**: Check browser console (F12)
- **Socket events**: Use browser console to log socket events

### Resetting Database

To clear all doubts:
```bash
# Stop the backend server
# Edit backend/src/data/db.json
{
  "doubts": []
}
# Restart the backend server
```

## Next Steps

- Read the [README.md](./README.md) for detailed documentation
- Check [PROMPTS.md](./PROMPTS.md) for development guidelines
- Explore the codebase and add your own features!

## Need Help?

If you encounter issues:
1. Check the troubleshooting section above
2. Review the error messages carefully
3. Ensure all dependencies are installed
4. Verify environment variables are set correctly

---

**Happy coding! 🚀**
