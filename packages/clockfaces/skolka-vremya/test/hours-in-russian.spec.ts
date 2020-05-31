import * as assert from 'assert'
import 'mocha'

import hoursInRussian, { Options } from '../shared/hours-in-russian'

describe('Hours in russian', function () {
  const optionsShort: Options = {
    useShortHours: true
  }
  const optionsLong: Options = {
    useShortHours: false
  }
  it('works with 10:00 AM', function () {
    const time = hoursInRussian(0, 10, 0, optionsShort)
    assert.deepStrictEqual(time, {
      "hoursSpelled": "десять",
      "hourLable": "часов",
      "minutesSpelled": "ноль ноль",
      "minuteLable": "минут",
      "minutesSpelledRaw": [
        "ноль ноль"
      ],
      "weekDay": "воскресенье",
      "when": "утра",
    });
  });
  it('works with 10:01 AM', function () {
    const time = hoursInRussian(0, 10, 1, optionsShort)
    assert.deepStrictEqual(time, {
      "hoursSpelled": "десять",
      "hourLable": "часов",
      "minutesSpelled": "одна",
      "minuteLable": "минута",
      "minutesSpelledRaw": [
        "одна"
      ],
      "weekDay": "воскресенье",
      "when": "утра",
    });
  });

  it('works with 10:14 PM', function () {
    const time = hoursInRussian(0, 22, 14, optionsShort)
    assert.deepStrictEqual(time, {
      "hoursSpelled": "десять",
      "hourLable": "часов",
      "minutesSpelled": "четырнадцать",
      "minuteLable": "минут",
      "minutesSpelledRaw": [
        "четырнадцать"
      ],
      "weekDay": "воскресенье",
      "when": "ночи",
    });
  });

  it('works with 11:02 PM', function () {
    const time = hoursInRussian(1, 23, 2, optionsShort)
    assert.deepStrictEqual(time, {
      "hoursSpelled": "одиннадцать",
      "hourLable": "часов",
      "minutesSpelled": "две",
      "minuteLable": "минуты",
      "minutesSpelledRaw": [
        "две"
      ],
      "weekDay": "понедельник",
      "when": "ночи",
    });
  });

  it('works with 21:51', function () {
    const time = hoursInRussian(1, 21, 51, optionsLong)
    assert.deepStrictEqual(time, {
      "hoursSpelled": "двадцать один",
      "hourLable": "час",
      "minutesSpelled": "пятьдесят одна",
      "minuteLable": "минута",
      "minutesSpelledRaw": [
        "пятьдесят",
        "одна"
      ],
      "weekDay": "понедельник",
      "when": "вечера",
    });
  });

  it('works with 9:04', function () {
    const time = hoursInRussian(2, 9, 4, optionsLong)
    assert.deepStrictEqual(time, {
      "hoursSpelled": "девять",
      "hourLable": "часов",
      "minutesSpelled": "четыре",
      "minuteLable": "минуты",
      "minutesSpelledRaw": [
        "четыре"
      ],
      "weekDay": "вторник",
      "when": "утра",
    });
  });
});
