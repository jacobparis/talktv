# 📺 Talk TV

Watch youtube live streams and chat with other viewers — built on React, Google Auth, with a Serverless Lambda backend

# Demo

View it live here: https://friendly-dubinsky-0827d0.netlify.com/

# Stack

The front-end is built on some pretty minimal React with Styled Components. I split into three scenes: Login, Home, and Watch. Since the router checks login status, I just trigger a refresh after logging in or out and the user ends up in the correct scene.

The Home scene polls the youtube API for 12 live streams under the query `game`. Clicking on one moves to the Watch scene for dedicated viewing and chatting

The chat pulls old messages from the database on first load, and receives active messages directly through the websocket while viewing a stream.

The backend is built in serverless node hosted on AWS. The infrastructure is modelled in my `serverless.yml` file and the functions themselves are under `/api/`. This is much quicker and easier to set up than a Node/Express server, especially for such a simple project. 

Official backend stack is CloudFormation for infrastructure modelling and stack management, API Gateway for the REST and Websocket servers, Lambda for application logic, and DynamoDB to store socket connection IDs and chat messages

The site is hosted on Netlify because it's free and impossibly easy to use

Development was all done locally, with serverless-offline to simulate my backend functions and DynamoDB key-value store

Webpack config file was borrowed from https://github.com/JacobParis/jacobparis-boilerplate

React Button component was borrowed from a private project of mine

# Resources

Google Auth
 - https://developers.google.com/identity/protocols/OAuth2

Google API Console
 - https://console.developers.google.com/apis/dashboard