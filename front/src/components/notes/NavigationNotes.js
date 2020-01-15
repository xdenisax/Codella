import React from "react";
import { Nav, NavItem, Button, Row } from "reactstrap";
import SearchBox from "../searchBox/SearchBox";
import NotesList from "./NotesList";
import Note from "./Note";
import axios from "axios";

class NavigationNotes extends React.Component {
  constructor() {
    super();
    this.state = {
      notes: [],
      searchfield: ""
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  onSearchChange = event => {
    this.setState({ searchfield: event.target.value });
  };

  getSelectedNote = id => {
    //preluare notita dupa id
    axios
      .get("http://localhost:5000/notes/" + id)
      .then(res => console.log(res.data));
  };

  refreshList = () => {
    var a = [];
    axios
      .get("http://localhost:5000/notes/users/" + this.props.user.id)
      .then(res => {
        for (let i = 0; i < res.data.length; i++) {
          a.push(
            <Note
              title={res.data[i].title}
              date={res.data[i].date}
              id={res.data[i].id}
            />
          );
        }
        this.setState({ notes: a });
      });
  };

  render() {
    const filter = this.state.notes.filter(note => {
      return note.props.title
        .toLowerCase()
        .includes(this.state.searchfield.toLowerCase());
    });
    if (this.state.notes.length === 0) {
      return <h1>Page is Loading</h1>;
    } else {
      return (
        <div className="fullheight bg-default px-1">
          <Nav>
            <NavItem>
              <Row>
                <SearchBox onChange={this.onSearchChange} />
                <Button color="info" size="sm" onClick={this.refreshList}>
                  Refresh
                </Button>
              </Row>
            </NavItem>
            <NavItem id="">
              <NotesList notes={filter} f={this.getSelectedNote} />
            </NavItem>
          </Nav>
        </div>
      );
    }
  }
}

export default NavigationNotes;
