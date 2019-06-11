import { Periode, Periodetype } from '../../types';
import { Uttaksdagen } from '../Uttaksdagen';
import { getTidsperiode } from '../Tidsperioden';
import { guid } from 'nav-frontend-js-utils';
import { TilgjengeligStønadskonto, StønadskontoType } from 'shared/types';
import { Forelder } from 'common/types';

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
