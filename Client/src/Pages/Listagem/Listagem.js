import React, { useContext, useEffect } from "react";
import AppContext from "../../AppContext";
import moment from "moment";
import Table from "react-bootstrap/Table";
import ListItem from "../../components/ListItem/ListItem";
import PaginationListagem from "../../components/Pagination/PaginationListagem";
import Search from "../../components/Search/Search";
import { SET_PAGINATION, CLEAR_SEARCH } from "../../constants/reducerConstants";
import { dateFormat } from "../../constants/mainConstants";

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
      pagination: { search, currentPage, limit },
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
      type: SET_PAGINATION,
      payload: { currentPage: number },
    });
  };
  useEffect(() => {
    dispatch({
      type: CLEAR_SEARCH,
    });
  }, [props.location.pathname]);

  const listingOrdenado = listing.sort((a, b) => {
    return moment(a.date, dateFormat).isBefore(moment(b.date, dateFormat))
      ? moment(a.date, dateFormat).diff(moment(b.date, dateFormat))
      : a.date === b.date &&
          moment(a.schedule, "HH:mm").diff(moment(b.schedule, "HH:mm"));
  });

  return (
    <>
      <br />
      <Search
        value={search}
        limit={limit}
        onChange={(type, payload) =>
          dispatch({
            type: type,
            payload: payload,
          })
        }
      />
      <Table size="sm" striped bordered hover>
        <thead>
          <tr>
            <th style={{ width: "80px" }}>#</th>
            <th style={{ width: "500px" }}>Nome</th>
            <th>Data de nascimento</th>
            <th>Dia</th>
            <th>Horário</th>
            {isHistorico && (
              <th style={{ width: "500px" }}>Descrição do atendimento</th>
            )}
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
        atendimentosPerPage={limit}
        totalAtendimentos={count}
        paginate={paginate}
        currentPage={currentPage}
      ></PaginationListagem>
    </>
  );
};

export default Listagem;
