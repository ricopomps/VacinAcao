import React from "react";
import Table from "react-bootstrap/Table";
import moment from "moment";
import { prepareIntervals } from "../../utils/prepareIntervals";
import CalendarDay from "./CalendarDay/CalendarDay";
const Calendar = () => {
  moment.locale("pt-br");
  const diasDaSemana = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ];
  function getCurrentWeek() {
    var currentDate = moment();

    var weekStart = currentDate.clone().startOf("week");

    var days = [];

    for (var i = 0; i <= 6; i++) {
      days.push(
        diasDaSemana[i] + moment(weekStart).add(i, "days").format(` - DD/MM`)
      );
    }
    return days;
  }

  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          {getCurrentWeek().map((dia, index) => (
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
