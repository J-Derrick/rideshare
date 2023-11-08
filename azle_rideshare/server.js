"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WebSocket = require("ws");
var http_1 = require("http");
var server = (0, http_1.createServer)(function (req, res) {
    // Handle HTTP requests (if needed)
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('WebSocket server is running\n');
});
var wss = new WebSocket.Server({ server: server });
// Create separate arrays to store WebSocket connections.
var connections = [];
wss.on('connection', function (ws) {
    console.log('Client connected');
    // Add the WebSocket connection to the connections array.
    connections.push(ws);
    ws.on('message', function (message) {
        console.log("Received: ".concat(message));
        // Broadcast the message to all connected clients.
        connections.forEach(function (client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
    ws.on('close', function () {
        console.log('Client disconnected');
        // Remove the WebSocket connection from the connections array.
        var index = connections.indexOf(ws);
        if (index !== -1) {
            connections.splice(index, 1);
        }
    });
});
server.listen(8080, function () {
    console.log('WebSocket server is listening on port 8080');
});
