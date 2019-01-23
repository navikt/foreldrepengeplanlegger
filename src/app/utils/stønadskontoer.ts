import { TilgjengeligStønadskonto, StønadskontoType, TilgjengeligeDager } from '../types/st\u00F8nadskontoer';
import { Dekningsgrad } from 'common/types';

export const getVelgbareStønadskontotyper = (stønadskontoTyper: TilgjengeligStønadskonto[]): StønadskontoType[] =>
    stønadskontoTyper
        .filter(
            (kontoType) =>
                kontoType.stønadskonto === StønadskontoType.Flerbarnsdager ||
                kontoType.stønadskonto === StønadskontoType.Fellesperiode ||
                kontoType.stønadskonto === StønadskontoType.Fedrekvote ||
                kontoType.stønadskonto === StønadskontoType.Mødrekvote ||
                kontoType.stønadskonto === StønadskontoType.Foreldrepenger ||
                kontoType.stønadskonto === StønadskontoType.AktivitetsfriKvote
        )
        .map((kontoType) => kontoType.stønadskonto);

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

const getKontodagerForDekningsgrad = (konto: TilgjengeligStønadskonto, dekningsgrad: Dekningsgrad): number =>
    dekningsgrad === '80' ? konto.dager80 : konto.dager100;

const summerAntallDager = (kontoer: TilgjengeligStønadskonto[], dekningsgrad: Dekningsgrad): number => {
    return kontoer.reduce((dager, konto) => getKontodagerForDekningsgrad(konto, dekningsgrad) + dager, 0);
};

export const getTilgjengeligeDagerFraKontoer = (kontoer: TilgjengeligStønadskonto[]): TilgjengeligeDager => {
    return {
        kontoer,
        dekningsgrad80: {
            totaltAntallDager: summerAntallDager(kontoer, '80')
        },
        dekningsgrad100: {
            totaltAntallDager: summerAntallDager(kontoer, '100')
        },
        harTilgjengeligeDager: kontoer.length > 0
    };
};
