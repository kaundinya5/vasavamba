import React, { Component } from "react";
import { Route } from "react-router-dom";
import Header from "../components/header";
import App from "../app";
class Main extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Route exact path="/" component={App} />
      </React.Fragment>
    );
  }
}
export default Main;
