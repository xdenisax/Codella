import React from "react";
import { Button, Container, Row, Col } from "reactstrap";
import logo from "../../assets/images/logo.png";

class Login extends React.Component {
  loginUser = () => {
    console.log("Buton apasat");
  };
  render() {
    return (
      <div className="section">
        <Container className="text-center">
          <Row>
            <Col className="col-sm-12 col-md-5 offset-md-3">
              <img className="display-3" src={logo} alt="codella-logo" />
              <div className="btn-wrapper">
                <Button color="success">Accesați cu Gmail!</Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
