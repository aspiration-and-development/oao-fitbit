import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import getRandomItem from "@/utils/getRandomItem";
import init, { Usettings } from "./settings";
import horasDeEspanol from "./horas-de-espanol";
// Update the clock every minute
clock.granularity = "minutes";

// Get a handle on the <text> element
const indicatorDeAmPm = document.getElementById("ampm");
const indicatorDeVez = document.getElementById("vez");
const indicatorDeDia = document.getElementById("dia");
const indicatorDeHora = document.getElementById("hora");
const indicatorDeMinuto = document.getElementById("minuto");

// const { clockDisplay } = preferences;
// clockDisplay === "12h" ? false : true

const STATE: {
  settings: Usettings
  dia: number
  horas: number
  minutos: number
} = {
  settings: {
    military: false
  },
  dia: 0,
  horas: 0,
  minutos: 0
}

function render () {
  let {
    settings: {
      military
    },
    dia,
    horas,
    minutos,
  } = STATE
  if (military === null)
    military = preferences.clockDisplay === '24h' ? true : false
  const usarHorasCortas = !military

  const usarEnPunto = getRandomItem([1, 0]);
  const usarCon = getRandomItem([0, 1]);
  const usarY = getRandomItem([1, 0]);

  const {
    tiempo,
    horasLeteras,
    preMinuto,
    minutosLeteras,
    cuando,
    diaDeSemana
  } = horasDeEspanol(dia, horas, minutos, {
    usarEnPunto,
    usarHorasCortas,
    usarCon,
    usarY
  });

  const tampm = military ? '' : cuando
  indicatorDeVez.text = `${tiempo}`;
  indicatorDeDia.text = `${diaDeSemana}`;
  indicatorDeHora.text = `${horasLeteras}`;
  indicatorDeMinuto.text = `${preMinuto} ${minutosLeteras}`;
  indicatorDeAmPm.text = `${tampm}`;
}

init((settings: Usettings) => {
  STATE.settings = settings

  render()
})

// Update the <text> element every tick with the current time
clock.ontick = evt => {
  const ahora = evt.date;
  const dia = ahora.getDay();
  const horas = ahora.getHours();
  const minutos = ahora.getMinutes();

  STATE.dia = dia;
  STATE.horas = horas
  STATE.minutos = minutos

  render()
};
