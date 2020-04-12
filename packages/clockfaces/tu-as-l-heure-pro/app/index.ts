import clock from "clock";
import document from "document";
import timeInFrench from "./time-in-french";
// Update the clock every minute
clock.granularity = "minutes";

// Get a handle on the <text> element
const eampm = document.getElementById("ampm");
const etime = document.getElementById("time");
const ehour = document.getElementById("hour");
const eminute = document.getElementById("minute");
const daycont = document.getElementById("day");

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  const today = evt.date;
  const nowHour = today.getHours();
  const nowMinute = today.getMinutes();
  const day = today.getDay();
  const {
    time,
    minutesSpelled,
    hoursSpelled,
    hoursVerbatim,
    when,
    dayWord,
  } = timeInFrench(nowHour, nowMinute, day)
  etime.text = `${time}`
  ehour.text = `${hoursSpelled} ${hoursVerbatim}`
  eminute.text = `${minutesSpelled}`
  eampm.text = `${when}`;
  daycont.text = `${dayWord}`;
}
