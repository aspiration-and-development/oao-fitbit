#!/usr/bin/env deno --allow-run

import strings from "../que-hora-es/shared/strings.ts";

const {
  "son-las": { value: sonLas },
  "es-la": { value: esLa },
  punto: { value: punto },
  y: { value: y },
  con: { value: con },
  dieci: { value: dieci },
  veinti: { value: veinti },
  ...rest
} = strings;

const numbers = [...Array(15).keys(), 20, 22, 23, 26, 30, 40, 50]
  .map(
    (key: number) =>
      ((rest as unknown) as Record<number, { value: string }>)[key].value
  )
  .join("");

const pres = ["mañana", "mediadia", "madrugada", "tarde", "noche"].map(
  (key: string) => {
    return ((rest as unknown) as Record<string, { pre: string }>)[key].pre;
  }
);

const stringsPreDeduped = new Set(
  sonLas + esLa + numbers + punto + y + con + dieci + veinti + pres
);
const stringPre = Array.from(stringsPreDeduped).join("").toUpperCase();

const stringsRest = [...Object.values(rest)].map(({ value }) => value).join("");
const stringRestDeduped = new Set(Array.from(stringsRest));
const stringRest = Array.from(stringRestDeduped).join("").toUpperCase();

const fitfontGenerate = async (size: number, string: string) => {
  await Deno.run({
    cmd: [
      "rm",
      "-rf",
      `./resources/HotTamale_${size}`,
    ],
  });
  return Deno.run({
    cmd: [
      "yarn",
      "fitfont-generate",
      "./assets/Hottaml.ttf",
      String(size),
      string,
    ],
  }).status();
};

await Promise.all(
  [
    fitfontGenerate(35, stringPre),
    fitfontGenerate(45, stringRest)
  ]
);
