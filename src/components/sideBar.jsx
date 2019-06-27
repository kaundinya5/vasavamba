import React, { Component } from "react";
import "../styles/sideBar.css";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import { fetchClickedItem } from "../actions/fetchClickedItem";
class SideBar extends Component {
  constructor(props) {
    super(props);
  }
  handleClick = item => {
    this.props.fetchClickedItem(item);
  };
  render() {
    return (
      <div className="grey h-100">
        <Accordion>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0">
              Dry Fruits
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <ButtonGroup vertical>
                  <Button>Cashews</Button>
                  <Button>Grapes</Button>
                </ButtonGroup>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="1">
              Chocolates
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                <ButtonGroup vertical>
                  <Button onClick={() => this.handleClick("5-star")}>
                    5 Star
                  </Button>
                  <Button onClick={() => this.handleClick("Snickers")}>
                    Snickers
                  </Button>
                </ButtonGroup>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  itemClicked: state.itemClicked.clickedItem
});

export default connect(
  mapStateToProps,
  { fetchClickedItem }
)(SideBar);
