var request = require('request');
const TelegramBot = require('node-telegram-bot-api');

// var argv = require('yargs').argv;
// replace the value below with the Telegram token you receive from @BotFather
var token = 'ENTER_YOUR_BOT_TOKEN';
var chat_id = '@WikipediaPost';
var term = 'hello';


// var query = 'physics';
var query = 'english';

var searchurl = `https://en.wikipedia.org/w/api.php?action=opensearch&search="+ ${query} +"&format=json`;
var contentUrl = `https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&titles=`;
var url = `en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=python&exintro=&prop=extracts|pageimages&format=json`;

var boturl = 'https://api.telegram.org/bot';
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

    var chatId = msg.chat.id;
    var resp = match[1]; // the captured "whatever"
    bot.sendMessage(chatId, resp);
    bot.on('message', (msg) => {
        const chatId = msg.chat.id;
        let text = 'Success';
        // send a message to the chat acknowledging receipt of their message
        // let url = boturl+token+'/sendMessage?chat_id='+chatId+'&text='+text;
        let url = contentUrl + query;
        
        // loadJSON(url,gotSearch, 'jsonp');
    
        // var cont = JSON.parse(body);
        // let page = cont['query']['pages'];
        // let pageId = Object.keys(page)[0];
        // let content = page[pageId]['revisions'][0]['*'];
        // let wordRegex = /\b\w{4,}\b/g;
        // var words = content.match(wordRegex);
        // var word = Math.random(words);
        request(searchurl, function (err, response, body){
            if (err) {
                var error = "cannot connect to the server";
                console.log(error);
            } else {
                var data = JSON.parse(body);
                let len = data[1].length;
                let index = Math.floor(Math.random(len));
                let title = data[1][index];
                title = title.replace(/\s+/g, '_');
                // let url = contentUrl + title;
                let url = 'https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch='+resp+'&exintro=&prop=extracts|pageimages&format=json';
                request(url, function(err, response, body){
                    var cont = JSON.parse(body);
                    let page = cont['query']['pages'];
                    let pageId = Object.keys(page)[0];
                    let content = page[pageId]['extract'];
                    let wordRegex = /\b\w{4,}\b/g;
                    var words = content.match(wordRegex);
                    var word = Math.random(words);
                    // let pageId = Object.values(cont);
                    // console.log(content);
                    bot.sendMessage(chatId, content);
                });
        }});
    });
//   console.log(resp);
//   let url = boturl + token;
//   console.log(url);

//   if(resp=="new post"){

//   }else{

//   }


  // send back the matched "whatever" to the chat
//   bot.sendMessage(chatId, resp);
});

// request(searchurl, function (err, response, body){
//     if (err) {
//         var error = "cannot connect to the server";
//         console.log(error);
//     } else {
//         var data = JSON.parse(body);
//         let len = data[1].length;
//         let index = Math.floor(Math.random(len));
//         let title = data[1][index];
//         title = title.replace(/\s+/g, '_');
//         let url = contentUrl + title;
//         // let response = fetch(url);
//         request(url, function(err, response, body){
//             var cont = JSON.parse(body);
//             let page = cont['query']['pages'];
//             let pageId = Object.keys(page)[0];
//             let content = page[pageId]['revisions'][0]['*'];
//             let wordRegex = /\b\w{4,}\b/g;
//             var words = content.match(wordRegex);
//             var word = Math.random(words);
//             // let pageId = Object.values(cont);
//             // console.log(content);
//         });
//         // for (var i = 0; i < wiki[1].length; i++) {
//         //     var data = `You searched for ${wiki[1][i]}: And these are the details — ${wiki[2][i]} Follow this link to read more — ${wiki[3][i]}` + "\n";
//         //     console.log(data);
//         // }
//     }});

// Listen for any kind of message. There are different kinds of
// messages.
// bot.on('message', (msg) => {
//     const chatId = msg.chat.id;
//     let text = 'Success';
//     // send a message to the chat acknowledging receipt of their message
//     // let url = boturl+token+'/sendMessage?chat_id='+chatId+'&text='+text;
//     let url = contentUrl + query;
    
//     // loadJSON(url,gotSearch, 'jsonp');

//     // var cont = JSON.parse(body);
//     // let page = cont['query']['pages'];
//     // let pageId = Object.keys(page)[0];
//     // let content = page[pageId]['revisions'][0]['*'];
//     // let wordRegex = /\b\w{4,}\b/g;
//     // var words = content.match(wordRegex);
//     // var word = Math.random(words);
//     request(searchurl, function (err, response, body){
//         if (err) {
//             var error = "cannot connect to the server";
//             console.log(error);
//         } else {
//             var data = JSON.parse(body);
//             let len = data[1].length;
//             let index = Math.floor(Math.random(len));
//             let title = data[1][index];
//             title = title.replace(/\s+/g, '_');
//             // let url = contentUrl + title;
//             let url = 'https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch='+term+'&exintro=&prop=extracts|pageimages&format=json';
//             request(url, function(err, response, body){
//                 var cont = JSON.parse(body);
//                 let page = cont['query']['pages'];
//                 let pageId = Object.keys(page)[0];
//                 let content = page[pageId]['extract'];
//                 let wordRegex = /\b\w{4,}\b/g;
//                 var words = content.match(wordRegex);
//                 var word = Math.random(words);
//                 // let pageId = Object.values(cont);
//                 // console.log(content);
//                 bot.sendMessage(chatId, content);
//             });
//     }});
// });
        // for (var i = 0; i < wiki[1].length; i++) {
        //     var data = `You searched for ${wiki[1][i]}: And these are the details — ${wiki[2][i]} Follow this link to read more — ${wiki[3][i]}` + "\n";
        //     console.log(data);
        // }
    // if(resp=='new post'){

    //     bot.sendMessage(chatId, 'Fetching Random articles for you!!');
    // }else{
    //     bot.sendMessage(chatId, 'Only enter new post');

    // }
