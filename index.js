'use strict';
const DynamoService = require('./aws/Dynamo-Service');
const Telegraf = require('telegraf');
const Markup = require('telegraf/markup');
const bot = new Telegraf('<bot-token>', {
    telegram: { webhookReply: false }
});

let dialog;
let accountToSet;

bot.hears('/start', (ctx) => {
    console.log('Bot start on chat id', ctx.message.chat.id);
    return ctx.reply('Ciao! Io sono il bot di Concierge Croccante, ti guiderò passo passo nella configurazione. Iniziamo...',
            Markup.keyboard([
                ['👤 Imposta profilo'],
                ['🛎️ What is Concierge Croccante'],
                ['🆘 Help']
            ])
                .oneTime()
                .resize()
                .extra()
        )
    }
);

bot.hears('👤 Imposta profilo', (ctx) => {
    dialog = '/impostaprofilo';
    console.log('User on chat', ctx.message.chat.id, 'request "imposta profilo" command');
    return ctx.reply('Digita di seguito l\'indirizzo email con il quale sei registrato alla Skill Concierge Croccante.',
        Markup.keyboard([
            ['Annulla']
        ])
            .oneTime()
            .resize()
            .extra()
    )
});

bot.hears('🛎️ What is Concierge Croccante', (ctx) => {
    console.log('User on chat', ctx.message.chat.id, 'request "what is" command');
    return ctx.reply('Concierge Croccante é una Skill per Amazon Alexa che svolge la funzione di segreteria. ' +
        'Essa invierá notifiche all\'interessato al memento di una visita da parte di una persona o di un corriere. ' +
        'Se vuoi saperne di piú visita questo link 👉🏻 https://github.com/peloo/concierge.croccante 👈🏻',
        Markup.keyboard([
            ['👤 Imposta profilo'],
            ['🛎️ What is Concierge Croccante'],
            ['🆘 Help']
        ])
            .oneTime()
            .resize()
            .extra()
    )
});

bot.hears('🆘 Help', (ctx) => {
    console.log('User on chat ', ctx.message.chat.id, 'request "help" command');
    return ctx.reply('Questo bot si occupa di fare da intermediario tra l\'utente e la Skill. ' +
        'Se vuoi saperne di piú visita questo link 👉🏻 https://github.com/peloo/concierge.croccante 👈🏻',
        Markup.keyboard([
            ['👤 Imposta profilo'],
            ['🛎️ What is Concierge Croccante'],
            ['🆘 Help']
        ])
            .oneTime()
            .resize()
            .extra()
    )
});

bot.hears('Annulla', (ctx) => {
    console.log('User on chat', ctx.message.chat.id, 'request "cancel" command');
    return ctx.reply('Operazione annullata',
        Markup.keyboard([
            ['👤 Imposta profilo'],
            ['🛎️ What is Concierge Croccante'],
            ['🆘 Help']
        ])
            .oneTime()
            .resize()
            .extra()
    )
});

bot.hears(/(.+)@(.+).(.+)/, (ctx) => {
    accountToSet = ctx.message.text;
    let text = 'Confermi di voler impostare il tuo account Concierge Croccante con la mail', account;
    console.log('User on chat', ctx.message.chat.id, 'want set this email', accountToSet);

    if (dialog === '/impostaprofilo') {
        text = 'Confermi l\'email ' + accountToSet + '?';
    }
    return ctx.reply(text,
        Markup.keyboard([
            ['🥓 Si'],
            ['🥦 No']
        ])
            .oneTime()
            .resize()
            .extra()
    )
});

bot.hears('🥓 Si', async (ctx) => {
    console.log('User on chat', ctx.message.chat.id, 'confirm email', accountToSet);
    //setTelegramChatId(ctx);

    let buttons;
    let text = '👉🏻❔ https://theuselessweb.com ❔👈🏻';
    try {
        const dbInstance = DynamoService.getInstance();
        if (await dbInstance.setTelegramChatId(accountToSet, ctx.message.chat.id)) {
            dialog = undefined;
            accountToSet = undefined;
            console.log('Bot set the email');
            text = 'Email impostata ✔️';
            buttons = [['👤 Imposta profilo'], ['🛎️ What is Concierge Croccante'], ['🆘 Help']];
        }
    }catch (error) {
        console.log('Bot error -', error);
        text = '👎🏻 Sicuro di aver inserito una mail non registrata a Concierge Croccante? Prova a digitare nuovamente.';
        buttons = [['Annulla']];
    }
    return ctx.reply(text,
        Markup.keyboard(buttons)
            .oneTime()
            .resize()
            .extra()
    )
});

bot.hears('🥦 No', (ctx) => {
    console.log('User on chat', ctx.message.chat.id, 'refused his email');
    return ctx.reply('Digita nuovamente l\'indirizzo email.️',
        Markup.keyboard([
            ['Annulla']
        ])
            .oneTime()
            .resize()
            .extra()
    )
});

bot.on('text', (ctx) => {
    console.log('User on chat', ctx.message.chat.id, 'send this message with text :', ctx.message.text);
    return ctx.reply('👉🏻 https://theuselessweb.com ❔')
});

exports.handler = async (event) => {
    console.log('Request: ' + JSON.stringify(event));
    await bot.handleUpdate(event);
    return {statusCode: 200, body: ''};
};
