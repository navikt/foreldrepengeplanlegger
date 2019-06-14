import moment from 'moment';
import { Uttaksdagen } from './Uttaksdagen';
import { isValidTidsperiode } from './Tidsperioden';
import { Tidsperiode, Forelder } from 'common/types';
import {
    Periode,
    Uttaksperiode,
    Utsettelsesperiode,
    isUtsettelse,
    isFerie,
    isArbeid,
    isUlønnetPermisjon,
    Periodetype,
    Utsettelsesårsak
} from '../types/periodetyper';
import { GradertUttaksperiode, isUttakOrGradertUttak } from '../types';
import { Perioden } from './Perioden';
import { getUttaksinfoForPeriode } from './uttaksinfo';

export const Periodene = (perioder: Periode[]) => ({
    getPeriode: (id: string) => getPeriode(perioder, id),
    getUttak: () => getUttak(perioder),
    getUtsettelser: () => getUtsettelser(perioder),
    getFerieperioder: () => getFerieperioder(perioder),
    getArbeidsperioder: () => getArbeidsperioder(perioder),
    getPerioderEtterFamiliehendelsesdato: (dato: Date) => getPerioderEtterFamiliehendelsesdato(perioder, dato),
    getPerioderFørFamiliehendelsesdato: (dato: Date) => getPerioderFørFamiliehendelsesdato(perioder, dato),
    getPerioderMedUgyldigTidsperiode: () => getPeriodeMedUgyldigTidsperiode(perioder),
    getPerioderMedFerieForForelder: (forelder: Forelder) => getPerioderMedFerieForForelder(perioder, forelder),
    getFørstePerioderEtterFamiliehendelsesdato: (dato: Date) =>
        getFørstePeriodeEtterFamiliehendelsesdato(perioder, dato),
    getFørsteUttaksdag: () => getFørsteUttaksdagIPeriodene(perioder),
    getBrukteUttaksdager: () => getBrukteUttaksdager(perioder),
    getUttaksdager: () => getUttaksdager(perioder),
    getAntallFridager: () => getAntallFridager(perioder),
    getAvsluttendeUlønnedePermisjoner: () => getAvsluttendeUlønnedePermisjoner(perioder),
    getSistePeriodeMedUttak: () => getSistePeriodeMedUttak(perioder),
    finnOverlappendePerioder: (periode: Periode) => finnOverlappendePerioder(perioder, periode),
    finnPeriodeMedDato: (dato: Date) => finnPeriodeMedDato(perioder, dato),
    finnAlleForegåendePerioder: (periode: Periode) => finnPerioderFørPeriode(perioder, periode),
    finnPerioderMedEllerEtterDato: (dato: Date) => finnPerioderMedEllerEtterDato(perioder, dato),
    finnPerioderEtterDato: (dato: Date) => finnPerioderEtterDato(perioder, dato),
    finnAllePåfølgendePerioder: (periode: Periode) => finnPerioderEtterPeriode(perioder, periode),
    finnDenForegåendePerioden: (periode: Periode) => finnForrigePeriode(perioder, periode),
    finnPåfølgendePeriode: (periode: Periode) => finnPåfølgendePeriode(perioder, periode),
    forskyvPerioder: (uttaksdager: number) => forskyvPerioder(perioder, uttaksdager),
    sort: () => perioder.sort(sorterPerioder)
});

export function sorterPerioder(p1: Periode, p2: Periode) {
    if (isValidTidsperiode(p1.tidsperiode) === false || isValidTidsperiode(p2.tidsperiode) === false) {
        // if (isForeldrepengerFørFødselUttaksperiode(p1) && p1.skalIkkeHaUttakFørTermin) {
        //     return -1;
        // }
        return isValidTidsperiode(p1.tidsperiode) ? -1 : 1;
    }
    return moment.utc(p1.tidsperiode.fom).isBefore(p2.tidsperiode.fom, 'day') ? -1 : 1;
}

