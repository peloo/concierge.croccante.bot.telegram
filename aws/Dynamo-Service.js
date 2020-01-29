const AWS = require('aws-sdk');
const dynamoQueryGeneratorService = require('../aws/DynamoQueryGenerator-Service');
let dbInstance;

class DynamoService {
    constructor() {
        AWS.config.update({
            region: 'eu-west-1',
            endpoint: 'https://dynamodb.eu-west-1.amazonaws.com'
        });
        this.docClient = new AWS.DynamoDB.DocumentClient();
    }

    static getInstance() {
        if (dbInstance === undefined) {
            dbInstance = new DynamoService();
        }
        return dbInstance;
    }

    setTelegramChatId(email, chatId) {
        const params = dynamoQueryGeneratorService.getParamSetTelegramId(email, chatId);
        return new Promise((resolve, reject) => {
            this.docClient.update(params, function (err, data) {
                if (err) {
                    console.log('\x1b[31m' + err + '\x1b[0m');
                    reject(false);
                } else {
                    console.log('\x1b[32m' + 'email set' + '\x1b[0m');
                    resolve(true);
                }
            })
        });
    }
}

module.exports = DynamoService;