import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import Nav from "react-bootstrap/Nav";
import logo from "./../../image/logo.png";
import { IMAGE } from "./styles";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <Navbar bg="light" variant="light">
      <Navbar.Brand>
        <b>VacinAcao</b>
        <IMAGE src={logo} responsive />
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
