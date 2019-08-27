import React from "react";

import { Header } from "../../components/header";

export default function() {

    React.useEffect(() => {
        let isSubscribed = true;

        getVideos().then(videos => {
            if (isSubscribed) {
                console.log(videos);
            }
        });

        return () => isSubscribed = false;
    }, []);

    return (
        <div>
            <Header />
            <h1> Welcome home, logged in user!</h1>
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