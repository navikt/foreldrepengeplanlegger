import { Periode, PeriodeUttaksinfo } from '../types';
import { isValidTidsperiode, Tidsperioden } from './Tidsperioden';

export const getPeriodeUttaksinfo = (periode: Periode): PeriodeUttaksinfo | undefined => {
    const { tidsperiode } = periode;
    if (isValidTidsperiode(tidsperiode)) {
        const uttaksdager = Tidsperioden(tidsperiode).getAntallUttaksdager();
        const helligdager = Tidsperioden(tidsperiode).getAntallFridager();
        return {
            uttaksdager,
            helligdager,
            uttaksdagerBrukt: uttaksdager * (periode.gradering || 1)
        };
    }
    return undefined;
};
