import React from "react";
import qa from "./qa";
import List from "./list";
import "./app.css";

class Accordion extends React.Component {
  state = {
    currentIndex: -1
  };

  handleChange = i => {
    if (i === this.state.currentIndex) {
      this.setState({
        currentIndex: -1
      });
    } else {
      this.setState({
        currentIndex: i
      });
    }
  };

  render() {
    const { handleChange } = this;
    const { currentIndex } = this.state;

    return (
      <div className={this.props.closed ? "closeInputs" : "openInputs"}>
        {qa.map((e, i) => (
          <List
            question={e.question}
            answer={e.answer}
            units={e.units}
            handleChange={handleChange}
            key={i}
            index={i}
            currentIndex={currentIndex}
            handleClick={this.props.handleClick}
          />
        ))}
      </div>
    );
  }
}

export default Accordion;
