import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";

import Agendamento from "./pages/Agendamento/Agendamento";
import Listagem from "./pages/Listagem/Listagem";

const Routes = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Agendamento} />
        {/* <Route path="/agendamento" exact component={Agendamento} /> */}
        <Route path="/listagem" exact component={Listagem} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
