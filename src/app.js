import React from "react";
import "./app.css";
import Accordion from "./inputList";
import AddedList from "./outputList";
// import FinalList from "./outputList"
import SideBar from "./components/sideBar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      addedElements: [],
      units: [],
      isInputClosed: false
    };
    this.closeInput = this.closeInput.bind(this);
  }

  handleClick = (i, un) => {
    var elements = this.state.addedElements.slice();
    var units = this.state.units.slice();
    if (elements.indexOf(i)) {
      elements = [...elements, i];
      units = [...units, un];
      this.setState({ addedElements: elements });
      this.setState({ units: units });
    }
  };

  closeInput() {
    var closed = this.state.isInputClosed;
    this.setState({ isInputClosed: !closed });
  }

  render() {
    const { handleClick } = this;
    return (
      <Row>
        <Col xs lg md="4">
          <SideBar />
        </Col>
        <Col xs lg md="8">
          Testing
        </Col>
      </Row>
    );
  }
}

export default App;
