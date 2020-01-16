import React from "react";
import "./Notes.css";
import {
  Button,
  Input,
  Label,
  FormGroup,
  Row,
  Col,
  Modal,
  ModalBody,
  ModalFooter
} from "reactstrap";
import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";
import axios from "axios";
import { toast } from "react-toastify";

class Notes extends React.Component {
  mdParser = null;

  constructor(props) {
    super(props);
    this.state = {
      modalDemo: false,
      id: -1,
      keywordInput: "",
      keywords: [],
      titleInput: "",
      subjectInput: "",
      tagInput: "Seminar",
      markdownInput: " ",
      groupNames: [],
      groupNamesInput: " ",
      grupuri: []
    };
    this.toggleModalDemo = this.toggleModalDemo.bind(this);
    this.mdParser = new MarkdownIt();
    this.note = props.note;
  }

  toggleModalDemo() {
    this.setState({
      modalDemo: !this.state.modalDemo
    });
  }

  shareNote = () => {
    axios
      .post(
        "http://localhost:5000/groups/notes/" +
          this.state.grupIdSelectat +
          "/" +
          this.state.id
      )
      .then(res => {
        console.log(res);
        this.toggleModalDemo();
        toast("Ati partajat o notita");
      });
  };

  handleChangeGroupsShared = event => {
    this.setState({
      groupNamesInput: event.target.value
    });
    this.setState({ groupNames: this.state.groupNamesInput.split(",") });
  };

  resetNote = () => {
    this.setState({
      keywordInput: "",
      keywords: [],
      titleInput: "",
      subjectInput: "",
      tagInput: "Seminar",
      markdownInput: " ",
      grupuriUtilizator: [],
      grupIdSelectat: -1
    });
  };

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
    if (this.state.id > -1) {
      //actualizam notita in bd
      axios
        .put("http://localhost:5000/notes/" + this.state.id, {
          content: this.state.markdownInput
        })
        .then(res => {
          console.log(res);
          toast("Ati actualizat o notita");
        })
        .catch(err => console.log(err));
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

      axios
        .post("http://localhost:5000/notes/" + this.props.user.id, note)
        .then(res => res.data)
        .then(data => {
          this.setState({
            id: data.id
          });
          toast("Ati adaugat o notita");
          for (let i = 0; i < this.state.keywords.length; i++) {
            axios
              .post("http://localhost:5000/keywords/" + data.id, {
                word: this.state.keywords[i]
              })
              .then(res => {
                console.log(res);
              })
              .catch(err => console.log(err));
          }
        })
        .catch(err => console.log(err));
    }
  };

  getSelectedGroup = event => {
    /*const selectedIndex = event.target.options.selectedIndex;
    console.log(event.target.options[selectedIndex].getAttribute("key"));*/
    const { options, selectedIndex } = event.target;
    this.setState({ grupIdSelectat: options[selectedIndex].value });
  };

  deleteNote = event => {
    if (this.state.id > -1) {
      axios.delete("http://localhost:5000/notes/" + this.state.id).then(res => {
        console.log(res);
        this.toggleModalDemo();
        toast("Ati sters o notita");
      });
      this.setState({ id: -1 });
      this.setState({ titleInput: "" });
      this.setState({ subjectInput: "" });
      this.setState({ tagInput: null });
      this.setState({ markdownInput: "" });
      this.setState({ keywords: "" });
    }
  };

  //id utilizator transmis din parinte
  componentDidMount(props) {
    var grupuriPrimite = [];
    axios
      .get("http://localhost:5000/groups/" + this.props.user.id)
      .then(res => {
        grupuriPrimite = res.data;
        this.setState({
          grupuriUtilizator: res.data,
          grupuri: grupuriPrimite
        });
      });
    console.log("Notes--", this.props.noteId);
    axios.get("http://localhost:5000/notes/" + this.props.noteId).then(res => {
      this.setState({ id: this.props.noteId });
      this.setState({ titleInput: res.data.title });
      this.setState({ subjectInput: res.data.subject });
      this.setState({ tagInput: res.data.tag });
      this.setState({ markdownInput: res.data.content });
      this.setState({ keywords: " " });
    });
  }

  render() {
    return (
      <div className="NotesComponent">
        <Modal isOpen={this.state.modalDemo} toggle={this.toggleModalDemo}>
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Partajeaza notita
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-hidden="true"
              onClick={this.toggleModalDemo}
            >
              <i className="tim-icons icon-simple-remove" />
            </button>
          </div>
          <ModalBody>
            <FormGroup>
              <Input
                type="select"
                name="select"
                id="exampleSelect"
                onChange={this.getSelectedGroup}
              >
                {this.state.grupuri.map(value => (
                  <option value={value.id}>{value.name} </option>
                ))}
              </Input>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleModalDemo}>
              Close
            </Button>
            <Button color="primary" onClick={this.shareNote}>
              Save changes
            </Button>
          </ModalFooter>
        </Modal>
        <Row>
          <Button color="info" size="sm" onClick={this.resetNote}>
            Notita noua
          </Button>
          <Button color="warning" size="sm" onClick={this.toggleModalDemo}>
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
            Sterge
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
        />

        <div>
          <MdEditor
            renderHTML={text => this.mdParser.render(text + " ")}
            onChange={this.handleEditorChange}
            value={this.state.markdownInput}
          />
        </div>
      </div>
    );
  }
}

export default Notes;
