import React from "react";
import ReactDOM from "react-dom";
import Main from "./views/main";
import { BrowserRouter, Route } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <Route path="/" component={Main} />
  </BrowserRouter>,
  document.getElementById("root")
);
