import React from "react";
import useWebSocket from 'react-use-websocket';

import { Header } from "../../components/header";
import { Container, Section, SectionTitle } from "../../components/containers";
import { VideoFrame } from "../../components/youtube";
import { MessageInput } from "../../components/messages";

const READY_STATES = [
    "Connecting to chat...",
    "Connected to chat",
    "Closing chat",
    "Chat disconnected. Refresh the page to reconnect."
];

const SOCKET_URL = process.env.IS_OFFLINE ? (
    "ws://localhost:3001"
) : (
    "wss://hkwdhszrwk.execute-api.us-west-2.amazonaws.com/dev"
);

export default function() {
    const channelId = document.location.pathname.split('/').pop();

    const [socketUrl, setSocketUrl] = React.useState(SOCKET_URL);
    const [sendMessage, lastMessage, readyState] = useWebSocket(socketUrl);

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
                    <MessageInput />
                </Section>
            </Container>
        </div>
    );
}

function useProfile() {
    const auth = gapi.auth2.getAuthInstance();
    const profile = auth.currentUser.get().getBasicProfile();

    return {
        id: profile.getId(),
        name: profile.getName()
    };
}