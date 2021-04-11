import React, { useContext } from "react";
import Listagem from "../Listagem/Listagem";
import AppContext from "../../AppContext";
import moment from "moment";

const ListPage = () => {
  const [{ historico }] = useContext(AppContext);
  const historicoOrdenado = historico.sort((a, b) => {
    return moment(moment(a.date, "DD/MM/yyyy")).diff(
      moment(b.date, "DD/MM/yyyy")
    );
  });

  return <Listagem agendamentos={historicoOrdenado} isHistorico="true" />;
};

export default ListPage;
