import React from "react";
// import "./app.css";
// import FinalList from "./outputList"
import SideBar from "../components/sideBar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import { connect } from "react-redux";
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: []
    };
  }
  componentDidUpdate(prevProps) {
    if (prevProps.itemClicked != this.props.itemClicked) {
      this.setState({
        selectedItem: [...this.state.selectedItem, this.props.itemClicked]
      });
    }
  }
  enterElementsToTable = () => {
    return this.state.selectedItem.map((value, index) => {
      return (
        <tr>
          <td>{value}</td>
        </tr>
      );
    });
  };
  render() {
    return (
      <Row className="h-100">
        <Col md="2">
          <SideBar />
        </Col>
        <Col md="10">
          {this.state.selectedItem && this.state.selectedItem.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>{this.enterElementsToTable()}</tbody>
            </Table>
          ) : (
            "No items selected"
          )}
        </Col>
      </Row>
    );
  }
}
const mapStateToProps = state => ({
  itemClicked: state.itemClicked.clickedItem
});
export default connect(mapStateToProps)(Home);
