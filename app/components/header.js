import React from 'react';
import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    justify-content: center;
    position: relative;
`;

export const HeaderText = styled.h1`
    margin: 0.25rem 0;
`;

export function Header() {
    return (
        <Container>
            <HeaderText> 📺 Talk TV </HeaderText>
        </Container>
    )
}
