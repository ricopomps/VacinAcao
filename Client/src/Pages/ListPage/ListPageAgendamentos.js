import React, { useContext } from "react";
import Listagem from "../Listagem/Listagem";
import AppContext from "../../AppContext";
import moment from "moment";
const ListPage = () => {
  const [{ agendamentos }] = useContext(AppContext);
  const agendamentosOrdenado = agendamentos.sort((a, b) => {
    return moment(moment(a.date, "DD/MM/yyyy")).diff(
      moment(b.date, "DD/MM/yyyy")
    );
  });
  return <Listagem agendamentos={agendamentosOrdenado} />;
};

export default ListPage;
