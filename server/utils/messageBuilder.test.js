var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./messageBuilder');

describe('generate message', () => {
    it('should generate the correct message object', () => {
        var from = "Chiri";
        var text = "holaaaaaa";
        var message = generateMessage(from, text);
        expect(message.from).toEqual(from);
        expect(message.text).toEqual(text);
        //expect(message.createdAt).toBeAn('number');
    });
});

describe('generate location message', () => {
    it('should generate the correct location object', () => {
        var from = "Chiri";
        var latitude = 10;
        var longitude = 20;
        var url = 'https://www.google.com/maps?q=10,20';
        var message = generateLocationMessage(from, latitude, longitude);
        expect(message.from).toEqual(from);
        expect(message.url).toEqual(url);
        //expect(message.createdAt).toBeAn('number');
    })
})