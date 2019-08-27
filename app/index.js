import "./index.scss";

import React from "react";
import ReactDOM from "react-dom";

import LoginScene from "./scenes/login";

const CLIENT_ID = process.env.CLIENT_ID;
const API_KEY = process.env.API_KEY;
const YOUTUBE_DISCOVERY_URI = "https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest";

function App() {
    const isSignedIn = false;

    return isSignedIn ? (
        <h1> 📺 Talk TV</h1>
    ) : <LoginScene />;
}

ReactDOM.render(<App />, document.getElementById("root"));