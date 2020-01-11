import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import "./assets/css/blk-design-system-react.css";
import "./assets/css/nucleo-icons.css";
import CustomRoute from "./components/custom-route/CustomRoute";
import DashboardLayout from "./components/layouts/DashboardLayout";
import MainLayout from "./components/layouts/MainLayout";
import Notes from "./components/notes/Notes";
import NotesList from "./components/notes/NotesList";
import Groups from "./components/groups/Groups";
import GroupsList from "./components/groups/GroupsList";
import Login from "./components/login/Login";
import { Row, Col } from "reactstrap";
import axios from "axios";

class App extends Component {
  state = {
    user: {},
    error: null,
    authenticated: false
  };
  componentDidMount() {
    fetch("http://localhost:5000/auth/login/success", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      }
    })
      .then(responseJson => {
        this.setState({
          authenticated: true,
          user: responseJson.user
        });
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
              exact
              path="/dashboard"
              Layout={DashboardLayout}
              Component={Notes}
            ></CustomRoute>
            <CustomRoute
              path="/notite"
              Layout={DashboardLayout}
              Component={() => (
                <div>
                  <Row>
                    <Col md="3">
                      <NotesList />
                    </Col>
                    <Notes />
                  </Row>
                </div>
              )}
            ></CustomRoute>
            <CustomRoute
              path="/grupuri"
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
      </div>
    );
  }
}

export default App;
