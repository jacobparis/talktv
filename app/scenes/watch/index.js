import React from "react";

import { Header } from "../../components/header";
import { Container, Section, SectionTitle } from "../../components/containers";
import { VideoFrame } from "../../components/youtube";

export default function() {
    const channelId = document.location.pathname.split('/').pop();

    return (
        <div>
            <Header />
            <Container>
                <VideoFrame id={channelId} />
            </Container>
            <Container>
                <Section>
                    <SectionTitle>Join the conversation!</SectionTitle>
                </Section>
            </Container>
        </div>
    );
}