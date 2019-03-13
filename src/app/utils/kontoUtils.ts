import {
    TilgjengeligStønadskonto,
    StønadskontoType,
    TilgjengeligeDager,
    Forelder,
    Periodetype,
    UttakFørTerminPeriode,
    Situasjon
} from '../types';
import { guid } from 'nav-frontend-js-utils';
import { getUttaksinfoForPeriode } from './uttaksinfo';
import { Uttaksdagen } from './Uttaksdagen';
import { getAntallForeldreISituasjon } from './common';

export const stønadskontoSortOrder = {
    [StønadskontoType.ForeldrepengerFørFødsel]: 1,
    [StønadskontoType.Mødrekvote]: 2,
    [StønadskontoType.Fedrekvote]: 3,
    [StønadskontoType.Fellesperiode]: 4,
    [StønadskontoType.Foreldrepenger]: 5,
    [StønadskontoType.SamtidigUttak]: 6,
    [StønadskontoType.Flerbarnsdager]: 7,
    [StønadskontoType.AktivitetsfriKvote]: 8
};

export const getStønadskontoSortOrder = (konto: StønadskontoType): number => stønadskontoSortOrder[konto];

export const summerAntallDagerIKontoer = (kontoer: TilgjengeligStønadskonto[]): number => {
    return kontoer.reduce((dager, konto) => konto.dager + dager, 0);
};

const getMorsStønadskontoer = (kontoer: TilgjengeligStønadskonto[]): TilgjengeligStønadskonto[] =>
    kontoer.filter((konto) => konto.stønadskontoType === StønadskontoType.Mødrekvote);

const getFarsStønadskontoer = (kontoer: TilgjengeligStønadskonto[]): TilgjengeligStønadskonto[] =>
    kontoer.filter((konto) => konto.stønadskontoType === StønadskontoType.Fedrekvote);

const getForeldrepengeKontoer = (kontoer: TilgjengeligStønadskonto[]): TilgjengeligStønadskonto[] =>
    kontoer.filter((konto) => konto.stønadskontoType === StønadskontoType.Foreldrepenger);

const getFlerbarnskonto = (kontoer: TilgjengeligStønadskonto[]): TilgjengeligStønadskonto[] =>
    kontoer.filter((konto) => konto.stønadskontoType === StønadskontoType.Flerbarnsdager);

const getFellesStønadskontoer = (kontoer: TilgjengeligStønadskonto[]): TilgjengeligStønadskonto[] =>
    kontoer.filter(
        (konto) =>
            konto.stønadskontoType === StønadskontoType.Fellesperiode ||
            konto.stønadskontoType === StønadskontoType.Flerbarnsdager
    );

const kontoErFørTermin = (konto: TilgjengeligStønadskonto): boolean => {
    return konto.stønadskontoType === StønadskontoType.ForeldrepengerFørFødsel;
};

const kontoErEtterTermin = (konto: TilgjengeligStønadskonto): boolean => {
    return konto.stønadskontoType !== StønadskontoType.ForeldrepengerFørFødsel;
};

export const getTilgjengeligeDager = (
    situasjon: Situasjon,
    kontoer: TilgjengeligStønadskonto[]
): TilgjengeligeDager => {
    const erAleneomsorg = getAntallForeldreISituasjon(situasjon) === 1;
    const kontoerEtterTermin = kontoer.filter(kontoErEtterTermin);

    const dagerTotalt = summerAntallDagerIKontoer(kontoer);
    const dagerForeldrepengerFørFødsel = summerAntallDagerIKontoer(kontoer.filter(kontoErFørTermin));
    const dagerEtterTermin = summerAntallDagerIKontoer(kontoerEtterTermin);
    const dagerForeldrepenger = summerAntallDagerIKontoer(getForeldrepengeKontoer(kontoerEtterTermin));
    const dagerMor = summerAntallDagerIKontoer(getMorsStønadskontoer(kontoerEtterTermin));
    const dagerFar = summerAntallDagerIKontoer(getFarsStønadskontoer(kontoerEtterTermin));
    const dagerFelles = summerAntallDagerIKontoer(getFellesStønadskontoer(kontoerEtterTermin));
    const flerbarnsdager = summerAntallDagerIKontoer(getFlerbarnskonto(kontoerEtterTermin));

    const maksDagerFar = dagerFar + dagerFelles;
    const maksDagerMor = erAleneomsorg ? dagerForeldrepenger : dagerMor + dagerFelles;

    return {
        dagerTotalt,
        dagerForeldrepengerFørFødsel,
        dagerEtterTermin,
        dagerForeldrepenger,
        dagerMor,
        dagerFar,
        dagerFelles,
        flerbarnsdager,
        maksDagerFar,
        maksDagerMor,
        stønadskontoer: kontoer
    };
};

export const getPeriodeFørTermin = (
    situasjon: Situasjon,
    familiehendelsesdato: Date,
    antallDagerFørTermin: number,
    erMor?: boolean
): UttakFørTerminPeriode | undefined => {
    switch (situasjon) {
        case Situasjon.bareFar:
        case Situasjon.farOgFar:
            return undefined;
        default:
            if (situasjon === Situasjon.aleneomsorg && erMor === false) {
                return undefined;
            }
            const tom = Uttaksdagen(familiehendelsesdato).forrige();
            const fom = Uttaksdagen(tom).trekkFra(antallDagerFørTermin - 1);
            const periode: UttakFørTerminPeriode = {
                type: Periodetype.UttakFørTermin,
                id: guid(),
                forelder: Forelder.mor,
                tidsperiode: { fom, tom }
            };
            periode.uttaksinfo = getUttaksinfoForPeriode(periode);
            return periode;
    }
};
