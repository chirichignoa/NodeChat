var socket = io();
socket.on('connect', function() {
    console.log('connected to server');

    socket.emit('createMessage', {
        from: 'me',
        text: 'holis'
    });

});

socket.on('disconnect', function() {
    console.log('disconnected from server');
});

socket.on('newMessage', function(newMessage) {
    console.log('You have received a new message: ', newMessage);
});