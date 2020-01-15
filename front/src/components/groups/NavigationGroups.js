import React from "react";
import { Nav, NavItem, Col, Row } from "reactstrap";
import SearchBox from "../searchBox/SearchBox";
import GroupsList from "./GroupsList";
import Group from "./Group";
import Groups from "./Groups";
import axios from "axios";

class NavigationGroups extends React.Component {
  constructor() {
    super();
    this.state = {
      groups: [],
      searchfield: ""
    };
  }

  componentDidMount() {
    var a = [];
    axios
      .get("http://localhost:5000/groups/" + this.props.user.id)
      .then(res => {
        for (let i = 0; i < res.data.length; i++) {
          a.push(<Group name={res.data[i].name} id={res.data[i].id} />);
        }
        console.log(res.data[0].name);
        this.setState({ groups: a });
      });
  }

  onSearchChange = event => {
    this.setState({ searchfield: event.target.value });
  };

  render() {
    const filter = this.state.groups.filter(group => {
      return group.props.name
        .toLowerCase()
        .includes(this.state.searchfield.toLowerCase());
    });

    if (this.state.groups.length === 0) {
      return <h1>Page is Loading</h1>;
    } else {
      return (
        <div className="fullheight bg-default px-1">
          <Row>
            <Nav>
              <NavItem>
                <SearchBox onChange={this.onSearchChange} />
              </NavItem>
              <NavItem>
                <GroupsList groups={filter} />
              </NavItem>
            </Nav>
          </Row>
        </div>
      );
    }
  }
}

export default NavigationGroups;
