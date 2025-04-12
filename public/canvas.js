const socket = io();  // Connect to the server

// Get canvas and its context
const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');

// Set up drawing settings
let drawing = false;
let text = ''; // Variable to store the text input

// Handle mouse events for drawing
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

// Handle input events for text
const textbox = document.getElementById('textbox');
textbox.addEventListener('input', (event) => {
  text = event.target.value;
  // Emit the text data to the server
  socket.emit('text', { text });
});

function draw(x, y) {
  ctx.lineTo(x, y);
  ctx.stroke();
}

// Listen for draw events from other users
socket.on('draw', (data) => {
  draw(data.x, data.y);
});

// Listen for text events from other users
socket.on('text', (data) => {
  // Clear the canvas and redraw everything, including text
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPreviousDrawings(); // Optional: You can store previous drawings and redraw them
  drawText(data.text);
});

// Function to draw the text
function drawText(text) {
  ctx.font = '20px Arial';
  ctx.fillStyle = 'black';
  ctx.fillText(text, 50, 250); // You can adjust the position of the text here
}

// Optional: Function to store and redraw previous drawings
function drawPreviousDrawings() {
  // This would contain the logic to store and redraw any previously drawn lines
  // For now, it's empty, but you can store drawing data on the server and redraw it when needed
}
