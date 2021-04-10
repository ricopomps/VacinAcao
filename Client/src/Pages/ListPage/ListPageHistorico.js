import React, { useContext } from "react";
import Listagem from "../Listagem/Listagem";
import AppContext from "../../AppContext";
const ListPage = () => {
  const [{ historico }] = useContext(AppContext);

  return <Listagem agendamentos={historico} isHistorico="true" />;
};

export default ListPage;
