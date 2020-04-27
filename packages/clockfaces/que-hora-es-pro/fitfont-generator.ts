#!/usr/bin/env deno

import { horasStringList, numerosStringList } from './strings.ts';

let strings = [
    ...Object.values(horasStringList),
    ...Object.values(numerosStringList)
    ]
    .map(({value}) => value)
    .join('');

console.log(strings)
