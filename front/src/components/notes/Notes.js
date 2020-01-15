import React from "react";
import "./Notes.css";
import { Button,  Input, Label, FormGroup, Card,CardBody, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import MdEditor from 'react-markdown-editor-lite'
import MarkdownIt from 'markdown-it'

class Notes extends React.Component {
    mdParser = null;
    constructor(props) {
        super(props)
        this.mdParser = new MarkdownIt(/* Markdown-it options */)
    }
  
    handleEditorChange ({html, text}) {    
        console.log('handleEditorChange', html, text)
    }

  render() {
      
    return (<div className = "NotesComponent">
        <Row>
            <Button color="info" size="sm">Distribuie</Button>
            <Button color="success" size="sm">Salveaza</Button>
            <Button color="danger" size="sm" className="button"> Sterge </Button>
        </Row> 
        
        
        <Row>
            <Col >
                <Input id="titlu" placeholder="Titlu"/>
            </Col>
        </Row>
        
        <Row>
            <Col >
                <Input id="materie" placeholder="Materie"/>
            </Col>
        </Row>    
        
        
          <FormGroup check inline className="form-check-radio">
            <Label className="form-check-label">
                <Input type="radio" name="exampleRadios1" id="exampleRadios11" value="option1" />
                Curs
                <span className="form-check-sign"></span>
            </Label>
          </FormGroup>
          <FormGroup check inline className="form-check-radio">
            <Label className="form-check-label">
              <Input type="radio" name="exampleRadios1" id="exampleRadios12" value="option2" defaultChecked/>
              Seminar
              <span className="form-check-sign"></span>
            </Label>
          </FormGroup>
          
           
      <div >
            <MdEditor
                renderHTML={(text) => this.mdParser.render(text)}
                onChange={this.handleEditorChange} 
            />              
      </div> 
        
    </div>);
  }
}


export default Notes;
