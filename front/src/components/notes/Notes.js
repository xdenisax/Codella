import React from "react";
import "./Notes.css";
import {
  Button,
  Input,
  Label,
  FormGroup,
  Card,
  CardBody,
  Row,
  Col
} from "reactstrap";
import { Link } from "react-router-dom";
import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";
import axios from "axios";

class Notes extends React.Component {
  mdParser = null;

  constructor(props) {
    super(props);
    this.state = {
      id: -1,
      keywordInput: "",
      keywords: [],
      titleInput: "",
      subjectInput: "",
      tagInput: "Seminar",
      markdownInput: ""
    };

    this.mdParser = new MarkdownIt();
    this.note = props.note;
  }

  //   note = {
  //     id: -1,
  //     title: "Nespecificat",
  //     subject: "Nespecificat",
  //     date: new Date().toLocaleTimeString(),
  //     tag: "Seminar",
  //     content: " "
  // };

  handleEditorChange = ({ html, text }, event) => {
    this.setState({ markdownInput: text });
    console.log(this.state.markdownInput);
  };

  onChangeTitleInput = event => {
    this.setState({ titleInput: event.target.value });
  };

  onChangeSubjectInput = event => {
    this.setState({ subjectInput: event.target.value });
  };

  onChangeTagInput = event => {
    this.setState({ tagInput: event.target.value });
    console.log(this.state.tagInput);
  };

  onChangeKeywordInput = event => {
    this.setState({ keywordInput: event.target.value });
  };

  tokenizeKeywords = () => {
    this.setState({ keywords: this.state.keywordInput.split(",") });
    console.log(this.state.keywords);
    return this.state.keywords;
  };

  saveNote = event => {
    if (this.state.id > 0) {
      //actualizam notita in bd
      console.log("actualizare");
      console.log(
        this.state.titleInput,
        this.state.subjectInput,
        this.state.tagInput,
        this.state.markdownInput
      );
    } else {
      //salvam o notita noua
      this.tokenizeKeywords();
      console.log("notita noua");
      console.log(
        this.state.titleInput,
        this.state.subjectInput,
        this.state.tagInput,
        this.state.keywords,
        this.state.markdownInput
      );

      const note = {
        title: this.state.titleInput,
        content: this.state.markdownInput,
        subject: this.state.subjectInput,
        date: new Date().toLocaleTimeString(),
        tag: this.state.tagInput
      };

      let id;
      event.preventDefault();
      axios.post("http://18.224.94.55:5000/notes/2", note).then(res => {
        console.log(res);
        console.log(res.data);
        id = res.id;
      }).catch = e => {
        console.log(e.response);
      };

      for (let i = 0; i < this.state.keywords.length; i++) {
        axios
          .post("http://18.224.94.55:5000/keywords/2", this.state.keywords[i])
          .then(res => {
            console.log(res);
            console.log(res.data);
            id = res.id;
          }).catch = e => {
          console.log(e.response);
        };
      }
    }
  };

  deleteNote = event => {
    axios.delete("http://18.224.94.55:5000/notes/2").then(res => {
      console.log(res);
    });
    this.setState({ titleInput: "" });
    this.setState({ subjectInput: "" });
    this.setState({ tagInput: null });
    this.setState({ markdownInput: "" });
    this.setState({ keywords: "" });
  };

  //id utilizator transmis din parinte
  componentDidMount(props) {
    // if(props.notes != null){
    //     //creez note pe baza lui
    //     //setez formul pe baza atributelor
    //     let id=2;/////pun id ul notitei
    //     axios.get("http://18.224.94.55:5000/keywords/2").then(res =>{
    //       console.log(res.data);
    //       this.setState({keywords: res.data}); //??????????????????????
    //     });
    // }
    const note = {
      title: "Titlu",
      subject: "Materie",
      date: new Date().toLocaleTimeString(),
      tag: "Seminar",
      content: "Continut"
    };
    this.setState({ titleInput: note.title });
    this.setState({ subjectInput: note.subject });
    this.setState({ tagInput: note.tag });
    this.setState({ markdownInput: note.content });
    this.setState({ keywords: ["sD", "sfdf"] });
  }

  render() {
    return (
      <div className="NotesComponent">
        <Row>
          <Button color="info" size="sm">
            Distribuie
          </Button>
          <Button color="success" size="sm" onClick={this.saveNote}>
            Salveaza
          </Button>
          <Button
            color="danger"
            size="sm"
            className="button"
            onClick={this.deleteNote}
          >
            {" "}
            Sterge{" "}
          </Button>
        </Row>

        <Row>
          <Col>
            <Input
              value={this.state.titleInput}
              id="titlu"
              placeholder="Titlu"
              onChange={this.onChangeTitleInput}
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <Input
              value={this.state.subjectInput}
              id="materie"
              placeholder="Materie"
              onChange={this.onChangeSubjectInput}
            />
          </Col>
        </Row>

        <FormGroup check inline className="form-check-radio">
          <Label className="form-check-label">
            <Input
              type="radio"
              name="exampleRadios1"
              id="exampleRadios11"
              value="Curs"
              checked={this.state.tagInput == "Curs" ? true : null}
              onChange={this.onChangeTagInput}
            />
            Curs
            <span className="form-check-sign"></span>
          </Label>
        </FormGroup>
        <FormGroup check inline className="form-check-radio">
          <Label className="form-check-label">
            <Input
              type="radio"
              name="exampleRadios1"
              id="exampleRadios12"
              value="Seminar"
              checked={this.state.tagInput == "Seminar" ? true : null}
              onChange={this.onChangeTagInput}
            />
            Seminar
            <span className="form-check-sign"></span>
          </Label>
        </FormGroup>

        <Input
          placeholder="Cuvinte cheie"
          onChange={this.onChangeKeywordInput}
          value={this.state.keywords}
        />

        <div>
          <MdEditor
            renderHTML={text => this.mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.markdownInput}
          />
        </div>
      </div>
    );
  }
}

export default Notes;
