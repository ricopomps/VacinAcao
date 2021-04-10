import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import logo from "./../../image/logo.png";
import { IMAGE } from "./styles";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <Navbar bg="light" variant="light">
      <Navbar.Brand>
        <IMAGE src={logo} responsive />
        <b>VacinAcao</b>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">
            Agendamento
          </Nav.Link>
          <Nav.Link as={Link} to="/listagem">
            Listagem
          </Nav.Link>
        </Nav>
      </Navbar.Brand>
    </Navbar>
  );
};

export default NavBar;
