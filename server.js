const express = require('express');
const WebSocket = require('ws');

// Create an Express application
const app = express();

// Create an HTTP server using Express
const server = require('http').createServer(app);

// Set up the WebSocket server
const wss = new WebSocket.Server({ server });

// WebSocket connection handling
wss.on('connection', (ws) => {
    console.log('A new client connected');

    // Listen for incoming messages from the WebSocket client
    ws.on('message', (message) => {
        console.log(`Received: ${message}`);
        
        // Optionally, broadcast the message to all connected clients
        wss.clients.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    // Handle disconnection
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

// Example Express route
app.get('/', (req, res) => {
    res.send('Welcome to the Express WebSocket server!');
});

// Start the server
server.listen(8080, () => {
    console.log('Server is listening on http://localhost:8080');
});
