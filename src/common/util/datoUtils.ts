import moment from 'moment';

export type DateValue = Date | undefined;

export function formaterDato(dato: Date, datoformat?: string): string {
    return moment.utc(dato).format(datoformat || 'dddd D. MMMM YYYY');
}

export function formaterDatoTall(dato: string, datoformat?: string): string {
    return moment.utc(dato).format(datoformat || 'DD.MM.YYYY');
}

export function formaterDatoUtenDag(dato: Date): string {
    return moment.utc(dato).format('D. MMMM YYYY');
}

export function formaterDatoMedDagKort(dato: Date): string {
    const dag = moment
        .utc(dato)
        .format('dddd')
        .substr(0, 3);
    return `${dag}. ${moment.utc(dato).format('DD.MM.YYYY')}`;
}

export function år(dato: Date): string {
    return moment.utc(dato).format('YYYY');
}

export function årToBokstaver(dato: Date): string {
    return moment.utc(dato).format('YY');
}

export function måned(dato: Date): string {
    return moment.utc(dato).format('MMMM');
}

export function måned3bokstaver(dato: Date): string {
    return moment
        .utc(dato)
        .format('MMM')
        .substr(0, 3);
}

export function mnd(dato: Date): string {
    return moment.utc(dato).format('MMM');
}

export function ukedag(dato: Date): string {
    return moment.utc(dato).format('dddd');
}

export function ukedagKort(dato: Date): string {
    return moment.utc(dato).format('ddd');
}

export function dagIMåned(dato: Date): string {
    return moment.utc(dato).format('D.');
}

export const getUkerOgDagerFromDager = (dager: number): { uker: number; dager: number } => {
    const uker = Math.floor(dager / 5);
    return {
        dager: dager - uker * 5,
        uker
    };
};

export const dateIsSameOrBefore = (date: DateValue, otherDate: DateValue): boolean => {
    if (date && otherDate) {
        return moment.utc(date).isSameOrBefore(moment.utc(otherDate, 'day'));
    }
    return true;
};
export const dateIsSameOrAfter = (date: DateValue, otherDate: DateValue): boolean => {
    if (date && otherDate) {
        return moment.utc(date).isSameOrAfter(otherDate, 'day');
    }
    return true;
};

export const dateToISOFormattedDateString = (date?: Date) => (date ? moment.utc(date).format('YYYY-MM-DD') : undefined);
