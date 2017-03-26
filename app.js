var express = require('express');
var app = express();
const { AkairoClient } = require('discord-akairo');
var http = require("http");

const token = process.env.DISCTOKEN;

const client = new AkairoClient({
    ownerID: '295047872183795714',
    prefix: '!',
    commandDirectory: './commands/',
    inhibitorDirectory: './commands/',
    listenerDirectory: './listeners/'
});

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.send('hi');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
  client.login(token).then(() => {
      console.log('Ready!');
      setInterval(function() {
          http.get("http://zinquoter.herokuapp.com");
      }, 300000); // every 5 minutes (300000)
  });
});
