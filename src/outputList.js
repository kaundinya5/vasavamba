import React from "react";
import "./app.css";

class AddedList extends React.Component {
  state = {
    elements: []
  };

  // handleChange = i => {
  //   if (i === this.state.currentIndex) {
  //     this.setState({
  //       currentIndex: -1
  //     });
  //   } else {
  //     this.setState({
  //       currentIndex: i
  //     });
  //   }
  // };

  render() {

    return (
      <div className={this.props.closed ? "closeInputs" : "narrowOutputs"}>
        <ul>
          {this.props.elements.map((item,idx) =>
          (
            <div key={idx}>
              <li className="finallist">
                {<p>{item}</p>}
                </li>
              <input />
              <p> {this.props.units[idx]} </p>
            </div>
          ))}
        </ul>
      </div>
    );
  }
}

export default AddedList;
