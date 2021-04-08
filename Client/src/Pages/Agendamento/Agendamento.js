import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import AgendamentoForm from "../../components/AgendamentoForm/AgendamentoForm";

import Col from "react-bootstrap/Col";
const Agendamento = () => {
  return (
    <Container>
      <h1>VacinAcao</h1>
      <Row>
        <Col xs={8}></Col>
        <Col xs={4}>
          <AgendamentoForm />
        </Col>
      </Row>
    </Container>
  );
};

export default Agendamento;
