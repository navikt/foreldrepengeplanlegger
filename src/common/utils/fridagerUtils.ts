import moment from 'moment';
import DateHolidays, { Holiday } from 'date-holidays';
import memoizee from 'memoizee';

const holidays = DateHolidays('no');

const getOffentligeFridagerITidsperiode = (fom: Date, tom: Date): Holiday[] => {
    const fraÅr = fom.getFullYear();
    const tilÅr = tom.getFullYear();
    let days = [] as Holiday[];
    if (fraÅr === tilÅr) {
        days = holidays.getHolidays(fraÅr);
    } else {
        let år = fraÅr;
        while (år <= tilÅr) {
            days = [...days, ...holidays.getHolidays(år)];
            år++;
        }
    }
    const start = moment(fom).subtract(24, 'hours');
    const slutt = moment(tom).add(24, 'hours');
    return days
        .filter((d) => d.type === 'public')
        .map((d) => ({
            ...d,
            date: moment(d.date)
                .utc(true)
                .toDate()
        }))
        .filter((d) => moment(d.date).isAfter(start, 'day') && moment(d.date).isBefore(slutt, 'day'));
};

export const getOffentligeFridager = memoizee(getOffentligeFridagerITidsperiode, { primitive: true });

/* Default - hente ut fridager i default tidsrom */
export const fridager = getOffentligeFridager(
    moment()
        .subtract(3, 'years')
        .toDate(),
    moment()
        .add(3, 'years')
        .toDate()
);

export const erFridag = (dato: Date): string | undefined => {
    const fridag = fridager.find((fr) => moment(new Date(fr.date)).isSame(dato, 'day'));
    return fridag ? fridag.name : undefined;
};
