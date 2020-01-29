const Telegraf = require('telegraf');
const bot = new Telegraf('958133709:AAHEK6Nvrp2QJ66-AUVGAnBhqafUN6Cq-dU', {
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