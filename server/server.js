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

    socket.on('createMessage', function(message) {
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
    });
});

app.use('/', express.static(publicPath));

server.listen(port, () => {
    console.log(`App listening on port ${port}!`)
});