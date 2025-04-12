const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public')); // Serve static files (e.g., your canvas client)

io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle drawing data from clients
  socket.on('draw', (data) => {
    socket.broadcast.emit('draw', data); // Send to all other clients
  });

  // Handle text input from clients
  socket.on('text', (data) => {
    socket.broadcast.emit('text', data); // Broadcast the text to all other clients
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
