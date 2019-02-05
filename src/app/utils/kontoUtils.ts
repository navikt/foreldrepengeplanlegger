import {
    TilgjengeligStønadskonto,
    StønadskontoType,
    TilgjengeligeDager,
    Periode,
    Forelder,
    Periodetype,
    UttakFørTerminPeriode,
    TilgjengeligeUker
} from '../types';
import { guid } from 'nav-frontend-js-utils';
import { getUttaksinfoForPeriode } from './uttaksinfo';
import { Uttaksdagen } from './Uttaksdagen';

export const getVelgbareStønadskontotyper = (stønadskontoTyper: TilgjengeligStønadskonto[]): StønadskontoType[] =>
    stønadskontoTyper
        .filter(
            (kontoType) =>
                kontoType.stønadskontoType === StønadskontoType.Flerbarnsdager ||
                kontoType.stønadskontoType === StønadskontoType.Fellesperiode ||
                kontoType.stønadskontoType === StønadskontoType.Fedrekvote ||
                kontoType.stønadskontoType === StønadskontoType.Mødrekvote ||
                kontoType.stønadskontoType === StønadskontoType.Foreldrepenger ||
                kontoType.stønadskontoType === StønadskontoType.AktivitetsfriKvote
        )
        .map((kontoType) => kontoType.stønadskontoType);

export const getStønadskontoSortOrder = (konto: StønadskontoType): number => stønadskontoSortOrder[konto];

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

export const summerAntallDagerIKontoer = (kontoer: TilgjengeligStønadskonto[]): number => {
    return kontoer.reduce((dager, konto) => konto.dager + dager, 0);
};

const getMorsStønadskontoer = (kontoer: TilgjengeligStønadskonto[]): TilgjengeligStønadskonto[] =>
    kontoer.filter(
        (konto) =>
            konto.stønadskontoType === StønadskontoType.Mødrekvote ||
            konto.stønadskontoType === StønadskontoType.ForeldrepengerFørFødsel
    );

const getFarsStønadskontoer = (kontoer: TilgjengeligStønadskonto[]): TilgjengeligStønadskonto[] =>
    kontoer.filter((konto) => konto.stønadskontoType === StønadskontoType.Fedrekvote);

const getFellesStønadskontoer = (kontoer: TilgjengeligStønadskonto[]): TilgjengeligStønadskonto[] =>
    kontoer.filter(
        (konto) =>
            konto.stønadskontoType !== StønadskontoType.Fedrekvote &&
            konto.stønadskontoType !== StønadskontoType.Mødrekvote &&
            konto.stønadskontoType !== StønadskontoType.ForeldrepengerFørFødsel
    );

const getDagerFørTermin = (kontoer: TilgjengeligStønadskonto[]): number => {
    const konto = kontoer.find((k) => k.stønadskontoType === StønadskontoType.ForeldrepengerFørFødsel);
    return konto ? konto.dager : 0;
};

export const getTilgjengeligeDager = (kontoer: TilgjengeligStønadskonto[]): TilgjengeligeDager => {
    return {
        dagerTotalt: summerAntallDagerIKontoer(kontoer),
        dagerForbeholdtMor: summerAntallDagerIKontoer(getMorsStønadskontoer(kontoer)),
        dagerForbeholdtFar: summerAntallDagerIKontoer(getFarsStønadskontoer(kontoer)),
        dagerFelles: summerAntallDagerIKontoer(getFellesStønadskontoer(kontoer)),
        dagerFørTermin: getDagerFørTermin(kontoer),
        stønadskontoer: kontoer
    };
};

export const getTilgjengeligeUker = (tilgjengeligeDager: TilgjengeligeDager): TilgjengeligeUker => {
    return {
        ukerTotalt: tilgjengeligeDager.dagerTotalt / 5,
        ukerForbeholdtMor: tilgjengeligeDager.dagerForbeholdtMor / 5,
        ukerForbeholdtFar: tilgjengeligeDager.dagerForbeholdtFar / 5,
        ukerFelles: tilgjengeligeDager.dagerFelles / 5,
        ukerFørTermin: tilgjengeligeDager.dagerFørTermin / 5
    };
};

export const getPeriodeFørTermin = (
    familiehendelsesdato: Date,
    antallDagerFørTermin: number
): UttakFørTerminPeriode => {
    const tom = Uttaksdagen(familiehendelsesdato).forrige();
    const fom = Uttaksdagen(tom).trekkFra(antallDagerFørTermin - 1);
    const periode: Periode = {
        type: Periodetype.UttakFørTermin,
        id: guid(),
        forelder: Forelder.mor,
        tidsperiode: { fom, tom }
    };
    periode.uttaksinfo = getUttaksinfoForPeriode(periode);
    return periode;
};
