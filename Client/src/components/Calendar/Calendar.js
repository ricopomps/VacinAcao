import React from "react";
import Table from "react-bootstrap/Table";
import CalendarDay from "./CalendarDay/CalendarDay";
const Calendar = () => {
  const n = 30;
  return (
    <Table resposive striped bordered hover size="sm">
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
          <tr>
            <td>
              <CalendarDay />
            </td>
            <td>
              <CalendarDay />
            </td>
            <td>
              <CalendarDay />
            </td>
            <td>
              <CalendarDay />
            </td>
            <td>
              <CalendarDay />
            </td>
            <td>
              <CalendarDay />
            </td>
            <td>
              <CalendarDay />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default Calendar;
