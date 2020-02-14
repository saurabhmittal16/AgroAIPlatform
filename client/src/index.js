import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";

import App from "./components/App";
import setAuthHeader from "./utils/setAuthHeaders";

import "./styles/main.scss";
import "./i18n";

let token = localStorage.getItem("token");
setAuthHeader(token);

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
