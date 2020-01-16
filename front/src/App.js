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
import NavigationGroups from "./components/groups/NavigationGroups";
import Groups from "./components/groups/Groups";
import Notes from "./components/notes/Notes";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      error: null,
      authenticated: false,
      idGroup: -1
    };
  }
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

  onGroupClicked(id) {
    console.log("App.js--", id);
    this.setState({ idGroup: id });
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
                  <Col>
                    <Notes></Notes>
                  </Col>
                </Row>
              )}
            />
          </Switch>
          <Switch>
            <Route
              path="/grupuri"
              component={() => (
                <Row>
                  <Col md="2">
                    <SideNav user={this.state.user} />
                  </Col>
                  <Col md="2">
                    <NavigationGroups
                      user={this.state.user}
                      clickGroup={this.onGroupClicked.bind(this)}
                    />
                  </Col>
                  <Col>
                    <Groups grId={this.state.idGroup} />
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
