const path = require('path');
const http = require('http');
const express = require('express');
const app = express();
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

let server = http.createServer(app);
let io = socketIO(server);

io.on('connection', (socket) => {
    console.log('new user connected');


    socket.on('disconnect', () => {
        console.log('user was disconnected');
    });

    socket.emit('newMessage', {
        to: 'chirichignoa@gmail.com',
        text: "Hola, ATR!",
        sentAt: new Date()
    });

    socket.on('createMessage', function(message) {
        console.log('creating message: ' + JSON.stringify(message));
    });
});

app.use('/', express.static(publicPath));

server.listen(port, () => {
    console.log(`App listening on port ${port}!`)
});