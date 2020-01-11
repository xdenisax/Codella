import React from "react";
import "./Notes.css";
import logo from "../../assets/images/logo.png";
import { Button,  Label, Input} from "reactstrap";
// import Datetime from 'react-datetime';
import { Link } from "react-router-dom";

class Notes extends React.Component {
  render() {
    return <div className = " NotesComponent">
        <div className="buttons">
            <Button color="info" size="sm">Distribuie</Button>
            <Button color="success" size="sm">Salveaza</Button>
            <Button color="danger" size="sm" className="button"> Sterge </Button>
        </div> 
        
            <div className="noteDetails">
                <Input id="title" placeholder="Titlu"/>
                <Input id="title" placeholder="Materie"/>
            </div>
            
       
    </div>;
  }
}


export default Notes;
