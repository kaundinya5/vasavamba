import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import "../styles/main.css";

class Header extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="navBg navText">
          <h6 className="text-center pt-3  fs-large">Vasavamba Stores</h6>
          <Nav
            variant="pills"
            className="justify-content-center custom-pills font-weight-normal"
          >
            <Nav.Item>
              <NavLink
                exact
                activeClassName="active"
                to="/"
                className="nav-link"
              >
                Home
              </NavLink>
            </Nav.Item>
          </Nav>
        </div>
      </React.Fragment>
    );
  }
}
export default Header;
