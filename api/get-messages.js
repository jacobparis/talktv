const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
    const dynamoDB = new AWS.DynamoDB.DocumentClient((process.env.IS_LOCAL || process.env.IS_OFFLINE) ? {
        region: "localhost",
        endpoint: `http://localhost:${process.env.PORT || 8000}`
    } : {});

    const channelId = event.pathParameters.channel;

    const scanParams = {
        TableName:`${process.env.PREFIX}-messages`,
        KeyConditionExpression: "ChannelId = :channel",
        ExpressionAttributeValues: {
            ":channel": channelId
        }
    };

    return dynamoDB.query(scanParams).promise()
    .then(results => ({
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(results)
    }))
    .catch(error => ({
        statusCode: 500,
        headers: {
            "Access-Control-Allow-Origin": "*",
            'Content-Type': 'text/plain'
        },
        body: error
    }));
};