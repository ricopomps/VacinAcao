import React, { useContext } from "react";
import Table from "react-bootstrap/Table";
import moment from "moment";
import AppContext from "../../AppContext";
import { diasDaSemana, legenda } from "../../constants/mainConstants";
import { prepareIntervals } from "../../utils/prepareIntervals";
import { check, getTooltip } from "../../utils/calendarUtils";
import CalendarDay from "./CalendarDay/CalendarDay";
import PaginationComponent from "../../components/Pagination/Pagination";
import { CHANGE_WEEK, SET_FORM } from "../../constants/reducerConstants";

const Calendar = () => {
  const [{ week, numWeek }, dispatch] = useContext(AppContext);

  return (
    <>
      <PaginationComponent
        onBack={() =>
          numWeek > 0 &&
          dispatch({
            type: CHANGE_WEEK,
            payload: { numWeek: numWeek - 1 },
          })
        }
        onCenter={() =>
          dispatch({
            type: CHANGE_WEEK,
            payload: { numWeek: 0 },
          })
        }
        onFront={() =>
          dispatch({
            type: CHANGE_WEEK,
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
          {prepareIntervals().map((interval, index) => (
            <tr key={index}>
              {week.map((day, index) => (
                <td key={index}>
                  <CalendarDay
                    vacancy={check(interval, day)}
                    tooltip={getTooltip(check(interval, day))}
                    disabled={check(interval, day) === legenda.semVagas}
                    onClick={() => {
                      dispatch({
                        type: SET_FORM,
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
