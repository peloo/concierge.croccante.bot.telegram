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