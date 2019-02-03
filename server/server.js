const path = require('path');
const http = require('http');
const express = require('express');
const app = express();
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

let server = http.createServer(app);
let io = socketIO(server);

var {generateMessage} = require('./utils/messageBuilder');

io.on('connection', (socket) => {
    console.log('new user connected');
    
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    socket.on('disconnect', () => {
        console.log('user was disconnected');
    });

    // socket emit from admin text welcome to chat app
    // socket.broadcast.emit from admin new user joined

    socket.on('createMessage', function(message, callback) {
        io.emit('newMessage', generateMessage(message.from, message.text));
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
        callback();
    });
});

app.use('/', express.static(publicPath));

server.listen(port, () => {
    console.log(`App listening on port ${port}!`)
});