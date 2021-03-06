// Rounds the number down to whole base number
export default (number: number) => {
    const pow = number.toString().length - 1;
    const base = Math.pow(10, pow);
    return Math.floor(number / base) * base;
}
