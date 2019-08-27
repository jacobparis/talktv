const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
    const dynamoDB = new AWS.DynamoDB.DocumentClient((process.env.IS_LOCAL || process.env.IS_OFFLINE) ? {
        region: "localhost",
        endpoint: `http://localhost:${process.env.PORT || 8000}`
    } : {});

    const id = event.requestContext.connectionId;

    console.log("👀  ", `Closed connection: ${id}`);

    const deleteParams = {
        TableName:`${process.env.PREFIX}-connections`,
        Key: {
            ConnectionId: id
        }
    };

    return dynamoDB.delete(deleteParams).promise();
};