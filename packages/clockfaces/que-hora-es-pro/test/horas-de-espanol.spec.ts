import * as assert from 'assert'
import 'mocha'

import horasDeEspanol, {Opciones} from '../app/horas-de-espanol'

describe('Horas de espanol', function () {
  describe('Horas especiales', function () {
    const opciones: Opciones = {
      usarHorasCortas: true,
      usarEnPunto: true
    }
    it('debera correcto salida con 1:00', function () {
      const unaDeManana = horasDeEspanol(1,1, 0, opciones)
      assert.deepStrictEqual(unaDeManana, {
        tiempo: 'Es la',
        horasLeteras: 'una',
        minutosLeteras: 'en punto',
        preMinuto: '',
        cuando: 'de la madrugada',
        diaDeSemana: 'lunes'
      });
    });

    it('debera correcto salida con 13:00', function () {
      const unaDeTarde = horasDeEspanol(2, 13, 0, opciones)
      assert.deepStrictEqual(unaDeTarde, {
        tiempo: 'Es la',
        horasLeteras: 'una',
        minutosLeteras: 'en punto',
        preMinuto: '',
        cuando: 'de la tarde',
        diaDeSemana: 'martes'
      });
    });

    it('debera correcto salida con 12:00', function () {
      const mediodia = horasDeEspanol(3, 12, 0, opciones)
      assert.deepStrictEqual(mediodia, {
        tiempo: 'Son las',
        horasLeteras: 'doce',
        minutosLeteras: 'en punto',
        preMinuto: '',
        cuando: 'del mediadia',
        diaDeSemana: 'miércoles'
      });
    });

    it('debera correcto salida con 00:00', function () {
      const medianoche = horasDeEspanol(4, 0, 0, opciones)
      assert.deepStrictEqual(medianoche, {
        tiempo: 'Son las',
        horasLeteras: 'doce',
        minutosLeteras: 'en punto',
        preMinuto: '',
        cuando: 'de la madrugada',
        diaDeSemana: 'jueves'
      });
    });
  })
});
