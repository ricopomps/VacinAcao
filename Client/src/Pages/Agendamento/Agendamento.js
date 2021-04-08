import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import BasicForm from "../../components/BasicForm/BasicForm";
import FormAgendamento from "../../components/FormAgendamento/FormAgendamento";

import Col from "react-bootstrap/Col";
const Agendamento = () => {
  return (
    <Container>
      <h1>VacinAcao</h1>
      <Row>
        <Col xs={8}>
          <FormAgendamento />
        </Col>
        <Col xs={4}>
          <BasicForm />
        </Col>
      </Row>
    </Container>
  );
};

export default Agendamento;
