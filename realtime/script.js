const editor = document.getElementById('editor');
const status = document.querySelector('.status');

// Mock WebSocket or Firebase setup
let socket = new WebSocket('ws://your-websocket-server');

// Notify connection status
socket.onopen = () => {
  status.textContent = 'Status: Connected';
};

socket.onclose = () => {
  status.textContent = 'Status: Disconnected';
  status.style.color = 'red';
};

// Sync changes
editor.addEventListener('input', () => {
  socket.send(JSON.stringify({ content: editor.innerHTML }));
});

// Receive updates
socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  editor.innerHTML = data.content;
};
