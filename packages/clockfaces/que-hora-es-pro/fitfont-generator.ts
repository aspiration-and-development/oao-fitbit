#!/usr/bin/env deno

import strings from '../que-hora-es/shared/strings.ts';

const stringsAll = [
    ...Object.values(strings)
    ]
    .map(({value}) => value)
    .join('');
const stringDeduped = new Set(Array.from(stringsAll));
const string = Array.from(stringDeduped).join('');

console.log(string.toUpperCase())
