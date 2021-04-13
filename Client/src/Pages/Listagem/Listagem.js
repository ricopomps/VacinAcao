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
  const listingOrdenado = listing.sort((a, b) => {
    return moment(a.date, "DD/MM/yyyy").isBefore(moment(b.date, "DD/MM/yyyy"))
      ? moment(a.date, "DD/MM/yyyy").diff(moment(b.date, "DD/MM/yyyy"))
      : a.date === b.date &&
          moment(a.schedule, "HH:mm").diff(moment(b.schedule, "HH:mm"));
  });

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
