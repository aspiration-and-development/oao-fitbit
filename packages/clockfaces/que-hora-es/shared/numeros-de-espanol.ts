import roundToBase from '@/shared/utils/roundToBase';
import strings from './strings';

export function escribeNumero(numero: number): string[] {
    if (strings.hasOwnProperty(numero))  {
        return [strings[numero].value]
    } else if (numero >= 17 && numero <= 19) {
        return [strings['dieci'].value + escribeNumero(numero - 10)]
    } else if (numero >= 21 && numero <= 29) {
        return [strings['veinti'].value + escribeNumero(numero - 20)]
    }
    const roundedDown = roundToBase(numero);
    const modulo = numero % roundedDown;
    return [...escribeNumero(roundedDown), ...escribeNumero(modulo)]
}
