import React, { Component } from "react";
import "../styles/sideBar.css";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Dropdown from "react-bootstrap/Dropdown";
import { connect } from "react-redux";
import { fetchClickedItem } from "../actions/fetchClickedItem";
import { fetchStoreItems } from "../actions/fetchStoreItems";
class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonsClicked: [],
      storeItems: null
    };
  }

  componentWillMount() {
    this.props.fetchStoreItems();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.storeItems !== this.props.storeItems &&
      this.props.storeItems
    ) {
      this.setState({
        storeItems: this.props.storeItems
      });
    }
  }

  handleClick = value => {
    this.props.fetchClickedItem(value);
  };

  populateSubCategory = (key, subCategoryObject) => {
    return subCategoryObject[key].map((value, _) => {
      return (
        <Dropdown.Item
          disabled={
            this.props.selectedItems.filter(e => e.itemName === value.item)
              .length > 0
              ? true
              : false
          }
          onClick={() => this.handleClick(value)}
        >
          {value.item}
        </Dropdown.Item>
      );
    });
  };

  populateAccordian = (storeItems, value) => {
    var subCategoryObject = {};
    storeItems[value].map((value, index) => {
      var subCategory = value["item"].split("(")[0];
      if (subCategoryObject.hasOwnProperty(subCategory) === false) {
        subCategoryObject[subCategory] = [];
      }
      subCategoryObject[subCategory].push(value);
    });
    return Object.keys(subCategoryObject).map(key => (
      <ListGroup.Item
      // variant="dark"
      >
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {key}
            <Dropdown.Menu
            // variant="dark"
            >
              {this.populateSubCategory(key, subCategoryObject)}
            </Dropdown.Menu>
          </Dropdown.Toggle>
        </Dropdown>
      </ListGroup.Item>
    ));
  };

  createAccordian = () => {
    if (this.state.storeItems != null) {
      let storeItems = this.state.storeItems.categories;
      let categories = Object.keys(this.state.storeItems.categories);
      return categories.map((value, index) => {
        return (
          <React.Fragment>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey={index}>
                {value}
              </Accordion.Toggle>
              <Accordion.Collapse eventKey={index}>
                <ListGroup>
                  {this.populateAccordian(storeItems, value)}
                </ListGroup>
              </Accordion.Collapse>
            </Card>
          </React.Fragment>
        );
      });
    }
  };

  render() {
    return (
      <div className={this.props.className + " grey h-100"}>
        <Accordion>{this.createAccordian()}</Accordion>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedItems: state.items.selectedItems,
  storeItems: state.items.storeItems
});

export default connect(
  mapStateToProps,
  { fetchClickedItem, fetchStoreItems }
)(SideBar);
