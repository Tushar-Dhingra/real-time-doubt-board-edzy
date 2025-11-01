# Architecture Documentation

## System Overview

The Real-Time Doubt Board is a full-stack application that combines REST API and WebSocket communication to provide instant updates across all connected clients.

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                        │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              Next.js Frontend (Port 3000)              │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐   │ |
│  │  │  React UI    │  │ TanStack     │  │ Socket.io   │   │ |
│  │  │  Components  │  │ Query        │  │ Client      │   │ |
│  │  └──────────────┘  └──────────────┘  └─────────────┘   │ |
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                            │ │
                            │ │ HTTP/REST
                            │ │ WebSocket
                            ▼ ▼
┌─────────────────────────────────────────────────────────────┐
│                        SERVER LAYER                         │
│  ┌────────────────────────────────────────────────────────┐ │
│  │           Express + Socket.io (Port 4000)              │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐   │ │
│  │  │ REST Routes  │  │ Socket.io    │  │ Services    │   │ │
│  │  │ /api/doubts  │  │ Handlers     │  │ Layer       │   │ │
│  │  └──────────────┘  └──────────────┘  └─────────────┘   │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                            │
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      PERSISTENCE LAYER                      │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                  lowdb (JSON Database)                 │ │
│  │                   backend/src/data/db.json             │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Communication Flow

### 1. REST API Flow (CRUD Operations)

```
Client                    Server                    Database
  │                         │                          │
  │  POST /api/doubts       │                          │
  ├────────────────────────>│                          │
  │                         │  Save doubt              │
  │                         ├─────────────────────────>│
  │                         │                          │
  │                         │  Doubt saved             │
  │                         │<─────────────────────────┤
  │                         │                          │
  │                         │  Emit 'doubt:created'    │
  │                         ├──────────────────────────┐
  │                         │                          │
  │  Response (201)         │                          │
  │<────────────────────────┤                          │
  │                         │                          │
```

### 2. WebSocket Flow (Real-Time Updates)

```
Client A              Server              Client B
  │                     │                     │
  │  POST /api/doubts   │                     │
  ├────────────────────>│                     │
  │                     │                     │
  │                     │  doubt:created      │
  │  doubt:created      │────────────────────>│
  │<────────────────────┤                     │
  │                     │                     │
  │  (UI updates)       │                     │  (UI updates)
  │                     │                     │
```

## Component Architecture

### Backend Components

```
backend/
│
├── server.ts                    # Application entry point
│   ├── Express setup
│   ├── Socket.io initialization
│   ├── CORS configuration
│   └── Route mounting
│
├── routes/
│   └── doubts.ts               # REST API endpoints
│       ├── GET /api/doubts
│       ├── POST /api/doubts
│       ├── POST /api/doubts/:id/reply
│       └── PATCH /api/doubts/:id/resolve
│
├── sockets/
│   └── index.ts                # WebSocket event handlers
│       ├── connection
│       ├── disconnect
│       ├── typing:start
│       ├── typing:stop
│       └── user:count (interval)
│
├── services/
│   └── doubtsService.ts        # Business logic layer
│       ├── getAllDoubts()
│       ├── createDoubt()
│       ├── addReply()
│       └── resolveDoubt()
│
├── models/
│   └── types.ts                # TypeScript interfaces
│       ├── Doubt
│       ├── Reply
│       └── Database
│
└── data/
    └── db.json                 # JSON database file
```

### Frontend Components

```
frontend/
│
├── app/
│   ├── layout.tsx              # Root layout with providers
│   ├── page.tsx                # Redirect to /doubts
│   │
│   └── doubts/
│       ├── page.tsx            # Main page component
│       │   ├── Socket connection
│       │   ├── Event listeners
│       │   ├── State management
│       │   └── Component composition
│       │
│       ├── components/
│       │   ├── PostDoubtForm.tsx      # Create doubt form
│       │   ├── DoubtCard.tsx          # Individual doubt display
│       │   ├── ReplyBox.tsx           # Reply input component
│       │   ├── LiveIndicator.tsx      # Connection status
│       │   └── FilterBar.tsx          # Search & filters
│       │
│       └── hooks/
│           ├── useSocket.ts           # Socket.io connection
│           └── useDoubts.ts           # Data fetching & mutations
│
└── utils/
    ├── api.ts                  # Axios client & API methods
    └── dateUtils.ts            # Date formatting utilities
```

## Data Flow

### Creating a Doubt

```
1. User fills form in PostDoubtForm
   ↓
2. Form submission triggers createDoubt.mutate()
   ↓
3. useDoubts hook calls doubtsApi.create()
   ↓
4. Axios sends POST request to /api/doubts
   ↓
5. Backend route handler receives request
   ↓
6. doubtsService.createDoubt() saves to database
   ↓
7. Backend emits 'doubt:created' via Socket.io
   ↓
8. All connected clients receive the event
   ↓
9. updateDoubtInCache() updates React Query cache
   ↓
10. UI re-renders with new doubt
```

### Adding a Reply

```
1. User types reply in ReplyBox
   ↓
2. Form submission triggers addReply.mutate()
   ↓
3. useDoubts hook calls doubtsApi.addReply()
   ↓
4. Axios sends POST to /api/doubts/:id/reply
   ↓
5. Backend validates (not resolved)
   ↓
6. doubtsService.addReply() updates database
   ↓
7. Backend emits 'doubt:replied' via Socket.io
   ↓
8. All clients receive updated doubt
   ↓
9. Cache updated, UI re-renders
```

## State Management

### Client-Side State

