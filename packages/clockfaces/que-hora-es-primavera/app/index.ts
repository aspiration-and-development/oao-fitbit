import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import getRandomItem from "@/shared/utils/getRandomItem";
import { initialize } from "@/shared/device-settings";
import horasDeEspanol from "@/es/horas-de-espanol";
import { FitFont } from "fitfont";
import strings from "@/es/strings";
// Update the clock every minute
clock.granularity = "minutes";

type Usettings = {
  mostrarDia: boolean;
  usarHorasCortas: boolean;
};

const root = document.getElementById("root");

const vez = new FitFont({
  id: "vez", // id of your symbol in the index.gui, you can also give an element object e.g. id: document.getElementById('foo')
  font: "Retwisted_30", // name of the generated font folder

  // Optional
  halign: "middle", // horizontal alignment : start / middle / end
  // valign: 'baseline',         // vertical alignment   : baseline / top / middle / bottom
  letterspacing: 0
});

const hora = new FitFont({
  id: "hora",
  font: "Retwisted_43",
  halign: "middle",
  letterspacing: -2
});

const minuto = new FitFont({
  id: "minuto",
  font: "Retwisted_37",
  halign: "middle",
});

const minutoOverflow = new FitFont({
  id: "minuto-overflow",
  font: "Retwisted_37",
  halign: "middle",
});

const diafont = new FitFont({
  id: "dia",
  font: "Retwisted_43",
  halign: "middle",
});

const pre = new FitFont({
  id: "pre",
  font: "Retwisted_30",
  halign: "end",
});

const ampmfont = new FitFont({
  id: "ampm",
  font: "Retwisted_43",
  halign: "middle",
  letterspacing: -4
});

const STATE: {
  settings: Usettings;
  dia: number;
  horas: number;
  minutos: number;
} = {
  settings: {
    mostrarDia: false,
    usarHorasCortas: false,
  },
  dia: 0,
  horas: 0,
  minutos: 0,
};

const dedupe = (arr: string[]) => arr.filter(function (el, i, arr) {
	return arr.indexOf(el) === i;
});

const addToCollection = (collection: string, value: string) => {
  const newCollection = collection.split(' ').concat(value)
  const collectionSet = dedupe(newCollection);
  return collectionSet.join(" ");
}

const removeFromCollection = (collection: string, value: string) => {
  const newCollection = collection.split(' ')
  const collectionSet = dedupe(newCollection);
  return collectionSet.filter(item => item !== value).join(" ")
}

function render() {
  const {
    settings: { mostrarDia, usarHorasCortas },
    dia,
    horas,
    minutos,
  } = STATE;

  const usarEnPunto = getRandomItem([1, 0]);
  const usarCon = getRandomItem([0, 1]);
  const usarY = getRandomItem([1, 0]);

  if (mostrarDia) {
    root.class = addToCollection(root.class, 'mostrar-dia');
  } else {
    root.class = removeFromCollection(root.class, 'mostrar-dia');
  }

  if (usarHorasCortas) {
    root.class = addToCollection(root.class, 'usar-horas-cortas');
  } else {
    root.class = removeFromCollection(root.class, 'usar-horas-cortas');
  }

  const {
    tiempo,
    horasLeteras,
    minutosLeteras,
    minutosLeterasRaw,
    cuando,
    cuandoPre,
    diaDeSemana,
  } = horasDeEspanol(dia, horas, minutos, {
    usarEnPunto,
    usarHorasCortas,
    usarCon,
    usarY,
  });

  const isOneLineMinute = minutos > 30 && minutos % 10;

  const minutoText = isOneLineMinute ? minutosLeterasRaw[0] : minutosLeteras;
  const minutoOverflowText = isOneLineMinute
    ? `${strings["y"].value} ${minutosLeterasRaw[1]}`
    : "";

  const tampm = usarHorasCortas ? cuando : "";
  vez.text = `${tiempo}`;
  hora.text = `${horasLeteras}`;
  minuto.text = `${minutoText}`;
  minutoOverflow.text = `${minutoOverflowText}`;
  diafont.text = mostrarDia ? `${diaDeSemana}` : "";
  pre.text = tampm ? cuandoPre : "";
  ampmfont.text = `${tampm}`;
}

initialize((settings: Usettings) => {
  STATE.settings = settings;
  render();
});

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  const ahora = evt.date;
  const dia = ahora.getDay();
  const horas = ahora.getHours();
  const minutos = ahora.getMinutes();
  const usarHorasCortas = preferences.clockDisplay === "24h" ? false : true;

  STATE.dia = dia;
  STATE.horas = horas;
  STATE.minutos = minutos;
  STATE.settings.usarHorasCortas = usarHorasCortas;

  render();
};
