import React from "react";
import Button from "react-bootstrap/Button";

const Legenda = () => {
  return (
    <div>
      <p>Legenda:</p>
      <Button variant="success">LIVRE</Button>
      <br />
      <br />
      <Button variant="warning">UMA VAGA</Button>
      <br />
      <br />
      <Button variant="primary">APENAS IDOSO</Button>
      <br />
      <br />
      <Button disabled variant="danger">
        SEM VAGAS
      </Button>
    </div>
  );
};

export default Legenda;
