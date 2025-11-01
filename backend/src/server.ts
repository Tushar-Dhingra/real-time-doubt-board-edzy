import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { createDoubtsRouter } from './routes/doubts';
import { setupSocketHandlers } from './sockets';
import { doubtsService } from './services/doubtsService';

const app = express();
const httpServer = createServer(app);

const allowedOrigins = [
  'http://localhost:3000',
  'https://real-time-doubt-board-edzy-frontend.vercel.app',
  /\.vercel\.app$/,
];

const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PATCH'],
    credentials: true,
    allowedHeaders: ['Content-Type'],
  },
});

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json());

app.use('/api/doubts', createDoubtsRouter(io));

setupSocketHandlers(io);

const PORT = process.env.PORT || 4000;

doubtsService.init().then(() => {
  httpServer.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
    console.log(`🔌 Socket.io ready for connections`);
  });
});
