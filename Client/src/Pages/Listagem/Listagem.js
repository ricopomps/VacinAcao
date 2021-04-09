import React from "react";
import Table from "react-bootstrap/Table";
import ListItem from "../../components/ListItem/ListItem";
const Listagem = () => {
  const agendamentos = [
    { name: "Ricardo Pompilo", date: "Hoje" },
    { name: "Leonardo Pompilo", date: "amanha" },
    { name: "João Pedro Pompilo", date: "depois de amanhã" },
  ];

  return (
    <Table striped bordered hover>
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
