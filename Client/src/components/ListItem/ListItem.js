import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "../Modal/Modal";
import AppContext from "../../AppContext";

import { updateAgendamento, deleteAgendamento } from "../../api";
const ListItem = ({ index, agendamento }) => {
  const [{}, dispatch] = useContext(AppContext);
  const [modalShow, setModalShow] = useState(false);
  const [description, setDescription] = useState("");

  const onSubmit = async () => {
    setModalShow(false);
    const { data } = await updateAgendamento(
      agendamento._id,
      (agendamento = {
        ...agendamento,
        realized: true,
        description: description,
      })
    );
    dispatch({ type: "FINALIZAR", payload: data });
    setDescription("");
  };
  const onChange = (e) => {
    setDescription(e.target.value);
  };
  const onDelete = () => {
    deleteAgendamento(agendamento._id);
    setModalShow(false);
    dispatch({ type: "DELETE", payload: agendamento._id });
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
        <td>{agendamento.schedule}</td>
        <td>
          <Button variant="success" onClick={() => setModalShow(true)}>
            Realizado
          </Button>{" "}
          <Button variant="danger" onClick={onDelete}>
            Não Realizado
          </Button>
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
