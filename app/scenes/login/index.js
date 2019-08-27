import React from "react";

import { Button } from "../../components/button";
import { Container } from "../../components/containers";
import { Card, Divider, Icon } from "../../components/cards";

export default function() {
    const onLogin = React.useCallback(() => useAuth().signIn(), []);

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
                <Button primary wide onClick={onLogin}>LOG IN</Button>
            </div>
        </Card>
    );
}

function useAuth() {
    return gapi.auth2.getAuthInstance();
}