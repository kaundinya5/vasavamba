import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import "../styles/monitor.css";

class Header extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="navBg navText">
          <h6 className="text-center pt-3  fs-large">
            Monitoring Intelligence: Executive Dashboard
          </h6>
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
                MONITOR
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to="/analyze" className="nav-link">
                ANALYZE
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to="/assess" className="nav-link">
                ASSESS
              </NavLink>
            </Nav.Item>

            <Nav.Item>
              <NavLink to="/map" className="nav-link">
                MAP
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to="/orchestrate" className="nav-link">
                ORCHESTRATE
              </NavLink>
            </Nav.Item>
          </Nav>
        </div>
      </React.Fragment>
    );
  }
}
export default Header;
