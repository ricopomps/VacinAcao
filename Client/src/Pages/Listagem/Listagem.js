import React, { useContext } from "react";
import AppContext from "../../AppContext";
import moment from "moment";
import Table from "react-bootstrap/Table";
import ListItem from "../../components/ListItem/ListItem";

const Listagem = (props) => {
  let isHistorico = false,
    listing = [];
  const [{ agendamentos, historico }] = useContext(AppContext);
  if (props.location.pathname === "/listagem") {
    listing = agendamentos;
  } else {
    listing = historico;
    isHistorico = true;
  }
  const listingOrdenado = listing.sort((a, b) =>
    moment(a.date).isBefore(b.date)
      ? moment(a.date).diff(b.date)
      : a.date === b.date && a.schedule - b.schedule
  );
  return (
    <Table size="sm" striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Nome</th>
          <th>Data de nascimento</th>
          <th>Dia</th>
          <th>Horário</th>
          {isHistorico ? <th>Descrição do atendimento</th> : null}
          <th>Atendimento</th>
        </tr>
      </thead>
      <tbody>
        {listingOrdenado.map((agendamento, index) => (
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
