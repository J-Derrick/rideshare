import * as WebSocket from 'ws';
import { createServer } from 'http';

const server = createServer((req, res) => {
  // Handle HTTP requests (if needed)
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('WebSocket server is running\n');
});

const wss = new WebSocket.Server({ server });

// Create separate arrays to store WebSocket connections.
const connections: WebSocket[] = [];

wss.on('connection', (ws: WebSocket) => {
  console.log('Client connected');

  // Add the WebSocket connection to the connections array.
  connections.push(ws);

  ws.on('message', (message: string) => {
    console.log(`Received: ${message}`);

    // Broadcast the message to all connected clients.
    connections.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');

    // Remove the WebSocket connection from the connections array.
    const index = connections.indexOf(ws);
    if (index !== -1) {
      connections.splice(index, 1);
    }
  });
});

server.listen(8080, () => {
  console.log('WebSocket server is listening on port 8080');
});
