import React from "react";

import { Header } from "../../components/header";
import { BoxGrid, YoutubeGallery } from "../../components/youtube";

export default function() {
    const [videos, setVideos] = React.useState([]);

    React.useEffect(() => {
        let isSubscribed = true;

        // Load videos from Youtube API
        loadVideos().then(videos => {
            if (isSubscribed) setVideos(videos);
        });

        return () => isSubscribed = false;
        // isSubscribed maneuver lets us cancel the promise
        // if the component unmounts before the results come in
    }, []);

    return (
        <div>
            <Header />
            <BoxGrid>
                <YoutubeGallery videos={videos} />
            </BoxGrid>
        </div>
    );
}

function loadVideos() {
    return new Promise((resolve, reject) => {
        gapi.client.youtube.search.list({
            "part": "snippet",
            "eventType": "live",
            "maxResults": 12,
            "q": "game",
            "type": "video"
        }).then(response => {
            const items = response.result.items;

            if(items) {
                resolve(items);
            } else {
                reject();
            }
        }).catch(error => {
            reject();
        });
    });
}