import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import CryptoContext from "./APIs/CryptoContext";
import { Provider } from "react-redux";
import {store} from "./app/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* Allows currency and symbol to be used anywhere in app */}
    <Provider store ={store}>
      <CryptoContext>
        <App />
      </CryptoContext>
    </Provider>
  </React.StrictMode>
);
