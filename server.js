const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors'); // Optional: for CORS handling
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Optional: Enable CORS
app.use(cors());

// Stellt die 'public'-Dateien zur Verfügung (HTML, CSS, JS)
app.use(express.static('public'));

// Array to hold active users
let activeUsers = [];

io.on('connection', (socket) => {
  console.log('A user has connected.');

  // When a user registers with their username
  socket.on('registerUser ', (username) => {
    if (!activeUsers.includes(username)) {
      activeUsers.push(username);
      console.log('Active users:', activeUsers);
      // Emit the updated user list to all clients
      io.emit('userList', activeUsers);
    }
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

  // Wenn Text vom Client empfangen wird
  socket.on('text', (data) => {
    console.log('Text empfangen:', data.text);
    // Den Text an alle anderen Benutzer senden
    socket.broadcast.emit('text', data);
  });

// Server läuft auf dem angegebenen Port (3000)
const PORT = process.env.PORT || 3000;
server.listen(PORT, (err) => {
  if (err) {
    console.error('Fehler beim Starten des Servers:', err);
  } else {
    console.log(`Server läuft auf Port ${PORT}`);
  }
});