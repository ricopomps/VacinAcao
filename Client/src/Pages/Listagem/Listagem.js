import React, { useContext } from "react";
import Table from "react-bootstrap/Table";
import ListItem from "../../components/ListItem/ListItem";
import AppContext from "../../AppContext";

const Listagem = () => {
  const [{ agendamentos }] = useContext(AppContext);

  return (
    <Table size="sm" striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Nome</th>
          <th>Data</th>
          <th>Atendimento</th>
        </tr>
      </thead>
      <tbody>
        {agendamentos.map((agendamento, index) => (
          <ListItem key={index} index={index} agendamento={agendamento} />
        ))}
      </tbody>
    </Table>
  );
};

export default Listagem;
