import { TilgjengeligStønadskonto, StønadskontoType } from '../types/st\u00F8nadskontoer';

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
