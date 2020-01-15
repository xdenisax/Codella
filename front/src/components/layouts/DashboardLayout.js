import React from "react";
import SideNav from "../sidenav/SideNav";
import { Col, Row } from "reactstrap";
import "./DashboardLayout.css";
import axios from "axios";

class DashboardLayout extends React.Component {
  state = {
    user: {},
    error: null,
    authenticated: false
  };
  componentDidMount() {
    axios
      .get("http://localhost:5000/auth/login/success", {
        withCredentials: true,
        crossdomain: true
      })
      .then(responseJson => {
        this.setState({
          authenticated: true,
          user: responseJson.data.user
        });
        console.log(this.state.user);
      })
      .catch(error => {
        this.setState({
          authenticated: false,
          error: "Failed to authenticate user"
        });
      });
  }
  render() {
    return (
      <div>
        <Row>
          <Col md="2" className="bg-darkerblue">
            <SideNav userName={this.state.user}></SideNav>
          </Col>
          <Col>{this.props.children}</Col>
        </Row>
      </div>
    );
  }
}

export default DashboardLayout;
