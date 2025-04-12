const socket = io();  // Connect to the server

// Get canvas and its context
const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');

// Set up drawing settings
let drawing = false;

// Handle mouse events
canvas.addEventListener('mousedown', () => drawing = true);
canvas.addEventListener('mouseup', () => drawing = false);
canvas.addEventListener('mousemove', (event) => {
  if (!drawing) return;

  const x = event.offsetX;
  const y = event.offsetY;
  draw(x, y);

  // Emit the drawing data to the server
  socket.emit('draw', { x, y });
});

function draw(x, y) {
  ctx.lineTo(x, y);
  ctx.stroke();
}

// Listen for draw events from other users
socket.on('draw', (data) => {
  draw(data.x, data.y);
});