```
┌─────────────────────────────────────────┐
│         TanStack Query Cache            │
│  ┌───────────────────────────────────┐  │
│  │  Query Key: ['doubts']            │  │
│  │  Data: Doubt[]                    │  │
│  │  Status: loading | success | error│  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
              │
              │ Updates from:
              │ - Initial fetch
              │ - Mutations
              │ - Socket events
              ▼
┌─────────────────────────────────────────┐
│           React Components              │
│  - Automatic re-render on cache update  │
│  - Optimistic updates                   │
│  - Error boundaries                     │
└─────────────────────────────────────────┘
```

### Server-Side State

```
┌─────────────────────────────────────────┐
│          lowdb Database                 │
│  {                                      │
│    doubts: [                            │
│      { id, title, description, ... }    │
│    ]                                    │
│  }                                      │
└─────────────────────────────────────────┘
              │
              │ Accessed via:
              │ - doubtsService
              ▼
┌─────────────────────────────────────────┐
│        In-Memory State                  │
│  - Connected users count                │
│  - Active socket connections            │
└─────────────────────────────────────────┘
```

## Real-Time Event System

### Event Types

| Event            | Direction      | Trigger                | Payload       |
|------------------|----------------|------------------------|---------------|
| `connection`     | Client → Server| Client connects        | -             |
| `disconnect`     | Client → Server| Client disconnects     | -             |
| `doubt:created`  | Server → All   | New doubt posted       | Doubt object  |
| `doubt:replied`  | Server → All   | Reply added            | Doubt object  |
| `doubt:resolved` | Server → All   | Doubt resolved         | Doubt object  |
| `user:count`     | Server → All   | Every 10s or on change | number        |
| `typing:start`   | Client → Others| User starts typing     | {doubtId, userName} |
| `typing:stop`    | Client → Others| User stops typing      | {doubtId}     |

### Event Broadcasting Strategy

```
┌──────────────────────────────────────────────────────────┐
│                    Socket.io Server                      │
│                                                          │
│  io.emit('event', data)                                 │
│  └─> Broadcasts to ALL connected clients               │
│                                                          │
│  socket.broadcast.emit('event', data)                   │
│  └─> Broadcasts to all EXCEPT sender                   │
│                                                          │
│  io.to(room).emit('event', data)                        │
│  └─> Broadcasts to specific room (future feature)      │
└──────────────────────────────────────────────────────────┘
```

## Security Considerations

### Current Implementation

1. **CORS**: Configured to allow frontend origin
2. **Input Validation**: Basic validation in routes
3. **Error Handling**: Structured error responses

### Production Recommendations

1. **Authentication**: Add JWT-based auth
2. **Rate Limiting**: Prevent abuse
3. **Input Sanitization**: Prevent XSS attacks
4. **HTTPS**: Use SSL/TLS in production
5. **Environment Variables**: Secure sensitive data
6. **Database**: Use proper database with access controls

## Scalability Considerations

### Current Limitations

- Single server instance
- File-based database
- No horizontal scaling

### Scaling Strategy

```
┌─────────────────────────────────────────────────────────┐
│                    Load Balancer                        │
└─────────────────────────────────────────────────────────┘
              │
              ├──────────────┬──────────────┐
              ▼              ▼              ▼
┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│   Server 1       │ │   Server 2       │ │   Server 3       │
│   + Socket.io    │ │   + Socket.io    │ │   + Socket.io    │
└──────────────────┘ └──────────────────┘ └──────────────────┘
              │              │              │
              └──────────────┴──────────────┘
                            │
                            ▼
              ┌──────────────────────────┐
              │   Redis Adapter          │
              │   (Socket.io sync)       │
              └──────────────────────────┘
                            │
                            ▼
              ┌──────────────────────────┐
              │   PostgreSQL/MongoDB     │
              │   (Persistent storage)   │
              └──────────────────────────┘
```

## Performance Optimizations

### Frontend

1. **React Query Caching**: Reduces unnecessary API calls
2. **Optimistic Updates**: Instant UI feedback
3. **Memoization**: useMemo for filtered lists
4. **Code Splitting**: Next.js automatic code splitting
5. **Image Optimization**: Next.js Image component (if images added)

### Backend

1. **Connection Pooling**: Reuse database connections
2. **Event Debouncing**: Limit user:count broadcasts
3. **Compression**: Gzip responses
4. **Caching**: Redis for frequently accessed data
5. **Database Indexing**: Index frequently queried fields

## Testing Strategy

### Unit Tests

- Service layer methods
- Utility functions
- Component logic

### Integration Tests

- API endpoints
- Socket event handlers
- Database operations

### E2E Tests

- User flows (post doubt, reply, resolve)
- Real-time synchronization
- Multi-client scenarios

## Deployment Architecture

### Development

```
localhost:3000 (Frontend) → localhost:4000 (Backend)
```

### Production

```
┌─────────────────────────────────────────────────────────┐
│                    CDN (Static Assets)                  │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│              Vercel (Next.js Frontend)                  │
│              https://doubt-board.vercel.app             │
└─────────────────────────────────────────────────────────┘
                            │
                            │ HTTPS
                            ▼
┌─────────────────────────────────────────────────────────┐
│           Railway/Render (Express Backend)              │
│           https://api.doubt-board.com                   │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│              Database (PostgreSQL/MongoDB)              │
└─────────────────────────────────────────────────────────┘
```

## Monitoring & Observability

### Recommended Tools

1. **Application Monitoring**: New Relic, Datadog
2. **Error Tracking**: Sentry
3. **Logging**: Winston, Pino
4. **Analytics**: Google Analytics, Mixpanel
5. **Uptime Monitoring**: Pingdom, UptimeRobot

---

**This architecture provides a solid foundation for a production-ready real-time application.**
