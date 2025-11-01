import { Server, Socket } from 'socket.io';

let connectedUsers = 0;

export const setupSocketHandlers = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    connectedUsers++;
    console.log(`User connected: ${socket.id} (Total: ${connectedUsers})`);
    
    io.emit('user:count', connectedUsers);

    socket.on('typing:start', (data: { doubtId: string; userName: string }) => {
      socket.broadcast.emit('typing:start', data);
    });

    socket.on('typing:stop', (data: { doubtId: string }) => {
      socket.broadcast.emit('typing:stop', data);
    });

    socket.on('disconnect', () => {
      connectedUsers--;
      console.log(`User disconnected: ${socket.id} (Total: ${connectedUsers})`);
      io.emit('user:count', connectedUsers);
    });
  });

  setInterval(() => {
    io.emit('user:count', connectedUsers);
  }, 10000);
};
