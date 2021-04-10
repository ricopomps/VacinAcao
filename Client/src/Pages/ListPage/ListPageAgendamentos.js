import React, { useContext } from "react";
import Listagem from "../Listagem/Listagem";
import AppContext from "../../AppContext";
const ListPage = () => {
  const [{ agendamentos }] = useContext(AppContext);

  return <Listagem agendamentos={agendamentos} />;
};

export default ListPage;
