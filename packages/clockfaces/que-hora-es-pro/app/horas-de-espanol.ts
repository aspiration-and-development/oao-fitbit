import { escribeNumero } from "./numeros-de-espanol"

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

const laMapaDeDiasDeSemana = [
    'domingo',
    'lunes',
    'martes',
    'miércoles',
    'jueves',
    'viernes',
    'sábado',
];



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
  
  let tiempo = `Son las`
  if (isSingular) tiempo = `Es la`
  
  const diaDeSemana = laMapaDeDiasDeSemana[dia];
  
  let cuando = 'de la mañana'
  if (horas < 6) cuando = 'de la madrugada'
  if (horas >= 12) cuando = 'del mediadia'
  if (horas >= 13) cuando = 'de la tarde'
  if (horas > 20) cuando = 'de la noche'
  
  let minutosLeteras = minutosLeterasRaw.join(' y ')
  let isComposed = minutosLeteras.length === 2
  let preMinuto = ''
  if (isPunto && usarEnPunto) {
      minutosLeteras = 'en punto'
    } else if (usarCon && minutosLeteras.length + 5 <= MAX_MINUTOS_LENGTH) {
        preMinuto = 'con'
    } else if (usarY && minutosLeteras.length + 3 <= MAX_MINUTOS_LENGTH && !isComposed) {
        preMinuto = 'y'
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
