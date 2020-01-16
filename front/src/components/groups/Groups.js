import React from "react";
import "./Groups.css";
import {
  Card,
  CardText,
  Col,
  Row,
  Button,
  Modal,
  ModalBody,
  ModalFooter
} from "reactstrap";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

class Groups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalDemo: false,
      groupName: "",
      memberEmailInput: "",
      memberEmails: [],
      listMembers: [],
      listNotes: [],
      idGrupCreat: -1
    };
    this.toggleModalDemo = this.toggleModalDemo.bind(this);
  }

  toggleModalDemo() {
    this.setState({
      modalDemo: !this.state.modalDemo
    });
  }

  handleChangeGroupName = event => {
    this.setState({
      groupName: event.target.value
    });
  };

  handleChangeMemberEmail = event => {
    this.setState({
      memberEmailInput: event.target.value
    });
    this.setState({ memberEmails: this.state.memberEmailInput.split(",") });
  };

  addGroup = () => {
    const idUseri = [];
    var numeGrup = this.state.groupName;
    for (let i = 0; i < this.state.memberEmails.length; i++) {
      axios
        .get("http://localhost:5000/users/email/" + this.state.memberEmails[i])
        .then(res => idUseri.push(res.data.id))
        .catch(err => console.log(err));
    }
    console.log(numeGrup);
    axios
      .post("http://localhost:5000/groups", { name: numeGrup })
      .then(res => res.data)
      .then(data => {
        for (let i = 0; i < idUseri.length; i++) {
          axios
            .post(
              "http://localhost:5000/groups/" + data.group.id + "/" + idUseri[i]
            )
            .then(res => console.log(res))
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
    this.toggleModalDemo();
    toast("Grup adăugat!");
  };

  componentDidMount() {
    console.log("Parinte--", this.props.grId);
    axios
      .get("http://localhost:5000/group/" + this.props.grId)
      .then(res => {
        var membriiGrup = [];
        for (let i = 0; i < res.data.length; i++) {
          membriiGrup.push(res.data[i]);
        }
        this.setState({ listMembers: membriiGrup });
      })
      .catch(err => console.log("404 - did not found group members"));
    axios
      .get("http://localhost:5000/groups/notes/" + this.props.grId)
      .then(res => {
        var notiteGrup = [];
        console.log(res.data);
        for (let i = 0; i < res.data.length; i++) {
          notiteGrup.push(res.data[i]);
        }
        this.setState({ listNotes: notiteGrup });
      })
      .catch(err => console.log("404 - did not found notes for group"));
  }
  //lists = {
  //    listitems: ["List Item 1", "List Item 2", "List Item 3"],
  //    listNotes: ["abc", "abc2", "abc3"]
  //  };

  render() {
    return (
      <div className="lists">
        <Button color="primary" onClick={this.toggleModalDemo}>
          Adauga grup
        </Button>
        <Modal isOpen={this.state.modalDemo} toggle={this.toggleModalDemo}>
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Adauga grup nou
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
            <div>
              <div>
                Nume grup:
                <input
                  type="text"
                  placeholder="Nume grup"
                  onChange={this.handleChangeGroupName}
                />
              </div>
              <div>
                Email membru:
                <input
                  type="text"
                  placeholder="Email"
                  onChange={this.handleChangeMemberEmail}
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleModalDemo}>
              Close
            </Button>
            <Button color="primary" onClick={this.addGroup}>
              Save changes
            </Button>
          </ModalFooter>
        </Modal>

        <div>Membrii grup</div>
        <Row>
          <Col>
            <Card className="list-group">
              {this.state.listMembers.map(listitem => (
                <CardText className="">
                  {listitem.firstname + " " + listitem.familyname}
                  <Button>Button</Button>
                </CardText>
              ))}
            </Card>
          </Col>

          <Col>
            <Card className="list-group">
              {this.state.listNotes.map(listNote => (
                <CardText className="">{listNote.title}</CardText>
              ))}
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Groups;
