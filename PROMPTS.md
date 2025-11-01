# Development Prompts & Guidelines

This document contains useful prompts and guidelines for extending the Real-Time Doubt Board application.

## 🎯 Project Context

This is a real-time doubt board application built for educational purposes, enabling students to post doubts, receive replies, and mark them as resolved with instant updates across all connected clients.

## 🔧 Common Development Tasks

### Adding a New Feature

**Prompt Template:**
```
I want to add [FEATURE_NAME] to the doubt board. This feature should:
1. [Requirement 1]
2. [Requirement 2]
3. [Requirement 3]

Please update both backend and frontend, maintaining the existing architecture and real-time capabilities.
```

### Adding a New Subject

**Backend** (`backend/src/models/types.ts`):
```typescript
subject: "Maths" | "Science" | "English" | "Social Science" | "NEW_SUBJECT";
```

**Frontend** (`frontend/app/doubts/components/PostDoubtForm.tsx` & `FilterBar.tsx`):
```typescript
const subjects = ['Maths', 'Science', 'English', 'Social Science', 'NEW_SUBJECT'];
```

### Adding Authentication

**Prompt:**
```
Add JWT-based authentication to the doubt board:
1. Users should register/login with email and password
2. Store user info in the database
3. Protect API endpoints
4. Associate doubts and replies with authenticated users
5. Update Socket.io to use authenticated connections
```

### Adding File Uploads

**Prompt:**
```
Add image upload capability to doubts:
1. Allow users to attach images when posting doubts
2. Store images in a /uploads directory
3. Display images in the doubt card
4. Support common formats (jpg, png, gif)
5. Limit file size to 5MB
```

### Adding Notifications

**Prompt:**
```
Implement a notification system:
1. Notify users when their doubt receives a reply
2. Notify users when their doubt is resolved
3. Show notification count in the UI
4. Store notifications in the database
5. Mark notifications as read
```

## 🏗️ Architecture Patterns

### Adding a New REST Endpoint

1. **Define types** in `backend/src/models/types.ts`
2. **Add service method** in `backend/src/services/doubtsService.ts`
3. **Create route** in `backend/src/routes/doubts.ts`
4. **Emit socket event** if real-time update needed
5. **Add API method** in `frontend/utils/api.ts`
6. **Create React Query hook** in `frontend/app/doubts/hooks/`
7. **Update UI component** to use the new hook

### Adding a New Socket Event

1. **Backend**: Add event handler in `backend/src/sockets/index.ts`
2. **Frontend**: Listen to event in `frontend/app/doubts/page.tsx`
3. **Update UI**: Handle the event data appropriately

## 🎨 UI Component Patterns

### Creating a New shadcn/ui Component

**Prompt:**
```
Create a [COMPONENT_NAME] component following shadcn/ui patterns:
1. Use Tailwind CSS for styling
2. Support dark mode with CSS variables
3. Include proper TypeScript types
4. Make it accessible (ARIA labels, keyboard navigation)
5. Add hover and focus states
```

### Adding a Modal/Dialog

**Prompt:**
```
Add a modal dialog for [PURPOSE]:
1. Use shadcn/ui dialog pattern
2. Include backdrop overlay
3. Support ESC key to close
4. Trap focus within modal
5. Animate entrance/exit
```

## 🧪 Testing Prompts

### Adding Unit Tests

**Prompt:**
```
Add unit tests for the doubts service:
1. Test creating a doubt
2. Test adding a reply
3. Test resolving a doubt
4. Test error cases (invalid data, not found)
5. Use Jest and mock the database
```

### Adding E2E Tests

**Prompt:**
```
Add end-to-end tests using Playwright:
1. Test posting a new doubt
2. Test adding a reply
3. Test resolving a doubt
4. Test real-time updates across multiple clients
5. Test filtering and search
```

## 🔐 Security Enhancements

### Adding Rate Limiting

