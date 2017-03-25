const { Command } = require('discord-akairo');

function exec(message) {
    // client.ping is the heartbeat ping.
    return message.channel.sendMessage('Oh hi Mark');
}

module.exports = new Command('ping', exec, {
    aliases: ['ping', 'hello','hi'] // You can call the command with these names.
});
