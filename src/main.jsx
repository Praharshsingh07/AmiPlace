import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import amiPlaceStore from "./store/AmiPlaceStore";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={amiPlaceStore}>
      <App />
    </Provider>
  </React.StrictMode>
);
