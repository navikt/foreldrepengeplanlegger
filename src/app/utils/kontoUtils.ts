import {
    TilgjengeligStønadskonto,
    StønadskontoType,
    TilgjengeligeDager,
    Forelder,
    Periodetype,
    UttakFørTerminPeriode
} from '../types';
import { guid } from 'nav-frontend-js-utils';
import { getUttaksinfoForPeriode } from './uttaksinfo';
import { Uttaksdagen } from './Uttaksdagen';
import situasjonsregler from './situasjonsregler';
import Settings from '../settings';
import { getAntallForeldreISituasjon } from 'shared/components/foreldrepar/foreldreparUtils';
import { ForeldreparSituasjon } from 'shared/types';

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
    kontoer.filter((konto) => konto.konto === StønadskontoType.Mødrekvote);

const getFarsStønadskontoer = (kontoer: TilgjengeligStønadskonto[]): TilgjengeligStønadskonto[] =>
    kontoer.filter((konto) => konto.konto === StønadskontoType.Fedrekvote);

const getForeldrepengeKontoer = (kontoer: TilgjengeligStønadskonto[]): TilgjengeligStønadskonto[] =>
    kontoer.filter((konto) => konto.konto === StønadskontoType.Foreldrepenger);

const getFlerbarnskonto = (kontoer: TilgjengeligStønadskonto[]): TilgjengeligStønadskonto[] =>
    kontoer.filter((konto) => konto.konto === StønadskontoType.Flerbarnsdager);

const getFellesStønadskontoer = (kontoer: TilgjengeligStønadskonto[]): TilgjengeligStønadskonto[] =>
    kontoer.filter(
        (konto) => konto.konto === StønadskontoType.Fellesperiode || konto.konto === StønadskontoType.Flerbarnsdager
    );

const kontoErFørTermin = (konto: TilgjengeligStønadskonto): boolean => {
    return konto.konto === StønadskontoType.ForeldrepengerFørFødsel;
};

const kontoErEtterTermin = (konto: TilgjengeligStønadskonto): boolean => {
    return konto.konto !== StønadskontoType.ForeldrepengerFørFødsel;
};

export const getTilgjengeligeDager = (
    situasjon: ForeldreparSituasjon,
    kontoer: TilgjengeligStønadskonto[],
    forelderVedAleneomsorg: Forelder | undefined
): TilgjengeligeDager => {
    const erDeltOmsorg = getAntallForeldreISituasjon(situasjon) === 2;
    const kontoerEtterTermin = kontoer.filter(kontoErEtterTermin);

    const dagerTotalt = summerAntallDagerIKontoer(kontoer);
    const dagerForeldrepengerFørFødsel = summerAntallDagerIKontoer(kontoer.filter(kontoErFørTermin));
    const dagerEtterTermin = summerAntallDagerIKontoer(kontoerEtterTermin);
    const dagerForeldrepenger = summerAntallDagerIKontoer(getForeldrepengeKontoer(kontoerEtterTermin));
    const dagerMor = summerAntallDagerIKontoer(getMorsStønadskontoer(kontoerEtterTermin));
    const dagerFar = summerAntallDagerIKontoer(getFarsStønadskontoer(kontoerEtterTermin));
    const dagerFelles = summerAntallDagerIKontoer(getFellesStønadskontoer(kontoerEtterTermin));
    const flerbarnsdager = summerAntallDagerIKontoer(getFlerbarnskonto(kontoerEtterTermin));

    const dagerKunTilMor =
        erDeltOmsorg === false &&
        (situasjonsregler.harMorAleneomsorg(situasjon, forelderVedAleneomsorg) ||
            situasjonsregler.harMorRett(situasjon));
    const dagerKunTilFar =
        erDeltOmsorg === false &&
        (situasjonsregler.harFarAleneomsorg(situasjon, forelderVedAleneomsorg) ||
            situasjonsregler.harFarRett(situasjon));

    const maksDagerFar = dagerKunTilFar ? dagerForeldrepenger : dagerFar + dagerFelles;
    const maksDagerMor = dagerKunTilMor ? dagerForeldrepenger : dagerMor + dagerFelles;

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
    situasjon: ForeldreparSituasjon,
    familiehendelsesdato: Date,
    antallDagerFørTermin: number,
    erMor?: boolean
): UttakFørTerminPeriode | undefined => {
    switch (situasjon) {
        case ForeldreparSituasjon.bareFar:
        case ForeldreparSituasjon.farOgFar:
            return undefined;
        default:
            if (situasjon === ForeldreparSituasjon.aleneomsorg && erMor === false) {
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

export const kanBeggeForeldreVelgesForPeriodetype = (periodetype: Periodetype | undefined) => {
    switch (periodetype) {
        case Periodetype.Arbeid:
        case Periodetype.Ferie:
            return Settings.kanVelgeBeggeForeldreFerieOgArbeid;
        default:
            return false;
    }
};
