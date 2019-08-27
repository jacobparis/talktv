const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
    const id = event.requestContext.connectionId;

    console.log("👀  ", `Closed connection: ${id}`);
};