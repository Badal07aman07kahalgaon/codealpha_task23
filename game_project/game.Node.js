const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });
const clients = [];

server.on('connection', (ws) => {
  clients.push(ws);

  ws.on('message', (message) => {
    console.log(`Received: ${message}`);

    // Broadcast the message to all connected clients
    clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    clients.splice(clients.indexOf(ws), 1);
  });
});

console.log('Server is running on ws://localhost:8080');
