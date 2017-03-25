const { Command } = require('discord-akairo');

var assert = require('assert');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://gruntysmurf:' + process.env.MONGOPW +'@ds035740.mlab.com:35740/quote-db';

function execAddQuote(message, args) {

   if (!args.quoteGroup) {
      return message.channel.sendMessage('I\'m sorry you need to provide a quote group.' +
         ' Example: !addQuote Tim "420 lit formation"');
   }

   if(!args.quote) {
      return message.channel.sendMessage('I\'m sorry you need to provide a quote.' +
         ' Example: !addQuote Tim "420 lit formation"');
   }

   var quoteToInsert = {
      quoteGroup : args.quoteGroup,
      quote: args.quote
   };

   MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);
      console.log('Connected successfully to server');
      db.collection('quotes').insertOne(quoteToInsert, function(err, r) {
         assert.equal(null, err);
         assert.equal(1, r.insertedCount);
         db.close();
      });
   });

   return message.channel.sendMessage('Okay, quote added! Ask for a quote by saying' +
      ' !getQuote [person] to return a random quote from that person!');
}

module.exports = new Command('quote', execAddQuote, {
    aliases: ['addquote'],
    args: [
      {
         id: 'quoteGroup',
         type: 'string'
      },
      {
         id: 'quote',
         type: 'string'
      }
   ],
   split: 'quoted'
});
