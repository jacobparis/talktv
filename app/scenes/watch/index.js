import React from "react";
import useWebSocket from 'react-use-websocket';

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
    const channelId = document.location.pathname.split('/').pop();

    const [messageHistory, setMessageHistory] = React.useState([]);
    React.useEffect(() => {
        let isSubscribed = true;

        getMessageHistory(channelId).then(history => {
            if (isSubscribed) setMessageHistory(history);
        });

        return () => isSubscribed = false;
    }, [channelId]);

    const [socketUrl, setSocketUrl] = React.useState(SOCKET_URL);
    const [sendMessage, lastMessage, readyState] = useWebSocket(socketUrl);
    React.useEffect(() => {
        if(lastMessage && lastMessage.data) {
            console.log(lastMessage);
            setMessageHistory(prev => prev.concat(JSON.parse(lastMessage.data)));
        }
    }, [lastMessage]);

    const onSend = body => sendMessage(buildMessage(body, channelId));

    const connectionStatus = READY_STATES[readyState];
    
    return (
        <div>
            <Header />
            <Container>
                <VideoFrame id={channelId} />
            </Container>
            <Container>
                <Section>
                    <SectionTitle>{connectionStatus}</SectionTitle>
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