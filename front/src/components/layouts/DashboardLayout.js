import React from "react";
import SideNav from "../sidenav/SideNav";
import { Col, Row } from "reactstrap";
import "./DashboardLayout.css";
class DashboardLayout extends React.Component {
  render() {
    return (
      <div>
        <Row>
          <Col md="2" className="bg-darkerblue">
            <SideNav></SideNav>
          </Col>
          <Col>{this.props.children}</Col>
        </Row>
      </div>
    );
  }
}

export default DashboardLayout;
