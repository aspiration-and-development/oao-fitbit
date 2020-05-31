import { writeNumber } from "./numbers-in-russian";
import strings from "./strings";

export type Options = {
  useShortHours?: Boolean;
};

export type TimeSpelled = {
  hoursSpelled: string;
  minutesSpelled: string;
  minutesSpelledRaw: string[];
  when: string;
  weekDay: string;
  hourLable: string;
  minuteLable: string;
};

export default (
  day: number,
  hours: number,
  minutes: number,
  options: Options
): TimeSpelled => {
  let { useShortHours } = options;

  let hoursToUse = useShortHours ? hours % 12 || 12 : hours;
  let hoursSpelled = writeNumber(hoursToUse).join(' ');
  let minutesSpelledRaw = writeNumber(minutes, true);


  const weekDay = strings[`day-${day}`].value;

  let when = strings["morning"].value;
  if (hours < 6) {
    when = strings["morning"].value;
  }
  if (hours >= 12) {
    when = strings["day"].value;
  }
  if (hours >= 17) {
    when = strings["evening"].value;
  }
  if (hours > 21) {
    when = strings["night"].value;
  }

  let minutesSpelled = minutesSpelledRaw.join(' ');

  const hoursDiv = hoursToUse % 20;
  let hourLableProp = hoursDiv === 1 ? 'single' : 'value'
  if (hoursDiv > 1) {
    hourLableProp = hoursDiv > 4 ? 'value' : 'value2'
  }
  let hourLable = strings['hours'][hourLableProp];

  const minuteDiv = minutes < 20 ? minutes % 20 : minutes % 10;
  let minuteLableProp = minuteDiv === 1 ? 'single' : 'value'
  if (minuteDiv > 1) {
    minuteLableProp = minuteDiv > 4 ? 'value' : 'value2'
  }
  const minuteLable = strings['minutes'][minuteLableProp];

  return {
    hoursSpelled,
    minutesSpelled,
    minutesSpelledRaw,
    when,
    weekDay,
    hourLable,
    minuteLable
  };
};
