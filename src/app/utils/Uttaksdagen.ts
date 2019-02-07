import moment from 'moment';
import { Tidsperioden } from './Tidsperioden';

/**
 * Wrapper en dato med uttaksdager-funksjonalitet
 * @param dato
 */
export const Uttaksdagen = (dato: Date) => ({
    erUttaksdag: (): boolean => erUttaksdag(dato),
    forrige: (): Date => getUttaksdagFørDato(dato),
    neste: (): Date => getUttaksdagEtterDato(dato),
    denneEllerNeste: (): Date => getUttaksdagFraOgMedDato(dato),
    denneEllerForrige: (): Date => getUttaksdagTilOgMedDato(dato),
    getUttaksdagerFremTilDato: (tildato: Date) => getUttaksdagerFremTilDato(dato, tildato),
    leggTil: (uttaksdager: number, uttaksprosent?: number): Date => {
        if (uttaksdager < 0) {
            return trekkUttaksdagerFraDato(dato, uttaksdager, uttaksprosent);
        } else if (uttaksdager > 0) {
            return leggUttaksdagerTilDato(dato, uttaksdager, uttaksprosent);
        }
        return dato;
    },
    trekkFra: (uttaksdager: number, uttaksprosent?: number): Date =>
        trekkUttaksdagerFraDato(dato, uttaksdager, uttaksprosent)
});

function getUkedag(dato: Date) {
    return moment(dato).isoWeekday();
}

function erUttaksdag(dato: Date): boolean {
    return getUkedag(dato) !== 6 && getUkedag(dato) !== 7;
}

function getUttaksdagerMedGradering(uttaksdager: number, uttaksprosent?: number): number {
    return uttaksprosent !== undefined ? Math.round(uttaksdager * (100 / uttaksprosent)) : uttaksdager;
}

/**
 * Finner første uttaksdag før dato
 * @param dato
 */
function getUttaksdagFørDato(dato: Date): Date {
    return getUttaksdagTilOgMedDato(
        moment(dato)
            .subtract(24, 'hours')
            .toDate()
    );
}

/**
 * Sjekker om dato er en ukedag, dersom ikke finner den foregående fredag
 * @param dato
 */
function getUttaksdagTilOgMedDato(dato: Date): Date {
    switch (getUkedag(dato)) {
        case 6:
            return moment(dato)
                .subtract(24, 'hours')
                .toDate();
        case 7:
            return moment(dato)
                .subtract(48, 'hours')
                .toDate();
        default:
            return dato;
    }
}

/**
 * Første gyldige uttaksdag etter dato
 * @param termin
 */
function getUttaksdagEtterDato(dato: Date): Date {
    return getUttaksdagFraOgMedDato(
        moment(dato)
            .add(24, 'hours')
            .toDate()
    );
}

/**
 * Sjekker om dato er en ukedag, dersom ikke finner den nærmeste påfølgende mandag
 * @param dato
 */
function getUttaksdagFraOgMedDato(dato: Date): Date {
    switch (getUkedag(dato)) {
        case 6:
            return moment(dato)
                .add(48, 'hours')
                .toDate();
        case 7:
            return moment(dato)
                .add(24, 'hours')
                .toDate();
        default:
            return dato;
    }
}

/**
 * Legger uttaksdager til en dato og returnerer ny dato
 * @param dato
 * @param uttaksdager
 */
function leggUttaksdagerTilDato(dato: Date, uttaksdager: number, uttaksprosent?: number): Date {
    if (erUttaksdag(dato) === false) {
        throw new Error('leggUttaksdagerTilDato: Dato må være uttaksdag');
    }
    let nyDato = dato;
    let dagteller = 0;
    let uttaksdageteller = 0;
    /**
     * I og med denne legger til uttaksdager etter dato, dvs. legger en til en uttaksdag blir
     * antall uttaksdager 2. Dvs. en må da legge til 1 uttaksdag i antallet som kommer inn, for deretter
     * å trekke fra en når en har gradering, slik at verdien av en uttaksdag blir riktig.
     */
    const reelleUttaksdager = getUttaksdagerMedGradering(uttaksdager + 1, uttaksprosent) - 1;

    while (uttaksdageteller <= reelleUttaksdager) {
        const tellerdato = moment(dato)
            .add(dagteller++ * 24, 'hours')
            .toDate();
        if (erUttaksdag(tellerdato)) {
            nyDato = tellerdato;
            uttaksdageteller++;
        }
    }
    return nyDato;
}

/**
 * Trekker uttaksdager fra en dato og returnerer ny dato
 * @param dato
 * @param uttaksdager
 */
function trekkUttaksdagerFraDato(dato: Date, uttaksdager: number, uttaksprosent?: number): Date {
    if (erUttaksdag(dato) === false) {
        throw new Error('trekkUttaksdagerFraDato: Dato må være uttaksdag');
    }
    let nyDato = dato;
    let dagteller = 0;
    let uttaksdageteller = 0;
    /**
     * I og med denne legger til uttaksdager etter dato, dvs. legger en til en uttaksdag blir
     * antall uttaksdager 2. Dvs. en må da legge til 1 uttaksdag i antallet som kommer inn, for deretter
     * å trekke fra en når en har gradering, slik at verdien av en uttaksdag blir riktig.
     */
    const reelleUttaksdager = getUttaksdagerMedGradering(uttaksdager + 1, uttaksprosent) - 1;
    while (uttaksdageteller < Math.abs(reelleUttaksdager)) {
        const tellerdato = moment(dato)
            .add(--dagteller * 24, 'hours')
            .toDate();
        if (erUttaksdag(tellerdato)) {
            nyDato = tellerdato;
            uttaksdageteller++;
        }
    }
    return nyDato;
}

/**
 * Finner antall uttaksdager som er mellom to datoer. Dvs. fra og med startdato, og
 * frem til sluttdato (ikke til og med)
 * @param fra
 * @param til
 */
function getUttaksdagerFremTilDato(fom: Date, tom: Date): number {
    if (moment(fom).isSame(tom, 'day')) {
        return 0;
    }
    if (moment(fom).isBefore(tom, 'day')) {
        return Tidsperioden({ fom, tom }).getAntallUttaksdager() - 1;
    }
    return (
        -1 *
        (Tidsperioden({
            fom: tom,
            tom: fom
        }).getAntallUttaksdager() -
            1)
    );
}
