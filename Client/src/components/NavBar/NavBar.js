import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const NavBar = () => {
  return (
    <Navbar bg="light" variant="light">
      <Navbar.Brand>
        <b>VacinAcao</b>
        <Nav className="mr-auto">
          <Nav.Link>Agendamento</Nav.Link>
          <Nav.Link>Listagem</Nav.Link>
        </Nav>
      </Navbar.Brand>
    </Navbar>
  );
};

export default NavBar;
