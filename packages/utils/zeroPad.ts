// Add zero in front of numbers < 10
export function zeroPad(i: number) {
    let out: number | string = i
    if (i < 10) {
      out = "0" + i;
    }
    return out;
  }
  