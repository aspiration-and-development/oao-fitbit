import { escribeNumero } from "./numeros-de-espanol";
import strings from "./strings";

const MAX_MINUTOS_LENGTH = 15;

export type Opciones = {
  usarEnPunto?: boolean;
  usarMedia?: boolean;
  usarCuarto?: boolean;
  usarPara?: boolean;
  usarMenos?: boolean;
  usarCon?: boolean;
  usarY?: boolean;
  usarHorasCortas?: Boolean;
};

export type HorasNormales = {
  tiempo: string;
  horasLeteras: string;
  minutosLeteras: string;
  minutosLeterasRaw: string[];
  preMinuto: string;
  cuando: string;
  cuandoPre: string;
  diaDeSemana: string;
};

export default (
  dia: number,
  horas: number,
  minutos: number,
  opciones: Opciones
): HorasNormales => {
  let { usarEnPunto, usarHorasCortas, usarCon, usarY } = opciones;

  let horasPorUsar = usarHorasCortas ? horas % 12 || 12 : horas;
  let horasLeteras = escribeNumero(horasPorUsar)[0];
  let minutosLeterasRaw = escribeNumero(minutos);
  let isPunto = minutos === 0;
  let isSingular = horasPorUsar === 1;

  let tiempo = strings["son-las"].value;
  if (isSingular) tiempo = strings["es-la"].value;

  const diaDeSemana = strings[`dia-${dia}`].value;

  let cuando = strings["mañana"].value;
  let cuandoPre = strings["mañana"].pre;
  if (horas < 6) {
    cuando = strings["madrugada"].value;
    cuandoPre = strings["madrugada"].pre;
  }
  if (horas >= 12) {
    cuando = strings["mediadia"].value;
    cuandoPre = strings["mediadia"].pre;
  }
  if (horas >= 13) {
    cuando = strings["tarde"].value;
    cuandoPre = strings["tarde"].pre;
  }
  if (horas > 20) {
    cuando = strings["noche"].value;
    cuandoPre = strings["noche"].pre;
  }

  let minutosLeteras = minutosLeterasRaw.join(` ${strings["y"].value} `);
  let isComposed = minutosLeteras.length === 2;
  let preMinuto = "";
  if (isPunto && usarEnPunto) {
    minutosLeteras = strings["punto"].value;
  } else if (usarCon && minutosLeteras.length + 5 <= MAX_MINUTOS_LENGTH) {
    preMinuto = strings["con"].value;
  } else if (
    usarY &&
    minutosLeteras.length + 3 <= MAX_MINUTOS_LENGTH &&
    !isComposed
  ) {
    preMinuto = strings["y"].value;
  }

  return {
    tiempo,
    horasLeteras,
    minutosLeteras,
    minutosLeterasRaw,
    preMinuto,
    cuando,
    cuandoPre,
    diaDeSemana,
  };
};
