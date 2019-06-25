import React from "react";
import "./app.css";

class FinalList extends React.Component {
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
      <div>
        <ul>
          {this.props.elements.map((item,idx) =>
          (
            <div key={idx}>
              <li>
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
