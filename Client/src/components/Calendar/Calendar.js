import React from "react";
import Table from "react-bootstrap/Table";
import moment from "moment";
import CalendarDay from "./CalendarDay/CalendarDay";
const Calendar = () => {
  let value = {
    interval: "00:30:00",
    startTime: "08:30:00",
    endTime: "18:00:00",
  };

  let inputDataFormat = "HH:mm:ss";
  let outputFormat = "HH:mm";

  let tmp = moment(value.interval, inputDataFormat);
  let dif = tmp - moment().startOf("day");

  let startIntervalTime = moment(value.startTime, inputDataFormat).add(
    -dif,
    "ms"
  );
  let endIntervalTime = moment(value.startTime, inputDataFormat);
  let finishTime = moment(value.endTime, inputDataFormat);

  function prepareIntervals() {
    let intervals = [];

    while (startIntervalTime < finishTime) {
      let format =
        startIntervalTime.format(outputFormat) +
        " - " +
        endIntervalTime.format(outputFormat);
      intervals.push(format);
      startIntervalTime.add(dif, "ms");
      endIntervalTime.add(dif, "ms");
    }

    return intervals;
  }

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
          <th>Dom</th>
          <th>Seg</th>
          <th>Ter</th>
          <th>Qua</th>
          <th>Qui</th>
          <th>Sex</th>
          <th>Sab</th>
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
