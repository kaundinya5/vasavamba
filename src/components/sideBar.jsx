import React, { Component } from "react";
import "../styles/sideBar.css"
import Accordion from "react-bootstrap/Accordion"
import Card from "react-bootstrap/Card"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import Button from "react-bootstrap/Button"
class SideBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addedElements: []
    };
  }
  componentDidUpdate() {
    console.log(this.state)
  }
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
                  <Button onClick={() => this.setState({
                    addedElements: [...this.state.addedElements, "5-star"]
                  })}>5 Star</Button>
                  <Button>Snickers</Button>
                </ButtonGroup>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    );
  }
}
export default SideBar;
