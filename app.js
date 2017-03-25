var express = require('express');
var app = express();
const { AkairoClient } = require('discord-akairo');

const token = process.env.DISCTOKEN;

const client = new AkairoClient({
    ownerID: '123992700587343872',
    prefix: '!',
    commandDirectory: './commands/',
    inhibitorDirectory: './commands/',
    listenerDirectory: './listeners/'
});


app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
//
// // views is directory for all template files
// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.send('hi');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
  client.login(token).then(() => {
      console.log('Ready!');
  });
});
