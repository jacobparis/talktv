const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
    const dynamoDB = new AWS.DynamoDB.DocumentClient((process.env.IS_LOCAL || process.env.IS_OFFLINE) ? {
        region: "localhost",
        endpoint: `http://localhost:${process.env.PORT || 8000}`
    } : {});

    const id = event.requestContext.connectionId;

    console.log("👀  ", `Opened connection: ${id}`);

    const openParams = {
        TableName:`${process.env.PREFIX}-connections`,
        Item: {
            ConnectionId: id
        }
    }

    return dynamoDB.put(openParams).promise();
};