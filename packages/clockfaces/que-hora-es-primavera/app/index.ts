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
};

const root = document.getElementById("root");

const vez = new FitFont({
  id: "vez", // id of your symbol in the index.gui, you can also give an element object e.g. id: document.getElementById('foo')
  font: "HotTamale_40", // name of the generated font folder

  // Optional
  halign: "middle", // horizontal alignment : start / middle / end
  // valign: 'baseline',         // vertical alignment   : baseline / top / middle / bottom
  // letterspacing: 0            // letterspacing...
});

const hora = new FitFont({
  id: "hora",
  font: "HotTamale_45",
  halign: "middle",
});

const minuto = new FitFont({
  id: "minuto",
  font: "HotTamale_35",
  halign: "middle",
});

const minutoOverflow = new FitFont({
  id: "minuto-overflow",
  font: "HotTamale_35",
  halign: "middle",
});

const diafont = new FitFont({
  id: "dia",
  font: "HotTamale_45",
  halign: "middle",
});

const pre = new FitFont({
  id: "pre",
  font: "HotTamale_40",
  halign: "end",
});

const ampmfont = new FitFont({
  id: "ampm",
  font: "HotTamale_45",
  halign: "middle",
});

const STATE: {
  settings: Usettings;
  dia: number;
  horas: number;
  minutos: number;
} = {
  settings: {
    mostrarDia: false,
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
    settings: { mostrarDia },
    dia,
    horas,
    minutos,
  } = STATE;

  const usarHorasCortas = preferences.clockDisplay === "24h" ? false : true;
  const usarEnPunto = getRandomItem([1, 0]);
  const usarCon = getRandomItem([0, 1]);
  const usarY = getRandomItem([1, 0]);

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

  const isOneLineMinute = minutos > 32;

  const minutoText = isOneLineMinute ? minutosLeterasRaw[0] : minutosLeteras;
  const minutoOverflowText = isOneLineMinute
    ? `${strings["y"].value} ${minutosLeterasRaw[1]}`
    : "";

  const tampm = usarHorasCortas ? cuando : "";
  vez.text = `${tiempo.toUpperCase()}`;
  hora.text = `${horasLeteras.toUpperCase()}`;
  minuto.text = `${minutoText.toUpperCase()}`;
  minutoOverflow.text = `${minutoOverflowText.toUpperCase()}`;
  diafont.text = mostrarDia ? `${diaDeSemana.toUpperCase()}` : "";
  pre.text = tampm ? cuandoPre.toUpperCase() : "";
  ampmfont.text = `${tampm.toUpperCase()}`;
}

initialize((settings: Usettings) => {
  STATE.settings = settings;
  if (settings.mostrarDia) {
    root.class = addToCollection(root.class, 'mostrar-dia');
  } else {
    root.class = removeFromCollection(root.class, 'mostrar-dia');
  }
  render();
});

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  const ahora = evt.date;
  const dia = ahora.getDay();
  const horas = ahora.getHours();
  const minutos = ahora.getMinutes();

  STATE.dia = dia;
  STATE.horas = horas;
  STATE.minutos = minutos;

  render();
};
