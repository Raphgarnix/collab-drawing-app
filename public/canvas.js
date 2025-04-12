const socket = io();  // Establish connection to the server

const textbox = document.getElementById('textbox');
const messagesDiv = document.getElementById('messages'); // Div for displaying messages
const sendbutton = document.getElementById('sendbutton');
let currentUsers = [];

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

function addDynamicTab(userName) {
  const dynamicTabs = document.getElementById('dynamic-tabs');

   // Erstellen des neuen Tabs
   const newTab = document.createElement('label');
   newTab.className = 'tab';
   newTab.innerText = userName;

  // Erstellen des Schließen-Buttons
  const closeButton = document.createElement('span');  // Ein 'span' für den Schließen-Button
  closeButton.className = 'closebutton';
  closeButton.innerText = '✕';  // Das Symbol für den Schließen-Button

  closeButton.onclick = function(event) {
      event.stopPropagation();  // Verhindert das Auslösen des Tab-Öffnungs-Events
      dynamicTabs.removeChild(newTab);  // Entfernt den Tab aus dem DOM
  };
  
  // Hinzufügen des Schließen-Buttons zum Tab
  newTab.appendChild(closeButton);
  
  // Hinzufügen des neuen Tabs zur Tabs-Leiste
  dynamicTabs.appendChild(newTab);
}

// Function to add a user to the current users list
function addUser (userName) {
  if (!currentUsers.includes(userName)) {
    currentUsers.push(userName);
    addDynamicTab(userName); // Call the function to add a tab for the new user
  }
}

// Function to remove a user from the current users list
function removeUser (userName) {
  const index = currentUsers.indexOf(userName);
  if (index > -1) {
    currentUsers.splice(index, 1);
    // Optionally, you can also remove the tab here if needed
    // You might want to implement a way to find and remove the tab
  }
}