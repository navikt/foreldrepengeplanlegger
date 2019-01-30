import moment from 'moment';
import { getTidsperiode, Tidsperioden } from './Tidsperioden';
import { Uttaksdagen } from './Uttaksdagen';
import { Tidsperiode } from 'common/types';
import { Periode, isUttak, isUtsettelse, isUbetaltPermisjon } from '../types/periodetyper';

export const Perioden = (periode: Periode) => ({
    erUttak: () => isUttak(periode),
    erUtsettelse: () => isUtsettelse(periode),
    erUbetaltPermisjon: () => isUbetaltPermisjon(periode),
    setStartdato: (fom: Date) => flyttPeriode(periode, fom),
    setUttaksdager: (uttaksdager: number) =>
        (periode.tidsperiode = getTidsperiode(periode.tidsperiode.fom, uttaksdager)),
    getAntallUttaksdager: () => Tidsperioden(periode.tidsperiode).getAntallUttaksdager(),
    erSammenhengende: (periode2: Periode) => erPerioderSammenhengende(periode, periode2),
    setUkerOgDager: (uker: number, dager: number): Periode => setUkerOgDager(periode, uker, dager),
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
    return moment(p1NesteUttaksdato).isSame(p2Startdato, 'day');
}

function flyttPeriode(periode: Periode, fom: Date): Periode {
    return {
        ...periode,
        tidsperiode: Tidsperioden(periode.tidsperiode).setStartdato(fom) as Tidsperiode
    };
}

function setUkerOgDager(periode: Periode, uker: number, dager: number): Periode {
    return { ...periode, tidsperiode: getTidsperiode(periode.tidsperiode.fom, Math.max(uker * 5 + dager, 1)) };
}
