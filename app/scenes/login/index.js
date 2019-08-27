import React from "react";

import { Button } from "../../components/button";
import { Container } from "../../components/containers";
import { Card, Divider, Icon } from "../../components/cards";

// This scope is a set of permissions to request
// when the user logs in
const YOUTUBE_SCOPE = "https://www.googleapis.com/auth/youtube.readonly";

export default function() {
    const onLogin = React.useCallback(() => useAuth().signIn({
        scope: YOUTUBE_SCOPE
    }).then(() => {
        // Refresh after sign-in
        location.reload();
    }), []);
    
    return (
        <Container>
            <LoginCard onLogin={onLogin} />
        </Container>
    );
}

function LoginCard({onLogin}) {
    return (
        <Card narrow>
            <header>
                <Icon>📺</Icon>
                <h1>Talk TV</h1>
            </header>
            <Divider />
            <div>
                <Button primary wide onClick={onLogin}>LOG IN WITH GOOGLE</Button>
            </div>
        </Card>
    );
}

function useAuth() {
    return gapi.auth2.getAuthInstance();
}