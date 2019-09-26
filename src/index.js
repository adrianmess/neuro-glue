import React from "react";
import { render } from "react-dom";
import "./index.css";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";

import reducer from "./reducers";
import { createStore } from "redux";

const initialState = { redux: "this is redux initialState" };
const store = createStore(reducer, initialState);

render(
  // <Provider store={store}>
  <App store={store.getState().redux} />,
  // </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
