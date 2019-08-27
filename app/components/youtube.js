import React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";
import Theme from "../theme";

import { Button } from "./button";
import { Loading } from "./loading";

export const BoxGrid = styled.ul`
    display: flex;
    flex-wrap: wrap;
    flex-flow: wrap-reverse;
    padding: 1rem;
`;

const Container = styled(Link)`
    max-width: 100%;
    flex: 1 0 280px;
    border-radius: ${props => Theme.baseRadius};
    margin: ${props => Theme.baseRadius};
    position: relative;
`;

const Details = styled.div`
    padding: 0.5rem; 
    flex: 0;
    justify-content: space-between;
    align-items: center;
    display: flex;
`;

const Title = styled.span`
    font-weight: bold;
`;

const Action = styled(Button)`
    flex: 0;
`;

const Thumbnail = styled.img`
    width: 100%;
    border-radius: ${props => Theme.baseRadius};
    border: ${props => `1px solid ${Theme.primary}33`};
`;

export function YoutubeThumbnail({id, thumbnail, title}) {
    return (
        <Container tabIndex="0" to={`/watch/${id}`}>
            <Thumbnail src={thumbnail.url} />
            <Details>
                <Title>{title}</Title>
                <Action inverted>WATCH</Action>
            </Details>
        </Container>
    )
}

export function YoutubeGallery({videos}) {
    const hasVideos = videos && videos.length;
    
    return hasVideos ? videos.map(video => (
        <YoutubeThumbnail
            id={video.id.videoId}
            thumbnail={video.snippet.thumbnails.medium}
            title={video.snippet.channelTitle}
        />
    )) : <Loading wide/>
}