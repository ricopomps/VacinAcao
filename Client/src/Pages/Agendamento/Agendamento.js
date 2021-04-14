import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import AgendamentoForm from "../../components/AgendamentoForm/AgendamentoForm";
import Legenda from "../../components/Legenda/Legenda";
import { IMAGE } from "../../components/NavBar/styles";
import logo from "./../../image/logo.png";
import Calendar from "../../components/Calendar/Calendar";
import { TABLE_SCROLL } from "../../components/Calendar/styles";
import Col from "react-bootstrap/Col";
const Agendamento = () => {
  return (
    <Container>
      <Container style={{ display: "flex" }}>
        <div style={{ margin: "auto" }}>
          <Row>
            <Col>
              <IMAGE src={logo} />
            </Col>
            <Col>
              <h1>VacinAcao</h1>
            </Col>
            <Col>
              <IMAGE src={logo} />
            </Col>
          </Row>
        </div>
      </Container>

      <Row>
        <TABLE_SCROLL xs={8}>
          <Calendar />
        </TABLE_SCROLL>
        <Col xs={4}>
          <AgendamentoForm />
          <Legenda />
        </Col>
      </Row>
    </Container>
  );
};

export default Agendamento;
