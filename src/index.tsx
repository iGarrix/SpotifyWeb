import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";

import { BrowserRouter } from "react-router-dom";
import { store } from "./Redux/store";
import { Provider } from "react-redux";

import { InitUser } from "./Redux/Reducers/UserReducer/actions";
import setupInterceptors from "./setupInterceptors";
import { StorageVariables, Theme } from "./types";
import { initTheme } from "./Redux/Reducers/GlobalReducer/action";

const theme = localStorage.getItem(StorageVariables.Theme);
if (theme === null || theme === undefined) {
  localStorage.setItem(StorageVariables.Theme, Theme.light);
}
else {
  initTheme(theme, store.dispatch);
}

const lang = localStorage.getItem(StorageVariables.Language);
if (lang === null || lang === undefined) {
  localStorage.setItem(StorageVariables.Language, "English");
}
const volume = localStorage.getItem(StorageVariables.Volume);
if (!volume) {
  localStorage.setItem(StorageVariables.Volume, "100");
}

setupInterceptors();
InitUser(store.dispatch);

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
