import React from "react";
import Table from "react-bootstrap/Table";
import CalendarDay from "./CalendarDay/CalendarDay";
const Calendar = () => {
  const n = 30;
  const w = 7;
  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>Dom</th>
          <th>Seg</th>
          <th>Ter</th>
          <th>Qua</th>
          <th>Qui</th>
          <th>Sex</th>
          <th>Sab</th>
        </tr>
      </thead>
      <tbody>
        {[...Array(n)].map(() => (
          <tr key={Math.random()}>
            {[...Array(w)].map(() => (
              <td key={Math.random()}>
                <CalendarDay />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default Calendar;
