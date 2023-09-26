const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// Serve static files from the "public" directory
app.use(express.static('public'));

// Handle socket.io connections
io.on('connection', (socket) => {
  console.log(socket);
  io.emit('join', socket.id);
  // Handle chat message event
  socket.on('chat message', (msg) => {
    console.log('Message: ' + msg);

    // Broadcast the message to all connected clients
    io.emit('chat', msg);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
    io.emit("off",socket.id)
  });
});

// Start the server
const port = process.env.PORT || 3000; // Use the provided port or default to 3000
http.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});