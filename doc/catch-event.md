# Introduction
In questa guida si vuole rendere note le complicanze trovate nella realizzazione di questo Bot e nel renderlo funzionante su ambiente AWS Lambda.

### Instance of telegraf
```js
const Telegraf = require('telegraf');
const bot = new Telegraf('<bot-token>', {
    telegram: { webhookReply: false }
});
```
> Seguire questo esempio per fare in modo che l'istanza di telegraf creata funzioni correttamente in AWS Lambda.

### Handle the event
```js
exports.handler = async (event) => {
    console.log('Request: ' + JSON.stringify(event));
    await bot.handleUpdate(event);
    return {statusCode: 200, body: ''};
};
```
> Seguire il seguente esempio per fare in modo che la Lambda catturi l'evento per passarlo poi al sdk telegraf. Infine rispondere alla cattura di evento con un messaggio vuoto nel body con status 200.

### Trigger an event
```js
bot.hears('hi', (ctx) => {
    return ctx.reply('Hello from Concierge Bot')
});
```
> Quando si vuole scatenare un evento alla ricezione di un messaggio con contentuto 'hi' baserà seguire il seguente esempio. 
> Per altri esempi rifarsi alla documentazione del pacchetto telegraf https://github.com/telegraf/telegraf :+1:.

### Example 
```js
const Telegraf = require('telegraf');
const bot = new Telegraf('<bot-token>', {
    telegram: { webhookReply: false }
});

bot.hears('hi', (ctx) => {
    return ctx.reply('Hello from Concierge Bot')
});

exports.handler = async (event) => {
    console.log('Request: ' + JSON.stringify(event));
    await bot.handleUpdate(event);
    return {statusCode: 200, body: ''};
};
```

### Other
> Durante la realizzazione del codice è stato notato che non è possibile creare una callback function per il metodo .command().