import React from "react";

import { Header } from "../../components/header";
import { Container, Section, SectionTitle } from "../../components/containers";
import { VideoFrame } from "../../components/youtube";

export default function() {
    const channelId = document.location.pathname.split('/').pop();

    const profile = useProfile();

    return (
        <div>
            <Header />
            <Container>
                <VideoFrame id={channelId} />
            </Container>
            <Container>
                <Section>
                    <SectionTitle>Join the conversation, {profile.name}!</SectionTitle>
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