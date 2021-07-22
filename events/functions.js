//--- F U N C T I O N S ---\\

/*Slowmode Function */
 function timeStringToMS(timeStr) {
    const timeUnits = {
        s: ['sec(s)', 'second(s)'],
        min: ['minute(s)', 'm', 'min(s)'],
        h: ['hr(s)', 'hour(s)'],
        d: ['day(s)'],
        w: ['wk(s)', 'week(s)'],
        mth: ['mth(s)', 'month(s)'],
        y: ['year(s)'],
        a: ['julianyear(s)'],
        dec: ['decade(s)'],
        cen: ['cent(s)', 'century', 'centuries']
    };

    const timeUnitValues = {
        s: 1000,
        min: 1000 * 60,
        h: 1000 * 60 * 60,
        d: 1000 * 60 * 60 * 24,
        w: 1000 * 60 * 60 * 24 * 7,
        mth: 1000 * 60 * 60 * 24 * 30,
        y: 1000 * 60 * 60 * 24 * 365,
        a: 1000 * 60 * 60 * 24 * 365.25,
        dec: 1000 * 60 * 60 * 24 * 365 * 10,
        cen: 1000 * 60 * 60 * 24 * 365 * 100
    };

    // get values
    const values = getUnitAndNumber(timeStr);

    // check values for errors
    if (values === undefined) return undefined;

    let ms = 0;
    try {
        // get the values in ms
        for (let i = 0; i < values.length; ++i)
            ms += getMs(values[i].numberPart, values[i].unit);
    } catch (_) {
        return undefined;
    }

    return ms;

    function getUnitAndNumber(timeStr) {
        // returns the strings (s) and numbers (n) of a string formatted as: "nnssnnssnnss"
        // /[0-9.,:]/g = regex for getting all the chars in a string which are equal to 0-9.,:
        // /[^0-9.,:]/g = regex for getting all the chars in a string which are not equal to 0-9.,:

        // format string basics (lowercase and no spaces)
        timeStr = timeStr
            .toLowerCase()
            .split(' ')
            .join('');

        // get the numbers and units in a single string (and format the time strings)
        const unit = timeStr.replace(/[0-9.,:]/g, ' ');
        const numberPart = timeStr
            .replace(/[^0-9.,:]/g, ' ')
            .replace(',', '.');

        // get the numbers and units in an array and remove all the empty strings
        let units = unit.split(' ').filter((str) => str !== '');
        const numberParts = numberPart
            .split(' ')
            .filter((str) => str !== '');

        // replace eg. minute to min
        units = getExactUnits(units);

        // error checking
        if (
            unit === '' ||
            unit === undefined ||
            numberPart === '' ||
            numberPart === undefined ||
            units === undefined ||
            units.length === 0 ||
            numberParts.length === 0 ||
            units.length !== numberParts.length
        )
            return undefined;

        // get the two arrays in a single one
        let ans = [];
        for (let i = 0; i < units.length; ++i)
            ans.push({
                numberPart: numberParts[i],
                unit: units[i]
            });

        // return the answer
        return ans;

        function getExactUnits(units) {
            let exactUnits = [];

            // for each unit of the array
            for (const unit of units) {
                if (timeUnits[unit] !== undefined) {
                    // it's a main unit, just push it and skip the rest
                    exactUnits.push(unit);
                    continue;
                } else {
                    // it's not a main unit, so search the right one
                    // for each time unit
                    for (const timeUnit in timeUnits) {
                        // for each allias of a time unit
                        for (const timeUnitAllias of timeUnits[timeUnit]) {
                            if (
                                timeUnitAllias.replace('(s)', '') === unit ||
                                timeUnitAllias.replace('(s)', 's') === unit
                            ) {
                                // it's the unit, push the value and skip the rest
                                exactUnits.push(timeUnit);
                                continue;
                            }
                        }
                    }
                }
            }

            if (exactUnits.length !== units.length) return undefined;

            return exactUnits;
        }
    }

    function getMs(number, unit) {
        // check for special case
        if (number.includes(':')) {
            switch (unit) {
                case 'min':
                    return (
                        Number(number.split(':')[0]) * timeUnitValues['min'] +
                        Number(number.split(':')[1]) * timeUnitValues['s']
                    );
                case 'h':
                    return (
                        Number(number.split(':')[0]) * timeUnitValues['h'] +
                        Number(number.split(':')[1]) * timeUnitValues['min']
                    );
                default:
                    throw new Error('Used ":" with a unit which doesn\'t support it');
            }
        }

        // default case
        return Number(number) * timeUnitValues[unit];
    }
}