import React from "react";
import { Button, Container, Row, Col } from "reactstrap";
import logo from "../../assets/images/logo.png";

class Login extends React.Component {
  loginUser = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };
  render() {
    return (
      <div className="section">
        <Container className="text-center">
          <Row>
            <Col className="col-sm-12 col-md-5 offset-md-3">
              <img className="display-3" src={logo} alt="codella-logo" />
              <div className="btn-wrapper">
                <Button color="success" onClick={this.loginUser}>
                  Accesați cu Gmail!
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
