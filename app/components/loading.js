import React from "react";
import { Container } from "./containers";
import Loader from "react-loader-spinner";
import Theme from "../theme";

export function Loading({wide}) {
    return (
        <Container wide={wide}>
            <Loader
                type="Bars"
                color={Theme.primary}
                height={100}
                width={100}
            />
        </Container>
    )
}