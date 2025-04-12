const socket = io();  // Establish connection to the server

const textbox = document.getElementById('textbox');
const messagesDiv = document.getElementById('messages'); // Div for displaying messages
const sendbutton = document.getElementById('sendbutton');

// Function to send text to the server
function sendText() {
  const text = textbox.value.trim(); // Get the text from the textbox
  if (text) { // Check if the textbox is not empty
    socket.emit('text', { text });  // Send text to the server
    addMessageToChat(text); // Add the message to the chat display immediately
    textbox.value = ''; // Clear the textbox after sending
  }
}

// Send text when the send button is clicked
sendbutton.addEventListener('click', sendText);

// Send text when the Enter key is pressed
textbox.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault(); // Prevent the default action (like form submission)
    sendText(); // Call the sendText function
  }
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