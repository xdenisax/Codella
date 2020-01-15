import React from "react";
import { Nav, NavItem } from "reactstrap";
import SearchBox from "../searchBox/SearchBox";
import GroupsList from "./GroupsList";
import Group from "./Groups";

class NavigationGroups extends React.Component {
  constructor() {
    super();
    this.state = {
      groups: [],
      searchfield: ""
    };
  }

  componentDidMount() {
    console.log("ASASDads")
      var a =[];
    for (let i = 0; i < 5; i++)
     a.push(<Group title={"Group "+ i} />);
     this.setState({groups:a});
  };

  onSearchChange = event => {
    this.setState({ searchfield: event.target.value });
  };


  

  render() {

    const filter = this.state.groups.filter(group=>{
        
        return group.props.title.toLowerCase().includes(this.state.searchfield.toLowerCase());
    });
    
    if(this.state.groups.length === 0){
        return <h1>Page is Loading</h1>
    }else{
    return (
      <div className="fullheight bg-default px-1">

        <Nav>
          <NavItem>
            <SearchBox onChange={this.onSearchChange} />
          </NavItem>
          <NavItem>
            <GroupsList groups = { filter } />
          </NavItem>
        </Nav>
      </div>
    );
  }
}
}

export default NavigationGroups;
