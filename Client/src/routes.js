import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";

import Agendamento from "./pages/Agendamento/Agendamento";
import ListPageAgendamentos from "./pages/ListPage/ListPageAgendamentos";
import ListPageHistorico from "./pages/ListPage/ListPageHistorico";

const Routes = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Agendamento} />
        <Route path="/listagem" exact component={ListPageAgendamentos} />
        <Route path="/historico" exact component={ListPageHistorico} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
