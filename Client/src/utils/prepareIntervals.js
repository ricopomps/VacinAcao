import moment from "moment";
export function prepareIntervals() {
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