**Prompt:**
```
Implement rate limiting:
1. Limit API requests per IP address
2. Use express-rate-limit middleware
3. Set appropriate limits (e.g., 100 requests per 15 minutes)
4. Return 429 status when limit exceeded
5. Add rate limit info to response headers
```

### Adding Input Validation

**Prompt:**
```
Add comprehensive input validation:
1. Use Zod for schema validation
2. Validate all request bodies
3. Sanitize user inputs to prevent XSS
4. Add length limits for text fields
5. Return detailed validation errors
```

## 📊 Performance Optimizations

### Adding Pagination

**Prompt:**
```
Implement pagination for doubts:
1. Add page and limit query parameters
2. Return total count and page info
3. Update frontend to load more on scroll
4. Cache pages in React Query
5. Maintain real-time updates for visible items
```

### Adding Caching

**Prompt:**
```
Add Redis caching:
1. Cache frequently accessed doubts
2. Invalidate cache on updates
3. Set appropriate TTL values
4. Add cache hit/miss metrics
5. Fallback to database on cache miss
```

## 🎨 UI/UX Enhancements

### Adding Dark Mode

**Prompt:**
```
Implement dark mode:
1. Add theme toggle button
2. Use CSS variables for colors
3. Persist preference in localStorage
4. Support system preference detection
5. Animate theme transitions
```

### Adding Animations

**Prompt:**
```
Add smooth animations:
1. Animate doubt card entrance
2. Add loading skeletons
3. Animate reply additions
4. Add micro-interactions (button clicks, hovers)
5. Use Framer Motion for complex animations
```

## 🔍 Debugging Tips

### Socket.io Connection Issues

**Check:**
1. CORS configuration in backend
2. Socket URL in frontend environment variables
3. Network tab in browser DevTools
4. Backend console for connection logs

### Real-time Updates Not Working

**Check:**
1. Socket event names match on client and server
2. Event listeners are properly registered
3. React Query cache is being updated
4. Component is re-rendering on state changes

### API Errors

**Check:**
1. Request body format matches expected schema
2. Required fields are present
3. Backend validation rules
4. Network tab for actual error response

## 📚 Learning Resources

### Socket.io
- Official Docs: https://socket.io/docs/v4/
- Emit cheatsheet: https://socket.io/docs/v4/emit-cheatsheet/

### Next.js
- App Router: https://nextjs.org/docs/app
- Data Fetching: https://nextjs.org/docs/app/building-your-application/data-fetching

### TanStack Query
- Docs: https://tanstack.com/query/latest
- Mutations: https://tanstack.com/query/latest/docs/react/guides/mutations

### shadcn/ui
- Components: https://ui.shadcn.com/docs/components
- Theming: https://ui.shadcn.com/docs/theming

## 🚀 Deployment Prompts

### Deploying to Vercel (Frontend)

**Prompt:**
```
Help me deploy the frontend to Vercel:
1. Configure build settings
2. Set environment variables
3. Configure custom domain
4. Set up preview deployments
5. Configure redirects if needed
```

### Deploying to Railway (Backend)

**Prompt:**
```
Help me deploy the backend to Railway:
1. Configure Dockerfile
2. Set environment variables
3. Configure persistent storage for db.json
4. Set up custom domain
5. Configure health checks
```

## 🎓 Best Practices

1. **Always maintain type safety** - Use TypeScript interfaces consistently
2. **Follow component patterns** - Keep components small and focused
3. **Handle errors gracefully** - Show user-friendly error messages
4. **Optimize performance** - Use React.memo, useMemo, useCallback where appropriate
5. **Write clean code** - Follow ESLint rules and maintain consistent formatting
6. **Document changes** - Update README when adding new features
7. **Test thoroughly** - Test both happy paths and edge cases
8. **Security first** - Validate inputs, sanitize outputs, use HTTPS in production

---

**Use these prompts as starting points and adapt them to your specific needs!**
