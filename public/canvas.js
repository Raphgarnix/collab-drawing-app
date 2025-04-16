const socket = io();  // Establish connection to the server



const textbox = document.getElementById('textbox');
const messagesDiv = document.getElementById('messages'); // Div for displaying messages
const sendbutton = document.getElementById('sendbutton');
const toggleBtn = document.getElementById('toggleAsideBtn');
const container = document.querySelector('.MainSideWindow');
const username = prompt("Please enter your username:");
let currentUsers = [];




toggleBtn.addEventListener('click', () => {
    container.classList.toggle('collapsed');
});

// Send text when the Enter key is pressed
textbox.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault(); // Prevent the default action (like form submission)
    sendText(); // Call the sendText function
  }
});

// Send text when the send button is clicked
sendbutton.addEventListener('click', sendText);



// Function to send text to the server
function sendText() {
  const text = textbox.value.trim(); // Get the text from the textbox
  if (text) { // Check if the textbox is not empty
    socket.emit('text', { text });  // Send text to the server
    addMessageToChat(text); // Add the message to the chat display immediately
    textbox.value = ''; // Clear the textbox after sending
  }
}

// Function to add message to chat display
function addMessageToChat(message) {
  const messageElement = document.createElement('div');
  messageElement.textContent = message; // Create a new div for the message
  messagesDiv.appendChild(messageElement); // Append it to the messages div
  messagesDiv.scrollTop = messagesDiv.scrollHeight; // Scroll to the bottom
}

// Function to add a dynamic tab for a user
function addDynamicTab(userName) {
  const dynamicTabs = document.getElementById('dynamic-tabs');

  // Create the new tab
  const newTab = document.createElement('label');
  newTab.className = 'tab';
  newTab.innerText = userName;
  
  // Add the new tab to the tabs bar
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

// Listen for the updated user list from the server
socket.on('userList', (users) => {
  // Clear current users and tabs
  currentUsers = [];
  const dynamicTabs = document.getElementById('dynamic-tabs');
  dynamicTabs.innerHTML = ''; // Clear existing tabs

  // Add each user to the current users list and create a tab
  users.forEach(user => {
    addUser (user);
  });
});

// Receive text from other users
socket.on('text', (data) => {
  addMessageToChat(data.text);  // Add received text to chat
});


socket.emit('registerUser ', username); // Register the user with the server