import React, { useContext, useEffect } from "react";
import AppContext from "../../AppContext";
import moment from "moment";
import Table from "react-bootstrap/Table";
import ListItem from "../../components/ListItem/ListItem";
import PaginationListagem from "../../components/Pagination/PaginationListagem";
import Search from "../../components/Search/Search";

const Listagem = (props) => {
  let isHistorico = false,
    count,
    listing = [];

  const [
    {
      agendamentos,
      historico,
      agendamentosCount,
      historicoCount,
      pagination: { search, currentPage },
    },
    dispatch,
  ] = useContext(AppContext);

  if (props.location.pathname === "/listagem") {
    listing = agendamentos;
    count = agendamentosCount;
  } else {
    listing = historico;
    isHistorico = true;
    count = historicoCount;
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
      <Search
        value={search}
        onChange={(e) =>
          dispatch({
            type: "SET_SEARCH",
            payload: { search: e.target.value },
          })
        }
      />
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
        totalAtendimentos={count}
        paginate={paginate}
        currentPage={currentPage}
      ></PaginationListagem>
    </>
  );
};

export default Listagem;
