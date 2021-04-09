import React from "react";
import Button from "react-bootstrap/Button";

const ListItem = ({ index, agendamento }) => {
  return (
    <>
      <tr>
        <td>{index + 1}</td>
        <td>{agendamento.name}</td>
        <td>{agendamento.date}</td>
        <td>
          <Button variant="success">Realizado</Button>{" "}
          <Button variant="danger">Não Realizado</Button>
        </td>
      </tr>
    </>
  );
};

export default ListItem;
