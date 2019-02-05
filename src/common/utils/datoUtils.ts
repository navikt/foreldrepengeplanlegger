import moment from 'moment';
import { DateValue } from 'common/types';

export function formaterDato(dato: Date, datoformat?: string): string {
    return moment(dato).format(datoformat || 'dddd D. MMMM YYYY');
}

export function formaterDatoTall(dato: Date, datoformat?: string): string {
    return moment(dato).format(datoformat || 'DD.MM.YYYY');
}

export function formaterDatoUtenDag(dato: Date): string {
    return moment(dato).format('D. MMMM YYYY');
}

export function formaterDatoMedDagKort(dato: Date): string {
    const dag = moment(dato)
        .format('dddd')
        .substr(0, 3);
    return `${dag}. ${moment(dato).format('D.MM.YYYY')}`;
}

export function år(dato: Date): string {
    return moment(dato).format('YYYY');
}

export function årToBokstaver(dato: Date): string {
    return moment(dato).format('YY');
}

export function måned(dato: Date): string {
    return moment(dato).format('MMMM');
}

export function måned3bokstaver(dato: Date): string {
    return moment(dato)
        .format('MMM')
        .substr(0, 3);
}

export function mnd(dato: Date): string {
    return moment(dato).format('MMM');
}

export function ukedag(dato: Date): string {
    return moment(dato).format('dddd');
}

export function ukedagKort(dato: Date): string {
    return moment(dato).format('ddd');
}

export function dagIMåned(dato: Date): string {
    return moment(dato).format('D.');
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
        return moment(date).isSameOrBefore(moment(otherDate, 'day'));
    }
    return true;
};
export const dateIsSameOrAfter = (date: DateValue, otherDate: DateValue): boolean => {
    if (date && otherDate) {
        return moment(date).isSameOrAfter(otherDate, 'day');
    }
    return true;
};
