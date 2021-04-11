import React from "react";
import Table from "react-bootstrap/Table";
import { prepareIntervals } from "../../utils/prepareIntervals";
import CalendarDay from "./CalendarDay/CalendarDay";
const Calendar = () => {
  const diasDaSemana = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ];
  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          {diasDaSemana.map((dia, index) => (
            <th key={index}>{dia}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {prepareIntervals().map((interval, indexn: index) => (
          <tr key={Math.random()}>
            {diasDaSemana.map((map, indexw: index) => (
              <td key={Math.random()}>
                <CalendarDay
                  vacancy="success"
                  onClick={() => console.log(map, interval)}
                >
                  {interval}
                </CalendarDay>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default Calendar;
