import { TilgjengeligStønadskonto, StønadskontoType, Periode, Forelder, Periodetype } from '../../types';
import { Uttaksdagen } from '../Uttaksdagen';
import { getTidsperiode } from '../Tidsperioden';
import { guid } from 'nav-frontend-js-utils';

export const ikkeDeltUttakForslag = (
    famDato: Date,
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[]
): Periode[] => {
    const førsteUttaksdag = Uttaksdagen(famDato).denneEllerNeste();
    const foreldrepengerFørFødselKonto = tilgjengeligeStønadskontoer.find(
        (k) => k.konto === StønadskontoType.ForeldrepengerFørFødsel
    );
    const fpKonto = tilgjengeligeStønadskontoer.find((k) => k.konto === StønadskontoType.Foreldrepenger);
    if (fpKonto) {
        return [
            {
                id: guid(),
                forelder: foreldrepengerFørFødselKonto !== undefined ? Forelder.mor : Forelder.farMedmor,
                tidsperiode: getTidsperiode(førsteUttaksdag, fpKonto.dager),
                type: Periodetype.Uttak
            }
        ];
    }
    return [];
};
