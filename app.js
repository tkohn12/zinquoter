const { AkairoClient } = require('discord-akairo');

const token = process.env.DISCTOKEN;

const client = new AkairoClient({
    ownerID: '123992700587343872',
    prefix: '!',
    commandDirectory: './commands/',
    inhibitorDirectory: './commands/',
    listenerDirectory: './listeners/'
});

client.login(token).then(() => {
    console.log('Ready!');
});
