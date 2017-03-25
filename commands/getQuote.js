'use strict';

const { Command } = require('discord-akairo');

var assert = require('assert');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://gruntysmurf:' + process.env.MONGOPW +'@ds035740.mlab.com:35740/quote-db';

function execGetQuote(message, args) {
   let quoteString = '';
   if (!args.quoteGroup) {
      return message.channel.sendMessage('I\'m sorry you need to provide the name of a person to quote.' +
         ' Example: !getQuote Tim');
   }

   MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);
      console.log('Connected successfully to server');

      var query = {quoteGroup: args.quoteGroup};
      db.collection('quotes').count(query)
         .then(function (result) {
            let totalNumQuotes = result;
            if(totalNumQuotes === 0) {
               db.close();
               return message.channel.sendMessage('No quotes found for ' + args.quoteGroup +'.');
            }

            var randNumber = Math.floor(Math.random() * totalNumQuotes);

            db.collection('quotes').find(query).limit(1).skip(randNumber).toArray(function(err, doc) {
               assert.equal(null, err);
               console.log(doc);
               quoteString = doc[0].quote;
               console.log(quoteString);
               db.close();
               return message.channel.sendMessage('"' + quoteString + '"' + ' - ' + args.quoteGroup);
            });
         });
      });
}

module.exports = new Command('findQuote', execGetQuote, {
    aliases: ['getquote'],
    args: [
      {
         id: 'quoteGroup',
         type: 'string'
      }
   ]
});
