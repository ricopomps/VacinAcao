import moment from "moment";
import { legenda, dateFormat, hourFormat } from "../constants/mainConstants";

export const getTooltip = (check) => {
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
export const check = (interval, day) => {
  if (
    day.schedules.length > 19 ||
    moment(day.day, dateFormat).isBefore(moment(moment(), dateFormat), "day") ||
    (moment(day.day, dateFormat).isSame(moment(moment(), dateFormat), "day") &&
      moment().isAfter(moment(interval, hourFormat)))
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
          moment().diff(moment(schedule.pacientAge, dateFormat), "years") > 60
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
