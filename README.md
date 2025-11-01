# Real-Time Doubt Board - Edzy

A production-ready full-stack real-time doubt board application enabling students to post doubts, receive replies, and resolve them with instant live updates across all connected clients.

## 🏗️ Architecture

```
┌─────────────┐         REST API          ┌─────────────┐
│             │ ◄────────────────────────► │             │
│   Next.js   │                            │   Express   │
│   Frontend  │      Socket.io Events     │   Backend   │
│             │ ◄────────────────────────► │             │
└─────────────┘                            └─────────────┘
      │                                           │
      │                                           │
      ▼                                           ▼
  Browser UI                                  lowdb (JSON)
```

### Communication Flow

1. **REST API**: CRUD operations (GET, POST, PATCH)
2. **Socket.io**: Real-time events broadcast to all clients
3. **Events**: `doubt:created`, `doubt:replied`, `doubt:resolved`, `user:count`

## 🚀 Tech Stack

### Backend
- **Runtime**: Node.js + TypeScript
- **Framework**: Express.js
- **Real-time**: Socket.io
- **Database**: lowdb (JSON file-based)
- **Dev Tools**: Nodemon, ts-node

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + shadcn/ui
- **Real-time**: socket.io-client
- **State**: TanStack Query (React Query)
- **HTTP Client**: Axios
- **Notifications**: Sonner (toast)

### Testing
- **API Testing**: Bruno collections

## 📁 Project Structure

```
root/
├── backend/
│   ├── src/
│   │   ├── server.ts              # Main server setup
│   │   ├── sockets/index.ts       # Socket.io handlers
│   │   ├── routes/doubts.ts       # REST API routes
│   │   ├── models/types.ts        # TypeScript interfaces
│   │   ├── services/doubtsService.ts  # Business logic
│   │   └── data/db.json           # Database file
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── app/
│   │   ├── doubts/
│   │   │   ├── page.tsx           # Main doubts page
│   │   │   ├── components/        # UI components
│   │   │   └── hooks/             # Custom React hooks
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── utils/api.ts               # API client
│   ├── package.json
│   └── tailwind.config.ts
│
└── bruno/
    └── DoubtBoardAPI/
        ├── doubts/                # API test requests
        └── env/local.env.json     # Environment config
```

## 🛠️ Setup & Installation

### Prerequisites
- Node.js 18+ and npm
- Bruno (for API testing)

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

Server runs on `http://localhost:4000`

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

App runs on `http://localhost:3000`

### Environment Variables

**Backend**: No environment variables required (uses defaults)

**Frontend** (`.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
NEXT_PUBLIC_SOCKET_URL=http://localhost:4000
```

## 🧪 API Testing with Bruno

1. Install Bruno from https://www.usebruno.com/
2. Open Bruno and load the collection:
   ```bash
   cd bruno
   bruno .
   ```
3. Select the `local` environment
4. Run requests in sequence:
   - `getAllDoubts.bru` - Fetch all doubts
   - `postDoubt.bru` - Create a new doubt
   - `postReply.bru` - Add a reply (replace `:id` with actual doubt ID)
   - `resolveDoubt.bru` - Mark doubt as resolved

## 📡 REST API Endpoints

| Method | Endpoint                      | Description           | Request Body                                                    |
|--------|-------------------------------|-----------------------|-----------------------------------------------------------------|
| GET    | `/api/doubts`                 | Get all doubts        | -                                                               |
| POST   | `/api/doubts`                 | Create a new doubt    | `{ title, description, subject, createdBy }`                    |
| POST   | `/api/doubts/:id/reply`       | Add reply to doubt    | `{ message, repliedBy }`                                        |
| PATCH  | `/api/doubts/:id/resolve`     | Mark doubt as resolved| -                                                               |

### Subjects
- Maths
- Science
- English
- Social Science

## 🔌 Socket.io Events

### Server → Client

| Event             | Payload       | Description                          |
|-------------------|---------------|--------------------------------------|
| `doubt:created`   | `Doubt`       | New doubt posted                     |
| `doubt:replied`   | `Doubt`       | Reply added to doubt                 |
| `doubt:resolved`  | `Doubt`       | Doubt marked as resolved             |
| `user:count`      | `number`      | Active user count (every 10s)        |
| `typing:start`    | `{ doubtId, userName }` | User started typing    |
| `typing:stop`     | `{ doubtId }` | User stopped typing                  |

### Client → Server

| Event             | Payload                    | Description              |
|-------------------|----------------------------|--------------------------|
| `typing:start`    | `{ doubtId, userName }`    | Notify typing started    |
| `typing:stop`     | `{ doubtId }`              | Notify typing stopped    |

## 🎨 Features

### Core Features
✅ Post doubts with title, description, and subject  
✅ Real-time updates across all clients  
✅ Add replies to doubts  
✅ Mark doubts as resolved  
✅ Live user count indicator  
✅ Filter by subject (Maths, Science, English, Social Science)  
✅ Filter by status (Active/Resolved)  
✅ Client-side search  
✅ Toast notifications  
✅ Responsive design  

### Real-Time Capabilities
- Instant doubt creation broadcast
- Live reply updates
- Real-time resolution status
- Active user count tracking
- Connection status indicator

## 🔒 Validation Rules

1. All fields required for creating doubts
2. Cannot reply to resolved doubts
3. Subject must be one of: Maths, Science, English, Social Science
4. Structured error responses

## 🎯 Evaluation Criteria

| Category               | Weight | Implementation                                    |
|------------------------|--------|---------------------------------------------------|
| Real-Time Logic        | 30%    | Socket.io events, instant sync                    |
| Full-Stack Integration | 25%    | REST + Socket harmony, type safety                |
| UI/UX                  | 20%    | Responsive, real-time feed, shadcn/ui components  |
| Code Structure         | 15%    | Modular, TypeScript, service layer                |
| Bonus Features         | 10%    | Bruno tests, typing indicators, filters           |

## 🚀 Production Deployment

### Backend
```bash
cd backend
npm run build
npm start
```

### Frontend
```bash
cd frontend
npm run build
npm start
```

### Environment Configuration
Update environment variables for production URLs:
- Backend: Set `PORT` environment variable
- Frontend: Update `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_SOCKET_URL`

## 📝 Data Models

### Doubt
```typescript
interface Doubt {
  id: string;
  title: string;
  description: string;
  subject: "Maths" | "Science" | "English" | "Social Science";
  createdBy: string;
  replies: Reply[];
  resolved: boolean;
  createdAt: string;
}
```

### Reply
```typescript
interface Reply {
  id: string;
  message: string;
  repliedBy: string;
  createdAt: string;
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

MIT License - feel free to use this project for learning and development.

## 👨‍💻 Author

Built for Edzy - Real-Time Doubt Board Assignment

---

**Happy Coding! 🎉**
