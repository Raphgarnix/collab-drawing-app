const socket = io();  // Verbindung zum Server herstellen

const textbox = document.getElementById('textbox');

// Bei jeder Eingabe wird der Text an den Server gesendet
textbox.addEventListener('input', (event) => {
  socket.emit('text', { text: event.target.value });  // Text an Server senden
});

// Empfang von Textänderungen von anderen Benutzern
socket.on('text', (data) => {
  textbox.value = data.text;  // Das Textfeld mit dem empfangenen Text aktualisieren
});
