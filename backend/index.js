// Import dotenv
require('dotenv').config({ path: './.env' });

// Import HTTP
const http = require('http');
// Import Express
const express = require('express');
// Import BodyParser
const bodyParser = require('body-parser');
// Import CORS
const cors = require('cors');
// Connect Database
require("./Database/db");

// Create App
const app = express();

// Server
const server = http.createServer(app);

// Import SocketIo
const io = require('socket.io')(server); // Pass the http server to Socket.io

// Get the Port
const port = process.env.PORT || 5000;

// Set up body-parser middleware to parse JSON and urlencoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use CORS
app.use(cors());

// Import User Type Router
app.use("/api/persons",require("./Controller/userTypeController"));

app.all("*", (req, res) => {
    res.status(404).send("`~` Page Not Found `~`");
})

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg); // Broadcast the message to all connected clients
    });
});

server.listen(port, () => {
    console.log(`Server Running at http://localhost:${port}`);
})