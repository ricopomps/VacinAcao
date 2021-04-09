import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "../Modal/Modal";

const ListItem = ({ index, agendamento }) => {
  const [modalShow, setModalShow] = useState(false);
  const [description, setDescription] = useState("");
  const onSubmit = () => {
    console.log(description);
    setModalShow(false);
    setDescription("");
  };
  const onChange = (e) => {
    setDescription(e.target.value);
  };
  const onHide = () => {
    setDescription("");
    setModalShow(false);
  };

  return (
    <>
      <tr>
        <td>{index + 1}</td>
        <td>{agendamento.name}</td>
        <td>{agendamento.date}</td>
        <td>
          <Button variant="success" onClick={() => setModalShow(true)}>
            Realizado
          </Button>{" "}
          <Button variant="danger">Não Realizado</Button>
        </td>
      </tr>

      <Modal
        onChange={onChange}
        description={description}
        onSubmit={onSubmit}
        name={agendamento.name}
        onHide={onHide}
        show={modalShow}
      />
    </>
  );
};

export default ListItem;
