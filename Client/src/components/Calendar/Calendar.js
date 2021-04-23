import React, { useContext } from "react";
import Table from "react-bootstrap/Table";
import moment from "moment";
import AppContext from "../../AppContext";
import { prepareIntervals } from "../../utils/prepareIntervals";
import CalendarDay from "./CalendarDay/CalendarDay";
import PaginationComponent from "../../components/Pagination/Pagination";
const Calendar = () => {
  const [{ week, numWeek }, dispatch] = useContext(AppContext);

  const diasDaSemana = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ];

  const legenda = {
    livre: "success",
    umaVaga: "warning",
    apenasIdosos: "primary",
    semVagas: "danger",
  };

  const getTooltip = (check) => {
    switch (check) {
      case legenda.livre:
        return "Livre";
      case legenda.umaVaga:
        return "Uma vaga";
      case legenda.apenasidosos:
        return "Apenas idosos";
      case legenda.semVagas:
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
      return legenda.semVagas;
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
          return legenda.semVagas;
        }
        return legenda.apenasIdosos;
      }
      return legenda.umaVaga;
    } else {
      return legenda.livre;
    }
  };
  return (
    <>
      <PaginationComponent
        onBack={() =>
          numWeek > 0 &&
          dispatch({
            type: "CHANGE_WEEK",
            payload: { numWeek: numWeek - 1 },
          })
        }
        onCenter={() =>
          dispatch({
            type: "CHANGE_WEEK",
            payload: { numWeek: 0 },
          })
        }
        onFront={() =>
          dispatch({
            type: "CHANGE_WEEK",
            payload: { numWeek: numWeek + 1 },
          })
        }
      ></PaginationComponent>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            {week.map((dia, index) => (
              <th key={index}>
                {diasDaSemana[index] +
                  moment(moment().add(numWeek, "weeks").startOf("week"))
                    .add(index, "days")
                    .format(` - DD/MM`)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {prepareIntervals().map((interval) => (
            <tr key={Math.random()}>
              {week.map((day) => (
                <td key={Math.random()}>
                  <CalendarDay
                    vacancy={check(interval, day)}
                    tooltip={getTooltip(check(interval, day))}
                    disabled={check(interval, day) === legenda.semVagas}
                    onClick={() => {
                      dispatch({
                        type: "SET_FORM",
                        payload: {
                          schedule: interval,
                          date: moment(day.day, "DD/MM/YYYY").toDate(),
                        },
                      });
                    }}
                  >
                    {interval}
                  </CalendarDay>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default Calendar;
