# Introduction
Bot Telegram per Skill Concierge Croccante. <br/>
Questa repository contiene il progetto di un Bot per Telegram realizzato in Node.js. Tale Bot funge da intermediario per inviare notifiche dalla Skill all'utente. Durante l'utilizzo del Bot sarà possibile impostare il proprio profilo Telegram per garantire l'arrivo dei messaggi.
> English: This repository contain the Telegram Bot project realized in Node.js. This Bot send the message notification from Skill to user. When the user use the Bot it will possible to set the Telegram profile to garantee to recieve the messages.

### This project run on
AWS Lambda **λ**

### Programming laguages used
* [NodeJS]

### Amazon Web Services used
* [Lambda]
* [API Gateway]
* [IAM]
* [DynamoDB]
* [CloudWatch]

### Package node used
* telegraf <br/> [![NPM Version](https://img.shields.io/npm/v/telegraf.svg?style=flat-square)](https://www.npmjs.com/package/telegraf)
```
$ npm install telegraf
```
* aws-sdk <br/> [![NPM version](https://img.shields.io/npm/v/aws-sdk.svg)](https://www.npmjs.com/package/aws-sdk)
```
$ npm install aws-sdk
```

## How to install this bot
Per l'installazione del Bot è necessario seguire i seguenti passi. <br/>
Per un ulteriore guida nella configurazione dei servizi AWS recarsi al seguente link: https://bit.ly/2u2Oehg :+1:
### Lambda **λ**
Il primo passo è quello di creare la lambda function. Fare il login su AWS Console e scegliere il servizio Lambda. Cliccare in alto a destra "Crea funzione", successivamente impostare la cerazione con i seguenti parametri:
* Crea da zero"
* \<function-name>
* Node.js 12.x

### API-Geteway
Il secondo passo è quello di creare l'API che andrà ad invocare la lambda function. Fare il login su AWS Console e scegliere il servizio API Gateway. 
* Cliccare in alto il tasto "Crea API". 
* Selezionare come tipo di API "API Rest".
    * Selezionare "REST"
    * Selezionare "Nuova API"
    * \<api-name>
    * Selezionare tipo di endpoint "Regionale"
    * Infine cliccare sul tasto "Crea API"  
* Cliccare sul tasto "Operazioni" 
    * Scegliere "Crea metodo"
    * "ANY" e confermare
    * Su tipo di integrazione selezionare "Funzione Lambda"
    * Su regione lambda selezionare la regione dove risiede la lambda creata prima
    * Su funzione lambda digitare il nome della lambda creata

### IAM Policy
Come ruolo di esecuzione della lambda function creata prima inserire questo JSON nelle sue regole: 
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "dynamodb:BatchGetItem",
                "dynamodb:GetItem",
                "dynamodb:Query",
                "dynamodb:Scan",
                "dynamodb:BatchWriteItem",
                "dynamodb:PutItem",
                "dynamodb:UpdateItem"
            ],
            "Resource": "*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "autoscaling:Describe*",
                "cloudwatch:*",
                "logs:*",
                "sns:*"
            ],
            "Resource": "*"
        }
    ]
}
```
### Telegram
Ora è necessario collegare il nostro Bot all'endpoint dove risiede il nostro codice. Per farlo basterà aprire il terminale ed inserire il seguente comando:
```
$ curl -F url="<your-API-invoke-URL>" https://api.telegram.org/bot<your-bot-token>/setWebhook
```
oppure dal proprio browser inserire il seguente URL nella barra degli indirizzi:
```
https://api.telegram.org/bot<your-bot-token>/setWebHook?url=<your-API-invoke-URL>
```
Fonti utili: https://core.telegram.org/bots/webhooks#how-do-i-set-a-webhook-for-either-type
