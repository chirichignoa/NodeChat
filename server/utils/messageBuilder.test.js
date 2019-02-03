var expect = require('expect');

var {generateMessage} = require('./messageBuilder');

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