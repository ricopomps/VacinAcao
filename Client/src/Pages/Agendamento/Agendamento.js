import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import AgendamentoForm from "../../components/AgendamentoForm/AgendamentoForm";
import Calendar from "../../components/Calendar/Calendar";
import { TABLE_SCROLL } from "../../components/Calendar/styles";
import Col from "react-bootstrap/Col";
const Agendamento = () => {
  return (
    <Container>
      <h1>VacinAcao</h1>
      <Row>
        <TABLE_SCROLL xs={8}>
          <Calendar />
        </TABLE_SCROLL>
        <Col xs={4}>
          <AgendamentoForm />
        </Col>
      </Row>
    </Container>
  );
};

export default Agendamento;
