import moment from 'moment';
import { getTidsperiode, Tidsperioden } from './Tidsperioden';
import { Uttaksdagen } from './Uttaksdagen';
import { Tidsperiode } from 'common/types';
import { Periode, isUttak, isUtsettelse, isUlønnetPermisjon, Utsettelsesårsak } from '../types/periodetyper';
import { Forelder } from '../types';

export const Perioden = (periode: Periode) => ({
    erUttak: () => isUttak(periode),
    erUtsettelse: () => isUtsettelse(periode),
    erUlønnetPermisjon: () => isUlønnetPermisjon(periode),
    setStartdato: (fom: Date) => flyttPeriode(periode, fom),
    setUttaksdager: (uttaksdager: number) =>
        (periode.tidsperiode = getTidsperiode(periode.tidsperiode.fom, uttaksdager)),
    getAntallUttaksdager: () => Tidsperioden(periode.tidsperiode).getAntallUttaksdager(),
    erSammenhengende: (periode2: Periode) => erPerioderSammenhengende(periode, periode2),
    erUlønnetPermisjonMedArbeidForForelder: (forelder: Forelder): boolean =>
        erUlønnetPermisjonMedArbeidForForelder(periode, forelder),
    erUlønnetPermisjonMedFerieForForelder: (forelder: Forelder): boolean =>
        erUlønnetPermisjonMedFerieForForelder(periode, forelder),
    erLik: (periode2: Periode) => erPerioderLike(periode, periode2)
});

function erPerioderLike(p1: Periode, p2: Periode): boolean {
    return getPeriodeFootprint(p1) === getPeriodeFootprint(p2);
}

function getPeriodeFootprint(periode: Periode) {
    const { tidsperiode, id, uttaksinfo, ...rest } = periode;
    const sortedPeriode = {};
    Object.keys(rest)
        .sort()
        .forEach((key) => {
            if (rest[key]) {
                sortedPeriode[key] = rest[key];
            }
        });
    return JSON.stringify({ ...sortedPeriode });
}

function erPerioderSammenhengende(p1: Periode, p2: Periode) {
    const p1NesteUttaksdato = Uttaksdagen(p1.tidsperiode.tom).neste();
    const p2Startdato = p2.tidsperiode.fom;
    return moment.utc(p1NesteUttaksdato).isSame(p2Startdato, 'day');
}

function flyttPeriode(periode: Periode, fom: Date): Periode {
    return {
        ...periode,
        tidsperiode: Tidsperioden(periode.tidsperiode).setStartdato(fom) as Tidsperiode
    };
}

function erUlønnetPermisjonMedArbeidForForelder(periode: Periode, forelder: Forelder): boolean {
    return (
        isUlønnetPermisjon(periode) &&
        periode.utsettelsesårsak === Utsettelsesårsak.arbeidHeltid &&
        periode.forelder !== undefined &&
        periode.forelder !== forelder
    );
}

function erUlønnetPermisjonMedFerieForForelder(periode: Periode, forelder: Forelder): boolean {
    return (
        isUlønnetPermisjon(periode) &&
        periode.utsettelsesårsak === Utsettelsesårsak.ferie &&
        periode.forelder !== undefined &&
        periode.forelder !== forelder
    );
}
