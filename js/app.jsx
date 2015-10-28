import React from "react";
import ReactDOM from "react-dom";

const App = require("./components/App");

// When the window is loaded, render the App component.
window.onload = () => {
  ReactDOM.render(<App/>,document.querySelector("#root"));
}