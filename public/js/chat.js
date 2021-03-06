var socket = io();

function scrollToBottom() {
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');

    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if(clientHeight + scrollTop +newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', function() {
    console.log('connected to server');

});

socket.on('disconnect', function() {
    console.log('disconnected from server');
});

socket.on('newMessage', function(newMessage) {
    var formattedTime = moment(newMessage.createdAt).format('HH:mm a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        from: newMessage.from,
        createdAt: formattedTime,
        text: newMessage.text
    });

    jQuery('#messages').append(html);
    scrollToBottom();
});

socket.on('newLocationMessage', function(newMessage) {
    var formattedTime = moment(newMessage.createdAt).format('HH:mm a');
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
        from: newMessage.from,
        createdAt: formattedTime,
        url: newMessage.url
    });

    jQuery('#messages').append(html);
    scrollToBottom();
});


jQuery('#message-form').on('submit', function(e) {
    var messageTextBox = jQuery('[name=message]');
    e.preventDefault()
    if(messageTextBox.val() != '') {;
        socket.emit('createMessage', {
            from: 'User',
            text: messageTextBox.val()
        }, function() {
            messageTextBox.val('');
        });
    }
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function(){
    if(!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }
    locationButton.attr('disabled', 'disabled').text('Sending Location...');
    navigator.geolocation.getCurrentPosition(function(position) {
        locationButton.removeAttr('disabled').text('Send Location...');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function() {
        locationButton.removeAttr('disabled').text('Send Location...');
        alert('Unable to fetch location');
    });
});