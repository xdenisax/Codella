import React from "react";
import { Nav, NavItem, Row } from "reactstrap";
import SearchBox from "../searchBox/SearchBox";
import GroupsList from "./GroupsList";
import Group from "./Group";
import axios from "axios";

class NavigationGroups extends React.Component {
  constructor() {
    super();
    this.state = {
      groups: [],
      searchfield: "",
      selectedId: -1
    };
  }

  getSelectedGroup = id => {
    // se trimite id-ul catre componenta Groups (prin parinte)
    this.props.clickGroup(id);
  };

  componentDidMount() {
    var a = [];
    axios
      .get("http://localhost:5000/groups/" + this.props.user.id)
      .then(res => {
        for (let i = 0; i < res.data.length; i++) {
          a.push(<Group name={res.data[i].name} id={res.data[i].id} />);
        }
        console.log(res.data[0]);
        this.setState({ groups: a });
      });
  }

  onClickedGroup() {
    this.props.clickGroup(this.state.selectedId);
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
                <GroupsList
                  groups={filter}
                  f={this.getSelectedGroup.bind(this)}
                />
              </NavItem>
            </Nav>
          </Row>
        </div>
      );
    }
  }
}

export default NavigationGroups;
