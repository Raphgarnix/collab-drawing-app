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

io.on('connection', (socket) => {
  console.log('Ein Benutzer hat sich verbunden.');

  // Wenn Text vom Client empfangen wird
  socket.on('text', (data) => {
    console.log('Text empfangen:', data.text);
    // Den Text an alle anderen Benutzer senden
    socket.broadcast.emit('text', data);
  });

  // Wenn der Benutzer die Verbindung trennt
  socket.on('disconnect', () => {
    console.log('Benutzer hat sich getrennt');
  });
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