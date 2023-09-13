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
const io = require('socket.io')(server, {
    // It takes 60 seconds before off
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:3000",
    },
}); // Pass the http server to Socket.io

// Get the Port
const port = process.env.PORT || 5000;

// Set up body-parser middleware to parse JSON and urlencoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use CORS
app.use(cors());

// Import User Type Router
app.use("/api/persons", require("./Controller/userTypeController"));
// Import Chat Router
app.use("/api/chats", require("./Controller/chatController"));
// Import Symptom Router
app.use("/api/symptoms", require("./Controller/symptomController"));
// Import Medicine Router
app.use("/api/medicines", require("./Controller/medicineController"));

app.all("*", (req, res) => {
    res.status(404).send("`~` Page Not Found `~`");
})

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on("setup", (userid) => {
        socket.join(userid);
        console.log("User Id : " + userid);
        socket.emit("connected");
    });

    socket.on("joinchat", (roomid) => {
        socket.join(roomid);
        console.log("User Join Room : " + roomid);
    });

    socket.on("typing",(room)=>socket.in(room).emit("typing"));
    socket.on("stoptyping",(room)=>socket.in(room).emit("stoptyping"));

    socket.on("newmessage",(newMsgReceived)=>{
        let chat=newMsgReceived.userChat;

        chat.forEach((u)=>{
            if(u.user_id === newMsgReceived.message.sender_id) return;

            socket.in(u.user_id).emit("messagereceived",newMsgReceived);
        })
    })
});

server.listen(port, () => {
    console.log(`Server Running at http://localhost:${port}`);
})