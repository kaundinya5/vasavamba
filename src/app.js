import React from "react";
import "./app.css";
import Accordion from "./inputList";
import AddedList from "./outputList";
// import FinalList from "./outputList"

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
      <div>
        <button className="closeButton" onClick={this.closeInput}>
          {" "}
          Close{" "}
        </button>
        <div className={this.state.isInputClosed ? "FinalOpen" : "FinalClose"}>
          <ul>
            {this.state.addedElements.map((item, idx) => (
              <div key={idx}>
                <li>{<p>{item}</p>}</li>
                <input />
                <p> {this.state.units[idx]} </p>
              </div>
            ))}
          </ul>
        </div>
        <div className="App">
          <Accordion
            handleClick={handleClick}
            closed={this.state.isInputClosed}
          />
          <AddedList
            elements={this.state.addedElements}
            units={this.state.units}
            closed={this.state.isInputClosed}
          />
        </div>
      </div>
    );
  }
}

export default App;
