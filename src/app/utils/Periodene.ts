import moment from 'moment';
import { Uttaksdagen } from './Uttaksdagen';
import { isValidTidsperiode, Tidsperioden } from './Tidsperioden';
import { Tidsperiode } from 'common/types';
import {
    Periode,
    Utsettelsesperiode,
    Periodetype,
    isUtsettelse,
    UtsettelsesårsakType,
    isUttak,
    Uttaksperiode
} from '../types/periodetyper';
import { Forelder } from '../types';
import { Perioden } from './Perioden';

export const Periodene = (perioder: Periode[]) => ({
    getPeriode: (id: string) => getPeriode(perioder, id),
    getUttak: () => getUttak(perioder),
    getUtsettelser: () => getUtsettelser(perioder),
    getFerieutsettelser: () => getFerieutsettelser(perioder),
    getPerioderEtterFamiliehendelsesdato: (dato: Date) => getPerioderEtterFamiliehendelsesdato(perioder, dato),
    getPerioderFørFamiliehendelsesdato: (dato: Date) => getPerioderFørFamiliehendelsesdato(perioder, dato),
    getPerioderMedUgyldigTidsperiode: () => getPeriodeMedUgyldigTidsperiode(perioder),
    getFørstePerioderEtterFamiliehendelsesdato: (dato: Date) =>
        getFørstePeriodeEtterFamiliehendelsesdato(perioder, dato),
    getFørsteUttaksdag: () => getFørsteUttaksdag(perioder),
    getAntallFeriedager: (forelder?: Forelder) => getAntallFeriedager(perioder, forelder),
    finnOverlappendePerioder: (periode: Periode) => finnOverlappendePerioder(perioder, periode),
    finnPeriodeMedDato: (dato: Date) => finnPeriodeMedDato(perioder, dato),
    finnAlleForegåendePerioder: (periode: Periode) => finnPerioderFørPeriode(perioder, periode),
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
    return moment(p1.tidsperiode.fom).isBefore(p2.tidsperiode.fom, 'day') ? -1 : 1;
}

function getPeriode(perioder: Periode[], id: string): Periode | undefined {
    return perioder.find((p) => p.id === id);
}

function getUttak(perioder: Periode[]): Uttaksperiode[] {
    return perioder.filter(isUttak);
}

function getUtsettelser(perioder: Periode[]): Utsettelsesperiode[] {
    return perioder.filter(isUtsettelse);
}

function getFerieutsettelser(perioder: Periode[]): Utsettelsesperiode[] {
    return perioder.filter(isUtsettelse).filter((p) => p.årsak === UtsettelsesårsakType.Ferie);
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
    return moment(dato).isBetween(fom, tom, 'days', '[]');
}

function finnPeriodeMedDato(perioder: Periode[], dato: Date): Periode | undefined {
    return perioder.find((periode) => {
        return moment(dato).isBetween(periode.tidsperiode.fom, periode.tidsperiode.tom, 'day', '[]');
    });
}

function finnPerioderFørPeriode(perioder: Periode[], periode: Periode): Periode[] {
    return perioder.filter((p) => moment(p.tidsperiode.tom).isBefore(periode.tidsperiode.fom, 'day'));
}

function finnPerioderEtterPeriode(perioder: Periode[], periode: Periode): Periode[] {
    return perioder.filter((p) => moment(p.tidsperiode.fom).isAfter(periode.tidsperiode.tom, 'day'));
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
        if (periode.type === Periodetype.Utsettelse) {
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
            moment(periode.tidsperiode.fom).isBefore(familiehendelsesdato, 'day')
    );
}

function getPerioderEtterFamiliehendelsesdato(perioder: Periode[], familiehendelsesdato: Date) {
    return perioder.filter(
        (periode) =>
            isValidTidsperiode(periode.tidsperiode) &&
            moment(periode.tidsperiode.fom).isSameOrAfter(familiehendelsesdato, 'day')
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

function getFørsteUttaksdag(perioder: Periode[]): Date | undefined {
    const førstePeriode = perioder
        .filter((p) => p.tidsperiode.fom !== undefined)
        .sort(sorterPerioder)
        .shift();
    if (førstePeriode) {
        return førstePeriode.tidsperiode.fom;
    }
    return undefined;
}

function getAntallFeriedager(perioder: Periode[], forelder?: Forelder): number {
    return getFerieutsettelser(perioder)
        .filter((p) => (isValidTidsperiode(p.tidsperiode) && forelder ? p.forelder === forelder : true))
        .map((p) => Tidsperioden(p.tidsperiode).getAntallUttaksdager())
        .reduce((tot = 0, curr) => tot + curr, 0);
}
