import React, { Component } from "react";
import "../styles/sideBar.css";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import { fetchClickedItem } from "../actions/fetchClickedItem";
class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonsClicked: {}
    };
  }
  handleClick = item => {
    console.log(this.state);
    this.setState({
      buttonsClicked: { ...this.state.buttonsClicked, [item]: true }
    });
    this.props.fetchClickedItem(item);
  };
  render() {
    return (
      <div className={this.props.className + " grey h-100"}>
        <Accordion>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0">
              Dry Fruits
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <ListGroup>
                <ListGroup.Item variant="dark">Cashews</ListGroup.Item>
                <ListGroup.Item variant="dark">Grapes</ListGroup.Item>
              </ListGroup>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="1">
              Chocolates
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              <ListGroup>
                <ListGroup.Item
                  disabled={this.state["buttonsClicked"]["5-star"]}
                  variant="dark"
                  onClick={() => this.handleClick("5-star")}
                >
                  5 Star
                </ListGroup.Item>
                <ListGroup.Item
                  disabled={this.state["buttonsClicked"]["Snickers"]}
                  variant="dark"
                  onClick={() => this.handleClick("Snickers")}
                >
                  Snickers
                </ListGroup.Item>
              </ListGroup>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  item: {
    selectedItem: state.itemClicked.itemName,
    quantity: state.itemClicked.itemQuantity
  }
});

export default connect(
  mapStateToProps,
  { fetchClickedItem }
)(SideBar);
