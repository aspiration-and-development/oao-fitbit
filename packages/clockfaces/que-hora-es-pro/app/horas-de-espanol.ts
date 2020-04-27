import { escribeNumero } from "./numeros-de-espanol"
import { horasStringList } from "../strings";
 
const MAX_MINUTOS_LENGTH = 15

export type Opciones = {
    usarEnPunto?: boolean
    usarMedia?: boolean
    usarCuarto?: boolean
    usarPara?: boolean
    usarMenos?: boolean
    usarCon?: boolean
    usarY?: boolean
    usarHorasCortas?: Boolean
}

export type HorasNormales = {
    tiempo: string
    horasLeteras: string
    minutosLeteras: string
    preMinuto: string
    cuando: string
    diaDeSemana: string
}

export default (
    dia: number,
    horas: number,
    minutos: number,
    opciones: Opciones
): HorasNormales => {
    let {
        usarEnPunto,
        usarHorasCortas,
        usarCon,
        usarY
    } = opciones

  let horasPorUsar = usarHorasCortas ? (horas % 12) || 12 : horas
  let horasLeteras = escribeNumero(horasPorUsar).pop()
  let minutosLeterasRaw = escribeNumero(minutos)
  let isPunto = minutos === 0
  let isSingular = horasPorUsar === 1
  
  let tiempo = horasStringList['Son las'].value;
  if (isSingular) tiempo = horasStringList['Es la'].value;
  
  const diaDeSemana = horasStringList[dia].value;
  
  let cuando = horasStringList['de la mañana'].value
  if (horas < 6) cuando = horasStringList['de la madrugada'].value
  if (horas >= 12) cuando = horasStringList['del mediadia'].value
  if (horas >= 13) cuando = horasStringList['de la tarde'].value
  if (horas > 20) cuando = horasStringList['de la noche'].value
  
  let minutosLeteras = minutosLeterasRaw.join(' y ')
  let isComposed = minutosLeteras.length === 2
  let preMinuto = ''
  if (isPunto && usarEnPunto) {
      minutosLeteras = horasStringList['en punto'].value
    } else if (usarCon && minutosLeteras.length + 5 <= MAX_MINUTOS_LENGTH) {
        preMinuto = horasStringList['con'].value
    } else if (usarY && minutosLeteras.length + 3 <= MAX_MINUTOS_LENGTH && !isComposed) {
        preMinuto = horasStringList['y'].value
    }


  return {
      tiempo,
      horasLeteras,
      minutosLeteras,
      preMinuto,
      cuando,
      diaDeSemana
  }
}
