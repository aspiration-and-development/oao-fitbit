import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import hoursInRussian from "@/ru/hours-in-russian";
import { initialize } from "@/shared/device-settings";
// Update the clock every minute
clock.granularity = "minutes";

// Get a handle on the <text> element
const ampmIndicator = document.getElementById("ampm");
const hoursIndicator = document.getElementById("hours");
const hoursLabelIndicator = document.getElementById("hours-label");
const minutesIndicator = document.getElementById("minutes");
const minutesLabelIndicator = document.getElementById("minutes-label");
const dayIndicator = document.getElementById("day");

type UserSettings = {
  showDay: boolean;
}

const defaultSettings: UserSettings = { showDay: false };

const STATE: {
  day: number
  hours: number
  minutes: number
  settings: UserSettings
} = {
  day: 0,
  hours: 0,
  minutes: 0,
  settings: defaultSettings
}

function render() {
  let {
    settings: { showDay },
    day,
    hours,
    minutes,
  } = STATE
  const { clockDisplay } = preferences;
  const useShortHours = clockDisplay === "12h" ? true : false;

  const {
    hoursSpelled,
    minutesSpelled,
    weekDay,
    when,
    hourLable,
    minuteLable,
  } = hoursInRussian(day, hours, minutes, {
    useShortHours
  });
  const tampm = useShortHours ? `${when}` : '';
  hoursIndicator && (hoursIndicator.text = `${hoursSpelled}`);
  minutesIndicator && (minutesIndicator.text = `${minutesSpelled}`);
  dayIndicator.text = showDay ? weekDay : '';
  ampmIndicator && (ampmIndicator.text = `${tampm}`);

  hoursLabelIndicator.text = hourLable
  minutesLabelIndicator.text = minuteLable
}

initialize((settings: UserSettings) => {
  STATE.settings = settings;
  render()
})

// Update the <text> element every tick with the current time
clock.ontick = evt => {
  const today = evt.date;
  const hours = today.getHours();
  const minutes = today.getMinutes();
  const day = today.getDay();

  STATE.hours = hours
  STATE.minutes = minutes
  STATE.day = day;

  render()
};
