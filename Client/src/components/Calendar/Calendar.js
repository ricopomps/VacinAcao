import React from "react";
import Table from "react-bootstrap/Table";

import { prepareIntervals } from "../../utils/prepareIntervals";
import { PrepareValidSchedules } from "../../utils/prepareValidSchedules";
import { getCurrentWeek } from "../../utils/getCurrentWeek";
import CalendarDay from "./CalendarDay/CalendarDay";
const Calendar = () => {
  const days = PrepareValidSchedules();
  const check = (interval, day) => {
    if (day.schedules.find((schedule) => schedule.schedule === interval)) {
      return "danger";
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
