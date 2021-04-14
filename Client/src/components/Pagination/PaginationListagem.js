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

  const arr = Array.from(Array(currentPage).keys());

  return (
    <Pagination>
      <Pagination.First onClick={() => paginate(1)} />
      <Pagination.Prev
        onClick={() => currentPage > 1 && paginate(currentPage - 1)}
      />
      {arr.map((number) => (
        <Pagination.Item key={number + 1} onClick={() => paginate(number + 1)}>
          {number + 1}
        </Pagination.Item>
      ))}
      <Pagination.Next onClick={() => paginate(currentPage + 1)} />
    </Pagination>
  );
};

export default PaginationListagem;
