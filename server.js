const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public')); // Öffentlich zugängliche Dateien wie die HTML und JavaScript-Dateien

let sharedText = "";  // Das gemeinsam genutzte Textfeld

io.on('connection', (socket) => {
  console.log('Ein Benutzer hat sich verbunden');

  // Sende den aktuellen Text an den neuen Benutzer, wenn er sich verbindet
  socket.emit('text', sharedText);

  // Wenn Text empfangen wird, aktualisiere ihn und sende ihn an alle anderen
  socket.on('text', (data) => {
    sharedText = data;  // Aktualisiere den Text
    socket.broadcast.emit('text', data);  // Sende den Text an alle anderen Benutzer
  });

  socket.on('disconnect', () => {
    console.log('Benutzer hat sich getrennt');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
