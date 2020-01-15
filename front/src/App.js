import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./assets/css/blk-design-system-react.css";
import "./assets/css/nucleo-icons.css";
import CustomRoute from "./components/custom-route/CustomRoute";
import DashboardLayout from "./components/layouts/DashboardLayout";
import MainLayout from "./components/layouts/MainLayout";
import Notes from "./components/notes/Notes";
import Groups from "./components/groups/Groups";
import GroupsList from "./components/groups/GroupsList";
import Login from "./components/login/Login";
import { Row, Col } from "reactstrap";
import SideNav from "./components/sidenav/SideNav";
import axios from "axios";

class App extends Component {
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
        <Router>
          <Switch>
            <CustomRoute
              exact
              path="/"
              Layout={MainLayout}
              Component={Login}
            ></CustomRoute>
            <CustomRoute
              path="/notite"
              Layout={DashboardLayout}
              Component={() => <Notes></Notes>}
            ></CustomRoute>
            <CustomRoute
              path="/dashbo"
              Layout={DashboardLayout}
              Component={() => (
                <div>
                  <Row>
                    <Col md="3">
                      <GroupsList />
                    </Col>
                    <Groups />
                  </Row>
                </div>
              )}
            ></CustomRoute>
          </Switch>
        </Router>
        <Router>
          <Switch>
            <Route
              path="/dashboard"
              component={() => (
                <Col md="2">
                  <SideNav user={this.state.user} />
                </Col>
              )}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
