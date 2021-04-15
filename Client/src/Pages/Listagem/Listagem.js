import React, { useContext, useEffect } from "react";
import AppContext from "../../AppContext";
import moment from "moment";
import Table from "react-bootstrap/Table";
import ListItem from "../../components/ListItem/ListItem";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Container from "react-bootstrap/Container";
import PaginationListagem from "../../components/Pagination/PaginationListagem";

const Listagem = (props) => {
  let isHistorico = false,
    listing = [];

  const [
    {
      agendamentos,
      historico,
      pagination: { search, currentPage },
    },
    dispatch,
  ] = useContext(AppContext);

  if (props.location.pathname === "/listagem") {
    listing = agendamentos;
  } else {
    listing = historico;
    isHistorico = true;
  }

  const paginate = (number) => {
    dispatch({
      type: "SET_PAGINATION",
      payload: { currentPage: number },
    });
  };
  useEffect(() => {
    paginate(1);
    dispatch({
      type: "SET_SEARCH",
      payload: { search: "" },
    });
  }, [props.location.pathname]);

  const listingOrdenado = listing.sort((a, b) => {
    return moment(a.date, "DD/MM/yyyy").isBefore(moment(b.date, "DD/MM/yyyy"))
      ? moment(a.date, "DD/MM/yyyy").diff(moment(b.date, "DD/MM/yyyy"))
      : a.date === b.date &&
          moment(a.schedule, "HH:mm").diff(moment(b.schedule, "HH:mm"));
  });

  return (
    <>
      <br />
      <Container>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Pesquisar"
            value={search}
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            onChange={(e) =>
              dispatch({
                type: "SET_SEARCH",
                payload: { search: e.target.value },
              })
            }
          />
        </InputGroup>
      </Container>
      <Table size="sm" striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Data de nascimento</th>
            <th>Dia</th>
            <th>Horário</th>
            {isHistorico && <th>Descrição do atendimento</th>}
            <th>Atendimento</th>
          </tr>
        </thead>
        <tbody>
          {listingOrdenado.map((agendamento, index) => (
            <ListItem
              key={index}
              index={index}
              isHistorico={isHistorico}
              agendamento={agendamento}
            />
          ))}
        </tbody>
      </Table>
      <PaginationListagem
        atendimentosPerPage={15}
        totalAtendimentos={listing.length}
        paginate={paginate}
        currentPage={currentPage}
      ></PaginationListagem>
    </>
  );
};

export default Listagem;