function getPeriode(perioder: Periode[], id: string): Periode | undefined {
    return perioder.find((p) => p.id === id);
}

function getUttak(perioder: Periode[]): Array<Uttaksperiode | GradertUttaksperiode> {
    return perioder.filter(isUttakOrGradertUttak);
}

function getUtsettelser(perioder: Periode[]): Utsettelsesperiode[] {
    return perioder.filter(isUtsettelse);
}

function getFerieperioder(perioder: Periode[]): Utsettelsesperiode[] {
    return perioder.filter(isFerie);
}

function getArbeidsperioder(perioder: Periode[]): Utsettelsesperiode[] {
    return perioder.filter(isArbeid);
}

function finnOverlappendePerioder(perioder: Periode[], periode: Periode): Periode[] {
    return perioder.filter((p) => {
        if (p.id === periode.id) {
            return;
        }
        const { fom, tom } = p.tidsperiode;
        if (!fom || !tom) {
            return false;
        }
        return (
            datoErInnenforTidsperiode(fom, periode.tidsperiode) || datoErInnenforTidsperiode(tom, periode.tidsperiode)
        );
    });
}

function datoErInnenforTidsperiode(dato: Date, tidsperiode: Tidsperiode): boolean {
    const { fom, tom } = tidsperiode;
    if (!fom || !tom) {
        return false;
    }
    return moment.utc(dato).isBetween(fom, tom, 'days', '[]');
}

function finnPeriodeMedDato(perioder: Periode[], dato: Date): Periode | undefined {
    return perioder.find((periode) => {
        return moment.utc(dato).isBetween(periode.tidsperiode.fom, periode.tidsperiode.tom, 'day', '[]');
    });
}
function finnPerioderMedEllerEtterDato(perioder: Periode[], dato: Date): Periode[] | undefined {
    return perioder.filter((periode) => {
        return (
            moment.utc(dato).isBetween(periode.tidsperiode.fom, periode.tidsperiode.tom, 'day', '[]') ||
            moment.utc(dato).isBefore(periode.tidsperiode.fom, 'day')
        );
    });
}

function finnPerioderEtterDato(perioder: Periode[], dato: Date): Periode[] | undefined {
    return perioder.filter((periode) => {
        return moment.utc(dato).isBefore(periode.tidsperiode.fom, 'day');
    });
}

function finnPerioderFørPeriode(perioder: Periode[], periode: Periode): Periode[] {
    return perioder.filter((p) => moment.utc(p.tidsperiode.tom).isBefore(periode.tidsperiode.fom, 'day'));
}

function finnPerioderEtterPeriode(perioder: Periode[], periode: Periode): Periode[] {
    return perioder.filter((p) => moment.utc(p.tidsperiode.fom).isAfter(periode.tidsperiode.tom, 'day'));
}

function finnForrigePeriode(perioder: Periode[], periode: Periode): Periode | undefined {
    const foregåendePerioder = finnPerioderFørPeriode(perioder, periode);
    if (foregåendePerioder.length > 0) {
        return foregåendePerioder.pop();
    }
    return undefined;
}
function finnPåfølgendePeriode(perioder: Periode[], periode: Periode): Periode | undefined {
    const påfølgendePerioder = finnPerioderEtterPeriode(perioder, periode);
    if (påfølgendePerioder.length > 0) {
        return påfølgendePerioder[0];
    }
    return undefined;
}

function forskyvPerioder(perioder: Periode[], uttaksdager: number): Periode[] {
    return perioder.map((periode) => {
        if (periode.fixed) {
            return periode;
        }
        return forskyvPeriode(periode, uttaksdager);
    });
}

function forskyvPeriode(periode: Periode, uttaksdager: number): Periode {
    const forskyvetStartdato = Uttaksdagen(Uttaksdagen(periode.tidsperiode.fom).denneEllerNeste()).leggTil(uttaksdager);
    return Perioden(periode).setStartdato(forskyvetStartdato);
}

