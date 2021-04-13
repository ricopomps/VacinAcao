import React from "react";
import Table from "react-bootstrap/Table";
import moment from "moment";
import { prepareIntervals } from "../../utils/prepareIntervals";
import { PrepareValidSchedules } from "../../utils/prepareValidSchedules";
import { getCurrentWeek } from "../../utils/getCurrentWeek";
import CalendarDay from "./CalendarDay/CalendarDay";
const Calendar = () => {
  const days = PrepareValidSchedules();
  const getTooltip = (check) => {
    switch (check) {
      case "success":
        return "Livre";
      case "warning":
        return "Uma vaga";
      case "primary":
        return "Apenas idosos";
      case "danger":
        return "Sem vagas";
      default:
        return "Agendamento";
    }
  };
  const check = (interval, day) => {
    if (
      day.schedules.length > 19 ||
      moment(day.day, "DD/MM/yyyy").isBefore(
        moment(moment(), "DD/MM/yyyy"),
        "day"
      ) ||
      (moment(day.day, "DD/MM/yyyy").isSame(
        moment(moment(), "DD/MM/yyyy"),
        "day"
      ) &&
        moment().isAfter(moment(interval, "HH:mm")))
    ) {
      return "danger";
    }

    if (day.schedules.find((schedule) => schedule.schedule === interval)) {
      const schedules = day.schedules.filter(
        (schedule) => schedule.schedule === interval
      );
      if (schedules.length > 1) {
        const idosos = schedules.filter(
          (schedule) =>
            moment().diff(moment(schedule.pacientAge, "DD/MM/yyyy"), "years") >
            60
        );
        if (idosos.length > 1) {
          return "danger";
        }
        return "primary";
      }
      return "warning";
    } else {
      return "success";
    }
  };
  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          {getCurrentWeek().map((dia, index) => (
            <th key={index}>{dia.show}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {prepareIntervals().map((interval) => (
          <tr key={Math.random()}>
            {days.map((day) => (
              <td key={Math.random()}>
                <CalendarDay
                  vacancy={check(interval, day)}
                  tooltip={getTooltip(check(interval, day))}
                  disabled={check(interval, day) === "danger"}
                  onClick={() => console.log(day, interval)}
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
