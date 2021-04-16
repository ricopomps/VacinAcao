import React from "react";

import Pagination from "react-bootstrap/Pagination";
import Container from "react-bootstrap/Container";
const PaginationListagem = ({
  atendimentosPerPage,
  totalAtendimentos,
  paginate,
  currentPage,
}) => {
  const pageNumbers = [];

  for (let i = currentPage - 2; i <= currentPage + 2; i++) {
    i <= Math.ceil(totalAtendimentos / atendimentosPerPage) &&
      i >= 1 &&
      pageNumbers.push(i);
  }
  return (
    <Container style={{ display: "flex" }}>
      <Pagination style={{ margin: "auto" }}>
        <Pagination.First
          disabled={currentPage === 1}
          onClick={() => currentPage !== 1 && paginate(1)}
        />
        <Pagination.Prev
          disabled={currentPage === 1}
          onClick={() => currentPage > 1 && paginate(currentPage - 1)}
        />
        {pageNumbers[0] > 1 && <Pagination.Ellipsis disabled={true} />}
        {pageNumbers.map((number) => (
          <Pagination.Item
            active={number === currentPage}
            key={number}
            onClick={() => paginate(number)}
          >
            {number}
          </Pagination.Item>
        ))}
        {Math.ceil(totalAtendimentos / atendimentosPerPage) >
          pageNumbers[pageNumbers.length - 1] && (
          <Pagination.Ellipsis disabled={true} />
        )}
        <Pagination.Next
          disabled={currentPage >= pageNumbers[pageNumbers.length - 1]}
          onClick={() =>
            currentPage < pageNumbers[pageNumbers.length - 1] &&
            paginate(currentPage + 1)
          }
        />
        <Pagination.Last
          disabled={currentPage === pageNumbers[pageNumbers.length - 1]}
          onClick={() =>
            currentPage !== pageNumbers[pageNumbers.length - 1] &&
            paginate(Math.ceil(totalAtendimentos / atendimentosPerPage))
          }
        />
      </Pagination>
    </Container>
  );
};

export default PaginationListagem;
