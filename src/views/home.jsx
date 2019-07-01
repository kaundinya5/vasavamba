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
import { fetchDeletedItem } from "../actions/fetchDeletedItem";
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
    if (prevProps.selectedItems != this.props.selectedItems) {
      this.setState({
        selectedItems: this.props.selectedItems
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
      case "add":
        value["itemQuantity"] += 1;
        break;
      case "sub":
        if (value["itemQuantity"] == 0) break;
        value["itemQuantity"] -= 1;
        break;
      default:
        console.log("Wrong input");
        break;
    }
    this.setState({
      quantityChanged: "yes"
    });
  };

  deleteItem = value => {
    let selectedItems = [...this.state.selectedItems];
    this.setState(
      {
        selectedItems: selectedItems.filter(el => el !== value)
      },
      this.props.fetchDeletedItem(value)
    );
  };

  enterElementsToTable = () => {
    return this.state.selectedItems.map((value, index) => {
      return (
        <tr key={index}>
          <td key={index}>
            {value["itemName"]}
            <Button
              className={this.state.isPrinting ? "d-none" : "float-right"}
              variant="danger"
              onClick={() => this.deleteItem(value)}
            >
              Delete
            </Button>
          </td>
          <td className="text-center">
            <Button
              className={this.state.isPrinting ? "d-none" : null}
              variant="outline-dark"
              onClick={() => this.changeQuantity(value, "sub")}
            >
              -
            </Button>
            &nbsp;
            {value["itemQuantity"]}
            &nbsp;
            <Button
              className={this.state.isPrinting ? "d-none" : null}
              variant="outline-dark"
              onClick={() => this.changeQuantity(value, "add")}
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
        <Col md="2" className={this.state.isPrinting ? "d-none" : null}>
          <SideBar />
        </Col>
        <Col md={this.state.isPrinting ? "12" : "10"}>
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
  selectedItems: state.items.selectedItems
  // deletedItems: {
  //   name: state.deletedItem.itemName
  // }
});
export default connect(
  mapStateToProps,
  { fetchDeletedItem }
)(Home);
