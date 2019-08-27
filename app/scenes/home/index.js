import React from "react";

import { Header } from "../../components/header";
import { BoxGrid, YoutubeGallery } from "../../components/youtube";

export default function() {
    const [videos, setVideos] = React.useState([]);

    React.useEffect(() => {
        let isSubscribed = true;

        getVideos().then(videos => {
            if (isSubscribed) setVideos(videos);
        });

        return () => isSubscribed = false;
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

function getVideos() {
    return new Promise((resolve, reject) => {
        gapi.client.youtube.search.list({
            "part": "snippet",
            "eventType": "live",
            "maxResults": 12,
            "q": "game",
            "type": "video"
        }).then(response => {
            console.log("GET VIDEOS", response);
            const items = response.result.items;

            if(items) {
                resolve(items);
            } else {
                reject();
            }
        }).catch(error => {
            console.log("ERROR VIDEOS", error);
            reject();
        });
    });
}