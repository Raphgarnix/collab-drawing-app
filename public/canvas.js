const socket = io();  // Mit dem Server verbinden

// Holen des Textfelds
const textbox = document.getElementById('textbox');

// Wenn der Benutzer Text im Textfeld eingibt, sende den Text an den Server
textbox.addEventListener('input', () => {
  const text = textbox.value;
  socket.emit('text', text);  // Sende den aktuellen Text an den Server
});

// Empfange den Text von anderen Benutzern und setze ihn im Textfeld
socket.on('text', (data) => {
  // Den Text in das Textfeld setzen
  textbox.value = data;
});
