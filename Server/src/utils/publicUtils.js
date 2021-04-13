import moment from "moment";
import Dia from "../models/dia.js";
import mongoose from "mongoose";

export const getWeekSchedules = async () => {
  const days = await Dia.find();

  const week = getCurrentWeek().map((day) => moment(day.date, "DD/MM/yyyy"));
  const weekTop2 = week.map((day) =>
    days.find((schedule) => schedule.date === day._i)
      ? {
          day: days.find((schedule) => schedule.date === day._i).date,
          schedules: days.find((schedule) => schedule.date === day._i)
            .schedules,
          avaibility: "danger",
        }
      : { day: day._i, schedules: [], avaibility: "success" }
  );

  const weekTop3 = weekTop2.map(
    (day) =>
      true && {
        day: day.day,
        schedules: day.schedules.map(
          (schedule) =>
            true && {
              _id: schedule._id,
              schedule: schedule.schedule,
              pacientId: schedule.pacientId,
              pacientAge: schedule.pacientAge,
              avaiablity: check(schedule, day),
            }
        ),
      }
  );

  return weekTop3;
};

export const check = (interval, day) => {
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
          moment().diff(moment(schedule.pacientAge, "DD/MM/yyyy"), "years") > 60
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

export const getCurrentWeek = () => {
  const diasDaSemana = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ];
  var currentDate = moment();

  var weekStart = currentDate.clone().startOf("week");

  var days = [];

  for (var i = 0; i <= 6; i++) {
    days.push({
      show:
        diasDaSemana[i] + moment(weekStart).add(i, "days").format(` - DD/MM`),
      date: moment(weekStart).add(i, "days").format(`DD/MM/yyyy`),
    });
  }
  return days;
};
