import React from "react";
import NavBar from "./components/NavBar/NavBar";
import FormAgendamento from "./components/FormAgendamento/FormAgendamento";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const App = () => {
  return (
    <div>
      <NavBar />
      <Container>
        <h1>VacinAcao</h1>
        <Row>
          <Col>1 of 2</Col>
          <Col>
            <FormAgendamento />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
