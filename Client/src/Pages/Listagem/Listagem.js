import React from "react";
import Table from "react-bootstrap/Table";
import ListItem from "../../components/ListItem/ListItem";

const Listagem = ({ agendamentos }) => {
  return (
    <Table size="sm" striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Nome</th>
          <th>Dia</th>
          <th>Horário</th>
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
