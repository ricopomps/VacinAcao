import React from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

const Legenda = () => {
  return (
    <Container>
      <Container>
        <b>Legenda:</b>
      </Container>
      <Row>
        <Col xs={5}>
          <Button variant="success" block>
            LIVRE
          </Button>
          <br />
          <br />
          <Button variant="warning" block>
            UMA VAGA
          </Button>
        </Col>
        <Col>
          <Button variant="primary" block>
            APENAS IDOSO
          </Button>
          <br />
          <br />
          <Button disabled variant="danger" block>
            SEM VAGAS
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Legenda;
