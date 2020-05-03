import * as assert from 'assert'
import 'mocha'

import {escribeNumero} from '../shared/numeros-de-espanol'

describe('Numeros de espanol', function () {
    // let horasPorUsar = usarHorasCortas ? (horas % 12) || 12 : horas;
    // let horasLeteras = escribeNumero(horasPorUsar).pop();
    it('debera trabajar con 11', function () {
      const value = escribeNumero(11);
      assert.deepEqual(value, ['once'])
    });

    it('debera trabajar con 23', function () {
      const value = escribeNumero(23);
      assert.deepEqual(value, ["veintitrés"])
    });
});
