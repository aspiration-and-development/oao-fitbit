import { roundToBase } from '@/utils';
import { numerosStringList } from '../strings';

export function escribeNumero(numero: number): string[] {
    if (numerosStringList.hasOwnProperty(numero))  {
        return [numerosStringList[numero].value]
    } else if (numero >= 17 && numero <= 19) {
        return [numerosStringList['dieci'].value + escribeNumero(numero - 10)]
    } else if (numero >= 21 && numero <= 29) {
        return [numerosStringList['veinti'].value + escribeNumero(numero - 20)]
    } else if (numero > 30) {
        const roundedDown = roundToBase(numero);
        const modulo = numero % roundedDown;
        return [...escribeNumero(roundedDown), ...escribeNumero(modulo)]
    }
}
