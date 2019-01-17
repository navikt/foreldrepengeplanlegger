import { Periode, PeriodeUttaksinfo } from '../types';
import { isValidTidsperiode, Tidsperioden } from './Tidsperioden';
import { getUkerOgDagerFromDager } from 'common/utils/datoUtils';

export const getPeriodeUttaksinfo = (periode: Periode): PeriodeUttaksinfo | undefined => {
    const { tidsperiode } = periode;
    if (isValidTidsperiode(tidsperiode)) {
        const uttaksdager = Tidsperioden(tidsperiode).getAntallUttaksdager();
        const helligdager = Tidsperioden(tidsperiode).getAntallFridager();
        return {
            uttaksdager,
            helligdager,
            ukerOgDager: getUkerOgDagerFromDager(uttaksdager),
            uttaksdagerBrukt: uttaksdager * (periode.gradering || 1)
        };
    }
    return undefined;
};
