import React, { Component } from "react";
import { Route } from "react-router-dom";
import Header from "../components/header";
import Home from "./home";
class Main extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Route exact path="/" component={Home} />
      </React.Fragment>
    );
  }
}
export default Main;