function getPerioderFørFamiliehendelsesdato(perioder: Periode[], familiehendelsesdato: Date) {
    return perioder.filter(
        (periode) =>
            isValidTidsperiode(periode.tidsperiode) &&
            moment.utc(periode.tidsperiode.fom).isBefore(familiehendelsesdato, 'day')
    );
}

function getPerioderEtterFamiliehendelsesdato(perioder: Periode[], familiehendelsesdato: Date) {
    return perioder.filter(
        (periode) =>
            isValidTidsperiode(periode.tidsperiode) &&
            moment.utc(periode.tidsperiode.fom).isSameOrAfter(familiehendelsesdato, 'day')
    );
}

function getFørstePeriodeEtterFamiliehendelsesdato(
    perioder: Periode[],
    familiehendelsesdato: Date
): Periode | undefined {
    const aktuellePerioder = getPerioderEtterFamiliehendelsesdato(perioder, familiehendelsesdato).sort(sorterPerioder);
    return aktuellePerioder.length > 0 ? aktuellePerioder[0] : undefined;
}

function getPeriodeMedUgyldigTidsperiode(perioder: Periode[]) {
    return perioder.filter((periode) => isValidTidsperiode(periode.tidsperiode) === false);
}

function getFørsteUttaksdagIPeriodene(perioder: Periode[]): Date | undefined {
    const førstePeriode = perioder
        .filter((p) => p.tidsperiode.fom !== undefined)
        .sort(sorterPerioder)
        .shift();
    if (førstePeriode) {
        return førstePeriode.tidsperiode.fom;
    }
    return undefined;
}

function getBrukteUttaksdager(perioder: Periode[]): number {
    return perioder.reduce((dager, periode) => {
        const uttaksinfo = periode.uttaksinfo || getUttaksinfoForPeriode(periode);
        if (uttaksinfo) {
            return dager + uttaksinfo.antallUttaksdagerBrukt;
        }
        return dager;
    }, 0);
}

function getUttaksdager(perioder: Periode[]): number {
    return perioder.reduce((dager, periode) => {
        const uttaksinfo = periode.uttaksinfo || getUttaksinfoForPeriode(periode);
        if (uttaksinfo) {
            return dager + uttaksinfo.antallUttaksdager;
        }
        return dager;
    }, 0);
}

function getAntallFridager(perioder: Periode[]): number {
    return perioder.reduce((dager, periode) => {
        const uttaksinfo = periode.uttaksinfo || getUttaksinfoForPeriode(periode);
        if (uttaksinfo) {
            return dager + (uttaksinfo.antallFridager || 0);
        }
        return dager;
    }, 0);
}

function getPerioderMedFerieForForelder(perioder: Periode[], forelder: Forelder): Periode[] {
    return perioder.filter((periode) => erPeriodeMedFerieForForelder(periode, forelder));
}

/***
 * Finner alle ulønnede permisjoner som ligger på slutten av periodelisten
 * */
function getAvsluttendeUlønnedePermisjoner(perioder: Periode[]) {
    const idx = perioder
        .slice()
        .reverse()
        .findIndex((periode) => periode.type !== Periodetype.UlønnetPermisjon);
    return idx === -1 ? [] : perioder.slice(perioder.length - idx);
}

function getSistePeriodeMedUttak(perioder: Periode[]): Periode | undefined {
    return getUttak(perioder)
        .slice()
        .pop();
}

export const erPeriodeMedFerieForForelder = (periode: Periode, forelder: Forelder): boolean => {
    return (
        (isFerie(periode) && periode.forelder === forelder) ||
        (isUlønnetPermisjon(periode) &&
            periode.utsettelsesårsak === Utsettelsesårsak.ferie &&
            periode.forelder !== undefined &&
            periode.forelder !== forelder)
    );
};
