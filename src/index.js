import React from "react";
import ReactDOM from "react-dom";
import "./css/index.scss";
import App from "./App";
import ThemeProvider from "./theme/ThemeProvider";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
