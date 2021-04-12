import { getCurrentWeek } from "./getCurrentWeek";
import { useContext } from "react";
import moment from "moment";
import AppContext from "../AppContext";

export const PrepareValidSchedules = (dia, schedule, agendamentos) => {
  const [{ days }] = useContext(AppContext);
  const week = getCurrentWeek().map((day) => moment(day.date));
  const weekTop2 = week.map((day) =>
    days.find((schedule) => schedule.date === day._i)
      ? {
          day: days.find((schedule) => schedule.date === day._i).date,
          schedules: days.find((schedule) => schedule.date === day._i)
            .schedules,
        }
      : { day: day._i, schedules: [] }
  );
  return weekTop2;
};
