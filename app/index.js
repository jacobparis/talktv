import "./index.scss";

import React from "react";
import ReactDOM from "react-dom";

import LoginScene from "./scenes/login";

function App() {
    const isSignedIn = false;

    return isSignedIn ? (
        <h1> 📺 Talk TV</h1>
    ) : <LoginScene />;
}

ReactDOM.render(<App />, document.getElementById("root"));