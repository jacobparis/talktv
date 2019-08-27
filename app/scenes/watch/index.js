import React from "react";

import { Header } from "../../components/header";
import { Container } from "../../components/containers";
import { VideoFrame } from "../../components/youtube";

export default function() {
    const channelId = document.location.pathname.split('/').pop();

    return (
        <div>
            <Header />
            <Container>
                <VideoFrame id={channelId} />
            </Container>
        </div>
    );
}