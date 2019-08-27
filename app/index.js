import "./index.scss";

import React from "react";
import ReactDOM from "react-dom";

import LoginScene from "./scenes/login";

const CLIENT_ID = process.env.CLIENT_ID;
const API_KEY = process.env.API_KEY;
const YOUTUBE_DISCOVERY_URI = "https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest";

function App() {
    const isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get();

    return isSignedIn ? (
        <h1> 📺 Talk TV</h1>
    ) : <LoginScene />;
}

function AppContainer() {
    const wasGoogleReady = !!gapi.auth2;
    const [isGoogleReady, setGoogleReady] = React.useState(wasGoogleReady);

    React.useEffect(() =>{
        gapi.load('client:auth2', () => {
            const authPromise = gapi.auth2.init({
                clientId: CLIENT_ID,
            });
            
            gapi.client.setApiKey(API_KEY);
            const youtubePromise = gapi.client.load(YOUTUBE_DISCOVERY_URI);
            
            Promise.all([authPromise, youtubePromise]).then(() => setGoogleReady(true));
        })
    }, [isGoogleReady]);
    
    return isGoogleReady ? <App /> : <div>Loading...</div>;
}


ReactDOM.render(<AppContainer />, document.getElementById("root"));