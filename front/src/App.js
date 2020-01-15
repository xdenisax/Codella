import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import "./assets/css/blk-design-system-react.css";
import "./assets/css/nucleo-icons.css";
import CustomRoute from "./components/custom-route/CustomRoute";
import DashboardLayout from "./components/layouts/DashboardLayout";
import MainLayout from "./components/layouts/MainLayout";
import Notes from "./components/notes/Notes";
import Groups from "./components/groups/Groups";
import Login from "./components/login/Login";
import { Row, Col } from "reactstrap";
import NavigationNotes from "./components/notes/NavigationNotes";
import NavigationGroups from "./components/groups/NavigationGroups"

class App extends Component {
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
              Component={() => (
                <div>
                  <Row>
                    <Col md="2">
                      <NavigationNotes />
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
                      <NavigationGroups />
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
