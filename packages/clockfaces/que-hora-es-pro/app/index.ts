import clock from "clock";
import { preferences } from "user-settings";
import getRandomItem from "@/utils/getRandomItem";
import init, { Usettings } from "./settings";
import horasDeEspanol from "@/shared/es/horas-de-espanol";
import { FitFont } from 'fitfont';
// Update the clock every minute
clock.granularity = "minutes";

const vez = new FitFont({ 
    id:'vez',               // id of your symbol in the index.gui, you can also give an element object e.g. id: document.getElementById('foo')
    font:'Patterns_&_Dots_40',  // name of the generated font folder

    // Optional
    halign: 'middle',            // horizontal alignment : start / middle / end
    // valign: 'baseline',         // vertical alignment   : baseline / top / middle / bottom
    // letterspacing: 0            // letterspacing...
});

const hora = new FitFont({ 
  id:'hora',               // id of your symbol in the index.gui, you can also give an element object e.g. id: document.getElementById('foo')
  font:'Patterns_&_Dots_40',  // name of the generated font folder
  halign: 'middle',            // horizontal alignment : start / middle / end
});

const minuto = new FitFont({ 
  id:'minuto',               // id of your symbol in the index.gui, you can also give an element object e.g. id: document.getElementById('foo')
  font:'Patterns_&_Dots_40',  // name of the generated font folder
  halign: 'middle',            // horizontal alignment : start / middle / end
});

const diafont = new FitFont({ 
  id:'dia',               // id of your symbol in the index.gui, you can also give an element object e.g. id: document.getElementById('foo')
  font:'Patterns_&_Dots_40',  // name of the generated font folder
  halign: 'middle',            // horizontal alignment : start / middle / end
});

const ampmfont = new FitFont({ 
  id:'ampm',               // id of your symbol in the index.gui, you can also give an element object e.g. id: document.getElementById('foo')
  font:'Patterns_&_Dots_40',  // name of the generated font folder
  halign: 'middle',            // horizontal alignment : start / middle / end
});

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
  const {
    settings: {
      military: settingsMilitary
    },
    dia,
    horas,
    minutos,
  } = STATE
  const military = preferences.clockDisplay === '24h' ? true : false
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
  vez.text = `${String(settingsMilitary).toUpperCase()}`;
  hora.text = `${horasLeteras.toUpperCase()}`
  minuto.text = `${preMinuto.toUpperCase()} ${minutosLeteras.toUpperCase()}`
  diafont.text = `${diaDeSemana.toUpperCase()}`
  ampmfont.text = `${tampm.toUpperCase()}`
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
