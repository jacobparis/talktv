import React from "react";
import styled from "styled-components";
import Theme from "../theme";

import { Button } from "./button";

export const MessageList = styled.div`
    overflow-y: scroll;
    max-height: 30rem;
`;

const Message = styled.div`
    padding: 0.5rem;
`; 

const Author = styled.span`
    color: black;
    font-weight: bold;
    margin-inline-end: 1rem;
`;

const Body = styled.span`
    color: black;
    opacity: 0.64;
`; 

export function Messages({messages}) {
    return messages.length ? messages
    .filter(message => message.MessageBody)
    .map(message => (
        <Message>
            <Author>{message.MessageAuthor}:</Author>
            <Body>{message.MessageBody}</Body>
        </Message>
    )) : (
        <Message>
            <Body> Start a conversation! </Body>
        </Message>
    );
}

const InputContainer = styled.div`
    position: relative;
    margin-top: 2rem;
`;

const Input = styled.input`
    border: ${props => `1px solid ${Theme.primary}33`};
    border-radius: ${props => Theme.baseRadius};
    width: 100%;
    font-size: 1rem;
    box-sizing: border-box;
    padding: 1rem 8rem 1rem 1rem;
`; 

const SendButton = styled(Button)`
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 6rem;
    margin: 0;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
`;

export function MessageInput({onSend}) {
    const input = React.useRef();

    const sendMessage = React.useCallback(() => {
        onSend(input.current.value);

        input.current.value = "";
    }, [input]);

    const onEnter = e => {
        if (e.key === "Enter") {
            sendMessage();
        }
    }
    return (
        <InputContainer>
            <Input ref={input} onKeyPress={onEnter} placeholder="Write a message" />
            <SendButton primary onClick={sendMessage}>SEND</SendButton>
        </InputContainer>
    );
}
