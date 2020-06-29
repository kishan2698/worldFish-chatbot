const accountSid = 'AC01b5311740cfa96b328bbed8b727b387';
const authToken = '1541917b97103958aa6a02a2906fe408';
const client = require('twilio')(accountSid, authToken);
client.messages
    .create({
    body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
    from: '+18564816458',
    mediaUrl: ['https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg'],
    to: '+918639640391'
})
    .then(message => console.log(message.sid));
//# sourceMappingURL=test1.js.map