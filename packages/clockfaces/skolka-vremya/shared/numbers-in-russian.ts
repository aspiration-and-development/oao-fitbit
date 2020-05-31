import roundToBase from '@/shared/utils/roundToBase';
import strings from './strings';

export const writeNumber = (num: number, isMinutes = false): string[] => {
    if (strings.hasOwnProperty(num)) {
        const value = isMinutes
            ? strings[num]?.minutes || strings[num].value
            : strings[num].value;
        return [value];
    }
    const roundedDown = roundToBase(num);
    const modulo = num % roundedDown;
    return [...writeNumber(roundedDown, isMinutes), ...writeNumber(modulo, isMinutes)];
}
