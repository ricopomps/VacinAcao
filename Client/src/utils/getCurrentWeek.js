import moment from "moment";
export function getCurrentWeek() {
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
}
