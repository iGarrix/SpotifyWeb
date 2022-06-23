import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";

import { BrowserRouter } from "react-router-dom";
import { store } from "./Redux/store";
import { Provider } from "react-redux";

import { InitUser } from "./Redux/Reducers/UserReducer/actions";
import setupInterceptors from "./setupInterceptors";
import { StorageVariables } from "./types";

const theme = localStorage.getItem("theme");
if (theme === null || theme === undefined) {
  localStorage.setItem("theme", "light");
}
const volume = localStorage.getItem(StorageVariables.Volume);
if (!volume) {
  localStorage.setItem(StorageVariables.Volume, "100");
}

setupInterceptors();
InitUser(store.dispatch);

// const notifications = localStorage.getItem("notifications");
// if (notifications) {
  
// }
// else {
//   localStorage.setItem("notifications", "5");
// }

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
