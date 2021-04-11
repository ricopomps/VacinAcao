import React from "react";
import Table from "react-bootstrap/Table";
import ListItem from "../../components/ListItem/ListItem";

const Listagem = ({ agendamentos, isHistorico }) => {
  return (
    <Table size="sm" striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Nome</th>
          <th>Dia</th>
          <th>Horário</th>
          {isHistorico ? <th>Descrição do atendimento</th> : null}
          <th>Atendimento</th>
        </tr>
      </thead>
      <tbody>
        {agendamentos.map((agendamento, index) => (
          <ListItem
            key={index}
            index={index}
            isHistorico={isHistorico}
            agendamento={agendamento}
          />
        ))}
      </tbody>
    </Table>
  );
};

export default Listagem;
