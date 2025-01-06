const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let content = ''; // Shared document content

io.on('connection', (socket) => {
  console.log('User connected');
  
  // Send current content to the new user
  socket.emit('update', content);

  // Handle incoming edits
  socket.on('edit', (newContent) => {
    content = newContent;
    socket.broadcast.emit('update', content); // Broadcast to others
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
