import { TilgjengeligStønadskonto, StønadskontoType, TilgjengeligeDager } from '../types';

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

export const getTilgjengeligeDager = (kontoer: TilgjengeligStønadskonto[]): TilgjengeligeDager => {
    return {
        dagerTotalt: summerAntallDagerIKontoer(kontoer),
        dagerForbeholdtMor: summerAntallDagerIKontoer(getMorsStønadskontoer(kontoer)),
        dagerForbeholdtFar: summerAntallDagerIKontoer(getFarsStønadskontoer(kontoer)),
        dagerFelles: summerAntallDagerIKontoer(getFellesStønadskontoer(kontoer)),
        stønadskontoer: kontoer
    };
};
