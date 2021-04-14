import React from "react";
import Pagination from "react-bootstrap/Pagination";
import Button from "react-bootstrap/Button";
const PaginationComponent = ({ onBack, onFront, onCenter }) => {
  return (
    <Pagination style={{ display: "flex" }}>
      <Button onClick={onBack}>Semana anterior </Button>
      <Button onClick={onCenter} style={{ marginLeft: "auto" }}>
        Semana atual{" "}
      </Button>
      <Button style={{ marginLeft: "auto" }} onClick={onFront}>
        Próxima semana{" "}
      </Button>
    </Pagination>
  );
};

export default PaginationComponent;
