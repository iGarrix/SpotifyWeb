import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";

import { BrowserRouter } from "react-router-dom";
import { store } from "./Redux/store";
import { Provider } from "react-redux";

import { InitUser } from "./Redux/Reducers/UserReducer/actions";

const token = localStorage.getItem("token");
if (token !== null && token !== undefined) {
  if (token !== "") {
    InitUser(token, store.dispatch);
  }
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
