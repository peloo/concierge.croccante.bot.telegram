function getParamSetTelegramId(email, chatId) {
    const notification = {
        'Service': 'telegram',
        'ChatId': chatId
    };
    return {
        TableName: 'AccountConcierge',
        Key: {
            'Email': email
        },
        UpdateExpression: 'set Notification = :not',
        ConditionExpression: 'Email = :email',
        ExpressionAttributeValues: {
            ':not': notification,
            ':email': email
        },
        ReturnValues: 'UPDATED_NEW'
    };
}

module.exports.getParamSetTelegramId = getParamSetTelegramId;