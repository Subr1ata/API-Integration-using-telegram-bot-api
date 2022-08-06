var request = require('request');
const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
var token = 'ENTER_YOUR_BOT_TOKEN';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat

  let url = 'https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch='+resp+'&exintro=&prop=extracts|pageimages&format=json';
  console.log(resp);


  request(url, function(err, response, body){
    var cont = JSON.parse(body);
    let page = cont['query']['pages'];
    let pageId = Object.keys(page)[0];
    let content = page[pageId]['extract'];
    bot.sendMessage(chatId, '---Summary---'+content);
    // let wordRegex = /\b\w{4,}\b/g;
    // var words = content.match(wordRegex);
    // var word = Math.random(words);
    // let pageId = Object.values(cont);
    // console.log(content);
});

  bot.sendMessage(chatId, 'Title-->'+resp);
});

// Listen for any kind of message. There are different kinds of
// messages.
// bot.on('message', (msg) => {
//   const chatId = msg.chat.id;

//   // send a message to the chat acknowledging receipt of their message
//   bot.sendMessage(chatId, 'Received your message');
// });