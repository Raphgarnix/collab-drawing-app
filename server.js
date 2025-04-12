const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors'); // Optional: for CORS handling
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Optional: Enable CORS
app.use(cors());

// Serve static files from the 'public' directory (HTML, CSS, JS)
app.use(express.static('public'));

// Array to hold active users
let activeUsers = [];

io.on('connection', (socket) => {
  console.log('A user has connected.');

  // When a user registers with their username
  socket.on('registerUser ', (username) => {
    if (!activeUsers.includes(username)) {
      activeUsers.push(username);
      socket.username = username; // Set the username on the socket
      console.log('Active users:', activeUsers);
      // Emit the updated user list to all clients
      io.emit('userList', activeUsers);
    }
  });

  // When text is received from the client
  socket.on('text', (data) => {
    console.log('Text received:', data.text);
    // Send the text to all other users
    socket.broadcast.emit('text', data);
  });

  // When the user disconnects
  socket.on('disconnect', () => {
    console.log('User  has disconnected');
    // Remove the user from the active users array
    activeUsers = activeUsers.filter(user => user !== socket.username);
    console.log('Active users:', activeUsers);
    // Emit the updated user list to all clients
    io.emit('userList', activeUsers);
  });
});

// Server runs on the specified port (3000)
const PORT = process.env.PORT || 3000;
server.listen(PORT, (err) => {
  if (err) {
    console.error('Error starting the server:', err);
  } else {
    console.log(`Server running on port ${PORT}`);
  }
});