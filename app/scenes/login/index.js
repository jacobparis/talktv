import React from "react";

import { Container } from "../../components/containers";
import { Card, Divider, Icon } from "../../components/cards";

export default function() {

    return (
        <Container>
            <LoginCard />
        </Container>
    );
}

function LoginCard() {
    return (
        <Card narrow>
            <header>
                <Icon>📺</Icon>
                <h1>Talk TV</h1>
            </header>
            <Divider />
            <div>
                PLEASE LOG IN
            </div>
        </Card>
    );
}