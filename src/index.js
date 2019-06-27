import React from "react";
import ReactDOM from "react-dom";
import Main from "./views/main";
import store from "./store/";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Route path="/" component={Main} />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
