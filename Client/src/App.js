import React from "react";
import NavBar from "./components/NavBar/NavBar";
import Agendamento from "./Pages/Agendamento/Agendamento";
import FormAgendamento from "./components/FormAgendamento/FormAgendamento";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const App = () => {
  return (
    <div>
      <NavBar />
      <Agendamento />
    </div>
  );
};

export default App;
