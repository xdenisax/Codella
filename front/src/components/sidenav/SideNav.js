import React from "react";
import logo from "../../assets/images/logo.png";
import { NavItem, NavLink, Nav } from "reactstrap";
import "./SideNav.css";
import { Link } from "react-router-dom";

class SideNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vertical: 1,
      username: "person"
    };
  }
  render() {
    return (
      <div className="fullheight">
        <Nav className="nav-pills-success flex-column" pills>
          <NavItem>
            <img src={logo} alt={"logo Codella"} />
          </NavItem>
          <NavItem>
            <NavLink>
              <i className="tim-icons icon-single-02" />
              {this.state.username}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink>
              <Link to="/notite">Notițe</Link>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink>
              <Link to="/grupuri">Grupuri</Link>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink>Deconectare</NavLink>
          </NavItem>
          <NavItem>
            <NavLink>Ștergere cont</NavLink>
          </NavItem>
        </Nav>
      </div>
    );
  }
}

export default SideNav;
