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
import Group from "./Group";
import GroupsList from "./GroupsList";

class Groups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalDemo: false,
      groupName: "",
      memberEmail: "",
      listitems: ["List Item 1", "List Item 2", "List Item 3"],
      listNotes: ["abc", "abc2", "abc3"]
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
      memberEmail: event.target.value
    });
  };

  addGroup = () => {
    //const group = {...this.state}
    console.log(this.state.groupName);
    console.log(this.state.memberEmail);
  };

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

        <div>Grupul meu</div>
        <Row>
          <Col>
            <Card className="list-group">
              {this.state.listitems.map(listitem => (
                <CardText className="">
                  {listitem}
                  <Button>Button</Button>
                </CardText>
              ))}
            </Card>
          </Col>

          <Col>
            <Card className="list-group">
              {this.state.listNotes.map(listNote => (
                <CardText className="">{listNote}</CardText>
              ))}
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Groups;
