import React from "react";
import { Nav, NavItem } from "reactstrap";
import SearchBox from "../searchBox/SearchBox";
import NotesList from "./NotesList";
import Note from "./Note";

class NavigationNotes extends React.Component {
  constructor() {
    super();
    this.state = {
      notes: [],
      searchfield: ""
    };
  }

  componentDidMount() {
      var a =[];
    for (let i = 0; i < 5; i++)
     a.push(<Note title={i + "Andrei"} date={i} />);
     this.setState({notes:a});
  };

  onSearchChange = event => {
    this.setState({ searchfield: event.target.value });
  };

  
  

  render() {

    const filter = this.state.notes.filter(note=>{
        
        return note.props.title.toLowerCase().includes(this.state.searchfield.toLowerCase());
    });
    console.log("state", this.state.notes);
    if(this.state.notes.length === 0){
        return <h1>Page is Loading</h1>
    }else{
    return (
      <div className="fullheight bg-default px-1">

        <Nav>
          <NavItem>
            <SearchBox onChange={this.onSearchChange} />
          </NavItem>
          <NavItem>
            <NotesList notes={ filter } />
          </NavItem>
        </Nav>
      </div>
    );
  }
}
}

export default NavigationNotes;
