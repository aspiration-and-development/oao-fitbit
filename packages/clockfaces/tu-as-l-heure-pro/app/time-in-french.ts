import numbersInFrench from './numbers-in-french'

const timeInFrench = (hours: number, minutes: number, day: number): {
    time: string
    hoursSpelled: string
    hoursVerbatim: string
    minutesSpelled: string
    when: string
    dayWord: string
} => {
    // days
    const days = [
        "dimanch",
        "lundi",
        "mardi",
        "mercredi",
        "jeudi",
        "vendredi",
        "samedi",
    ];

    // Il est ___ heure(s)___.
    const shortHours = (hours % 12) || 12
    const hoursVerbatim = shortHours === 1 ? 'heure' : 'heures'
    const time = 'Il est'
    const hoursSpelled = numbersInFrench(shortHours).join('-')
    const minutesSpelled = numbersInFrench(minutes).join('-')

    let when = 'du matin'
    if (hours >= 12) when = 'de l’après-midi'
    if (hours >= 18) when = 'du soir'

    const dayWord = days[day]

    return {
        time,
        hoursSpelled,
        hoursVerbatim,
        minutesSpelled,
        when,
        dayWord,
    }
}

export default timeInFrench