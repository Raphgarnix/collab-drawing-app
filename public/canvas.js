const socket = io();  // Establish connection to the server

const textbox = document.getElementById('textbox');
const messagesDiv = document.getElementById('messages'); // Div for displaying messages

// Send text to the server when the user types in the textbox
textbox.addEventListener('input', (event) => {
  const text = event.target.value;
  socket.emit('text', { text });  // Send text to the server
});

// Receive text from other users
socket.on('text', (data) => {
  addMessageToChat(data.text);  // Add received text to chat
});

// Function to add message to chat display
function addMessageToChat(message) {
  const messageElement = document.createElement('div');
  messageElement.textContent = message; // Create a new div for the message
  messagesDiv.appendChild(messageElement); // Append it to the messages div
  messagesDiv.scrollTop = messagesDiv.scrollHeight; // Scroll to the bottom
}