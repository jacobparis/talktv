const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
    const dynamoDB = new AWS.DynamoDB.DocumentClient((process.env.IS_LOCAL || process.env.IS_OFFLINE) ? {
        region: "localhost",
        endpoint: `http://localhost:${process.env.PORT || 8000}`
    } : {});

    const scanParams = {
        TableName:`${process.env.PREFIX}-connections`
    };

    const connections = await dynamoDB.scan(scanParams).promise();

    const endpoint = (process.env.IS_LOCAL || process.env.IS_OFFLINE) ? (
        `http://localhost:3001`
    ) : (
        `https://hkwdhszrwk.execute-api.us-west-2.amazonaws.com/dev`
    );

    console.log(endpoint);
    const socketApi = new AWS.ApiGatewayManagementApi({endpoint});

    const Data = event.body;

    console.log(Data);
    const messagePromises = connections.Items.map(({ConnectionId}) => (
        socketApi
        .postToConnection({ConnectionId, Data})
        .promise()
        .catch((error) => (error.statusCode === 410) && deleteConnection(ConnectionId))
    ));

    return Promise.all(messagePromises);

    function deleteConnection(id) {
        console.log("🛀  ", `Cleaning old connection ${id}`);

        const deleteParams = {
            TableName:`${process.env.PREFIX}-connections`,
            Key: {
                ConnectionId: id
            }
        };

        return dynamoDB.delete(deleteParams).promise();
    }

};