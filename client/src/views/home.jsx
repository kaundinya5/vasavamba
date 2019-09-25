import React from "react";
import "../styles/home.css";
// import FinalList from "./outputList"
import SideBar from "../components/sideBar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";
import { connect } from "react-redux";
import { fetchDeletedItem } from "../actions/fetchDeletedItem";
import { clearAllItems } from "../actions/clearAllItems";
import { fetchStoreItems } from "../actions/fetchStoreItems";
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItems: [],
      quantityChanged: "no",
      isPrinting: null,
      weightsTitle: {},
      unitsTitle: {}
    };
  }
  componentDidUpdate(prevProps) {
    if (prevProps.selectedItems !== this.props.selectedItems) {
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
        if (value["itemQuantity"] === 0) break;
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

  changeWeightOrUnitTitle = (item, weight, itemType, custom = null) => {
    if (itemType == "weight") {
      if (custom !== null) {
        let numbers = /^[0-9]*$/;
        if (numbers.test(weight) === false) {
          this.setState({
            weightsTitle: {
              ...this.state.weightsTitle,
              [item]: false
            }
          });
        } else {
          this.setState({
            weightsTitle: {
              ...this.state.weightsTitle,
              [item]: weight
            }
          });
        }
      } else {
        this.setState({
          weightsTitle: {
            ...this.state.weightsTitle,
            [item["itemName"]]: weight
          }
        });
      }
    } else {
      this.setState({
        unitsTitle: {
          ...this.state.unitsTitle,
          [item["itemName"]]: weight
        }
      });
    }
  };

  addWeightsAndUnits = (item, itemType) => {
    if (itemType == "weights") {
      return item["itemWeights"].map((weight, index) => {
        return (
          <Dropdown.Item
            as="button"
            onClick={() => this.changeWeightOrUnitTitle(item, weight, "weight")}
          >
            {weight}
          </Dropdown.Item>
        );
      });
    } else {
      return item["itemUnits"].map((unit, index) => {
        return (
          <Dropdown.Item
            as="button"
            onClick={() => this.changeWeightOrUnitTitle(item, unit, "unit")}
          >
            {unit}
          </Dropdown.Item>
        );
      });
    }
  };

  customWeight = e => {
    if (e.charCode == 13) {
      this.changeWeightOrUnitTitle(e.target.id, e.target.value, "weight", true);
    }
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
          <td>
            <DropdownButton
              id="dropdown-basic-button"
              title={
                this.state.weightsTitle[value["itemName"]] &&
                this.state.weightsTitle[value["itemName"]] !== false
                  ? this.state.weightsTitle[value["itemName"]]
                  : "Weights"
              }
            >
              <Overlay
                target={this.refs[value["itemName"]]}
                show={
                  this.state.weightsTitle[value["itemName"]] == false
                    ? true
                    : false
                }
                placement="bottom"
              >
                {props => (
                  <Tooltip id={value["itemName"] + "_overlay"} {...props}>
                    Please enter only numbers
                  </Tooltip>
                )}
              </Overlay>
              {this.addWeightsAndUnits(value, "weights")}
              <InputGroup size="sm" className="mb-3">
                <FormControl
                  placeholder="Enter Weight"
                  ref={value["itemName"]}
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  id={value["itemName"]}
                  onKeyPress={this.customWeight}
                />
              </InputGroup>
            </DropdownButton>
          </td>
          <td>
            <DropdownButton
              id="dropdown-basic-button"
              title={
                this.state.unitsTitle[value["itemName"]] &&
                this.state.unitsTitle[value["itemName"]] !== false
                  ? this.state.unitsTitle[value["itemName"]]
                  : "Units"
              }
            >
              {this.addWeightsAndUnits(value, "units")}
            </DropdownButton>
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

  clearAllItems = () => {
    this.props.clearAllItems();
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
                  <th className="w-25">Item</th>
                  <th className="w-25">Weight</th>
                  <th className="w-25">Units</th>
                  <th className="w-25">Quantity</th>
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
          <Button
            className={this.state.isPrinting ? "d-none" : null}
            variant="danger"
            onClick={() => this.clearAllItems()}
          >
            Clear all
          </Button>
        </Col>
      </Row>
    );
  }
}
const mapStateToProps = state => ({
  selectedItems: state.items.selectedItems,
  storeItems: state.items.storeItems
});
export default connect(
  mapStateToProps,
  { fetchDeletedItem, clearAllItems, fetchStoreItems }
)(Home);
