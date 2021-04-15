import React from "react";

import Pagination from "react-bootstrap/Pagination";
const PaginationListagem = ({
  atendimentosPerPage,
  totalAtendimentos,
  paginate,
  currentPage,
}) => {
  const pageNumbers = [];

  for (
    let i = 1;
    i <= Math.ceil(totalAtendimentos / atendimentosPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }
  return (
    <Pagination>
      <Pagination.First onClick={() => paginate(1)} />
      <Pagination.Prev
        onClick={() => currentPage > 1 && paginate(currentPage - 1)}
      />
      {pageNumbers.map((number) => (
        <Pagination.Item
          active={number === currentPage}
          key={number}
          onClick={() => paginate(number)}
        >
          {number}
        </Pagination.Item>
      ))}
      <Pagination.Next
        onClick={() =>
          currentPage < pageNumbers[pageNumbers.lenght - 1] &&
          paginate(currentPage + 1)
        }
      />
    </Pagination>
  );
};

export default PaginationListagem;
