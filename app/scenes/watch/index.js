import React from "react";
import useWebSocket from 'react-use-websocket';

import { Button } from "../../components/button";
import { Header } from "../../components/header";
import { Container, Section, SectionTitle } from "../../components/containers";
import { VideoFrame } from "../../components/youtube";
import { Messages, MessageList, MessageInput } from "../../components/messages";

const READY_STATES = [
    "Connecting to chat...",
    "Connected to chat",
    "Closing chat",
    "Chat disconnected. Refresh the page to reconnect."
];

const HTTP_URL = process.env.IS_OFFLINE ? (
    "http://localhost:3000"
) : (
    "https://3pxe3ksj6h.execute-api.us-west-2.amazonaws.com/dev"
);

const SOCKET_URL = process.env.IS_OFFLINE ? (
    "ws://localhost:3001"
) : (
    "wss://hkwdhszrwk.execute-api.us-west-2.amazonaws.com/dev"
);

export default function() {
    // example.com/watch/L6bD7whNHBk
    // returns L6bD7whNHBk
    const channelId = document.location.pathname.split('/').pop();

    const [messageHistory, setMessageHistory] = React.useState([]);
    React.useEffect(() => {
        let isSubscribed = true;

        // Load messages from server
        getMessageHistory(channelId).then(history => {
            if (isSubscribed) setMessageHistory(history);
        });

        return () => isSubscribed = false;
        // isSubscribed maneuver lets us cancel the promise
        // if the component unmounts before the results come in
    }, [channelId]);


    // Connect to socket server
    const [socketUrl, setSocketUrl] = React.useState(SOCKET_URL);
    const [sendMessage, lastMessage, readyState] = useWebSocket(socketUrl);
    // Add incoming messages to chatbox
    React.useEffect(() => {
        if(lastMessage && lastMessage.data) {
            const message = JSON.parse(lastMessage.data);

            if(message.ChannelId === channelId) {
                setMessageHistory(prev => prev.concat(message));
            }
        }
    }, [lastMessage]);

    const onSend = body => sendMessage(buildMessage(body, channelId));

    const connectionStatus = READY_STATES[readyState];
    const isDisconnected = readyState === 3;
    const triggerRefresh = React.useCallback(() => location.reload(), []);
    return (
        <div>
            <Header />
            <Container>
                <VideoFrame id={channelId} />
            </Container>
            <Container>
                <Section>
                    <SectionTitle>
                        {connectionStatus}
                        {isDisconnected 
                            ? <Button primary onClick={triggerRefresh}>REFRESH</Button> 
                            : null
                        }
                    </SectionTitle>
                    <MessageList>
                        <Messages messages={messageHistory} />
                    </MessageList>
                    <MessageInput onSend={onSend} />
                </Section>
            </Container>
        </div>
    );
}

function buildMessage(body, channelId) {
    const profile = useProfile();

    const message = JSON.stringify({
        MessageAuthor: profile.name,
        MessageBody: body,
        ChannelId: channelId,
        MessageId: new Date().getTime()
    });

    return message;
}

function useProfile() {
    const auth = gapi.auth2.getAuthInstance();
    const profile = auth.currentUser.get().getBasicProfile();

    return {
        id: profile.getId(),
        name: profile.getName()
    };
}

function getMessageHistory(channelId) {
    return fetch(`${HTTP_URL}/api/messages/${channelId}`)
    .then(response => response.json())
    .then(results => results.Items);
}