import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./assets/css/blk-design-system-react.css";
import "./assets/css/nucleo-icons.css";
import Login from "./components/login/Login";
import { Row, Col } from "reactstrap";
import SideNav from "./components/sidenav/SideNav";
import axios from "axios";
import NavigationNotes from "./components/notes/NavigationNotes";

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
      })
      .catch(error => {
        this.setState({
          authenticated: false,
          error: "Failed to authenticate user"
        });
      });
  }
  render() {
    return this.state.authenticated ? (
      <div>
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
          <Switch>
            <Route
              path="/notite"
              component={() => (
                <Row>
                  <Col md="2">
                    <SideNav user={this.state.user} />
                  </Col>
                  <Col md="3">
                    <NavigationNotes user={this.state.user} />
                  </Col>
                </Row>
              )}
            />
          </Switch>
        </Router>
      </div>
    ) : (
      <Router>
        <Switch>
          <Route exact path="/">
            <Login></Login>
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
