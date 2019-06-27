import React from "react";
import ReactToPrint from "react-to-print";
import "../styles/home.css";
// import FinalList from "./outputList"
import SideBar from "../components/sideBar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItems: [],
      quantityChanged: "no",
      isPrinting: null
    };
  }
  componentDidUpdate(prevProps) {
    console.log("Here");
    if (prevProps.item != this.props.item) {
      this.setState({
        selectedItems: [...this.state.selectedItems, this.props.item]
      });
    }
    if (this.state.isPrinting != null) {
      window.print();
      this.setState({
        isPrinting: null
      });
    }
  }

  changeQuantity = (value, operation) => {
    switch (operation) {
      case "+":
        value["quantity"] += 1;
      case "-":
        value["quantity"] += 1;
    }
    this.setState({
      quantityChanged: "yes"
    });
  };

  enterElementsToTable = () => {
    return this.state.selectedItems.map((value, index) => {
      // console.log(value);
      return (
        <tr key={index}>
          <td key={index}>{value["itemName"]}</td>
          <td className="text-center">
            <Button
              className={this.state.isPrinting ? "d-none" : null}
              variant="outline-dark"
              onClick={() => this.changeQuantity(value, "+")}
            >
              -
            </Button>
            &nbsp;
            {value["quantity"]}
            &nbsp;
            <Button
              className={this.state.isPrinting ? "d-none" : null}
              variant="outline-dark"
              onClick={() => this.changeQuantity(value, "-")}
            >
              +
            </Button>
          </td>
        </tr>
      );
    });
  };
  hideElements = () => {
    this.setState({
      isPrinting: "yes"
    });
  };
  showElements = () => {
    this.setState({
      isPrinting: null
    });
  };
  render() {
    return (
      <Row className="h-100">
        <Col md="2">
          <SideBar className={this.state.isPrinting ? "d-none" : null} />
        </Col>
        <Col md="10">
          {this.state.selectedItems && this.state.selectedItems.length > 0 ? (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th className="w-50">Item</th>
                  <th className="w-50">Quantity</th>
                </tr>
              </thead>
              <tbody>{this.enterElementsToTable()}</tbody>
            </Table>
          ) : (
            <p className="text-center">No items selected</p>
          )}
          <Button
            className={this.state.isPrinting ? "d-none" : null}
            variant="outline-dark"
            onClick={() => this.hideElements()}
          >
            Print
          </Button>
        </Col>
      </Row>
    );
  }
}
const mapStateToProps = state => ({
  item: {
    itemName: state.itemClicked.itemName,
    quantity: state.itemClicked.itemQuantity
  }
});
export default connect(mapStateToProps)(Home);
