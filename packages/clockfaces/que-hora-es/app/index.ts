import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import getRandomItem from "@/shared/utils/getRandomItem";
import horasDeEspanol from "@/es/horas-de-espanol";
import { initialize } from "@/shared/device-settings";
// Update the clock every minute
clock.granularity = "minutes";

// Get a handle on the <text> element
const ampm = document.getElementById("ampm");
const vez = document.getElementById("vez");
const hora = document.getElementById("hora");
const minuto = document.getElementById("minuto");
const diaIndicator = document.getElementById("dia");

const { clockDisplay } = preferences;

type UserSettings = {
  mostrarDia: boolean;
}

const defaultSettings = {mostrarDia: false};

const STATE: {
  dia: number
  horas: number
  minutos: number
  settings: UserSettings
} = {
  dia: 0,
  horas: 0,
  minutos: 0,
  settings: defaultSettings
}

function render () {
  let {
    settings: { mostrarDia },
    dia,
    horas,
    minutos,
  } = STATE
  const usarHorasCortas = clockDisplay === "12h" ? true : false;

  const usarEnPunto = getRandomItem([1, 0]);
  const usarCon = getRandomItem([0, 1]);
  const usarY = getRandomItem([1, 0]);

  const {
    tiempo,
    horasLeteras,
    preMinuto,
    minutosLeteras,
    diaDeSemana,
    cuando
  } = horasDeEspanol(dia, horas, minutos, {
    usarEnPunto,
    usarHorasCortas,
    usarCon,
    usarY
  });
    const tampm = usarHorasCortas ? '' : cuando
    vez && (vez.text = `${tiempo}`);
    hora && (hora.text = `${horasLeteras}`);
    minuto && (minuto.text = `${preMinuto} ${minutosLeteras}`);
    diaIndicator.text = mostrarDia ? diaDeSemana : '';
    ampm && (ampm.text = `${tampm}`);
}

initialize((settings: UserSettings) => {
  STATE.settings = settings;
  render()
})

// Update the <text> element every tick with the current time
clock.ontick = evt => {
  const hoy = evt.date;
  const horas = hoy.getHours();
  const minutos = hoy.getMinutes();
  const dia = hoy.getDay();

  STATE.horas = horas
  STATE.minutos = minutos
  STATE.dia = dia;

  render()
};
