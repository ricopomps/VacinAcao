import React from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { legenda } from "../../constants/mainConstants";

const Legenda = () => {
  return (
    <Container>
      <Container>
        <b>Legenda:</b>
      </Container>
      <Row>
        <Col xs={5}>
          <Button variant={legenda.livre} block>
            LIVRE
          </Button>
          <br />
          <br />
          <Button variant={legenda.umaVaga} block>
            UMA VAGA
          </Button>
        </Col>
        <Col>
          <Button variant={legenda.apenasIdosos} block>
            APENAS IDOSO
          </Button>
          <br />
          <br />
          <Button disabled variant={legenda.semVagas} block>
            SEM VAGAS
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Legenda;
