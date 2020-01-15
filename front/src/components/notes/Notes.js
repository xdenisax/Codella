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
        this.state={
            id:-1,
            keywordInput:"",
            keywords: [],
            titleInput:"",
            subjectInput:"",
            tagInput:"Seminar",
            markdownInput:""
        }; 
        this.mdParser = new MarkdownIt();
        this.note = props.note;
    }
  
    handleEditorChange = (html, text) => {    
        this.setState({markdownInput: text.target.defaultValue});
    }
    
    
    onChangeTitleInput = (event)=>{
        this.setState({ titleInput: event.target.value});
    }
    
    onChangeSubjectInput = (event) =>{
        this.setState( {subjectInput:  event.target.value});
    }
    
    onChangeTagInput = (event)=>{
        this.setState({tagInput: event.target.value});
        console.log(this.state.tagInput);
    }
    
    onChangeKeywordInput = (event)=>{
        this.setState({keywordInput: event.target.value});
    }
    
    tokenizeKeywords=()=>{
        this.setState({keywords:this.state.keywordInput.split(",")});
        console.log(this.state.keywords);
        return this.state.keywords;
        //console.log(this.state.keywordInput.split(","));
    }
    
    saveNote=()=>{
        if(this.state.id>0){
            //actualizam notita in bd
            console.log("actualizare");
            console.log(this.state.titleInput, this.state.subjectInput, this.state.tagInput, this.state.markdownInput);
            
        }else{
            //salvam o notita noua
            this.tokenizeKeywords();
            console.log("notita noua");
            console.log(this.state.titleInput, this.state.subjectInput, this.state.tagInput, this.state.keywords, this.state.markdownInput);
            
        }
    }
    

  render() {
      
    return (<div className = "NotesComponent">
        <Row>
            <Button color="info" size="sm">Distribuie</Button>
            <Button color="success" size="sm" onClick={this.saveNote} >Salveaza</Button>
            <Button color="danger" size="sm" className="button"> Sterge </Button>
        </Row> 
        
        
        <Row>
            <Col >
                <Input id="titlu" placeholder="Titlu" onChange={this.onChangeTitleInput}/>
            </Col>
        </Row>
        
        <Row>
            <Col >
                <Input id="materie" placeholder="Materie" onChange = {this.onChangeSubjectInput}/>
            </Col>
        </Row>    
        
        
          <FormGroup check inline className="form-check-radio">
            <Label className="form-check-label">
                <Input type="radio" name="exampleRadios1" id="exampleRadios11" value="Curs" onChange={this.onChangeTagInput}/>
                    Curs
                <span className="form-check-sign"></span>
            </Label>
          </FormGroup>
          <FormGroup check inline className="form-check-radio">
            <Label className="form-check-label">
              <Input type="radio" name="exampleRadios1" id="exampleRadios12" value="Seminar" defaultChecked onChange={this.onChangeTagInput}/>
                    Seminar
              <span className="form-check-sign"></span>
            </Label>
          </FormGroup>
          
          <Input placeholder="Cuvinte cheie" onChange={this.onChangeKeywordInput}/>
          
           
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
