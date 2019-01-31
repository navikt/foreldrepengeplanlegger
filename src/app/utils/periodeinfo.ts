import { Periode, PeriodeUttaksinfo, Periodetype } from '../types';
import { isValidTidsperiode, Tidsperioden } from './Tidsperioden';
import { getUkerOgDagerFromDager } from 'common/utils/datoUtils';

const beregnBrukteUttaksdager = (
    type: Periodetype,
    uttaksdager: number,
    fridager: number,
    gradering?: number
): number => {
    switch (type) {
        case Periodetype.Uttak:
            return uttaksdager;
        case Periodetype.GradertUttak:
            if (gradering === undefined || isNaN(gradering)) {
                return uttaksdager;
            }
            return Math.floor(uttaksdager * (gradering / 100));
        case Periodetype.Ferie:
            return fridager;
        case Periodetype.UbetaltPermisjon:
            return 0;
        case Periodetype.Arbeid:
            return 0;
    }
};

export const getUttaksinfoForPeriode = (periode: Periode): PeriodeUttaksinfo | undefined => {
    const { tidsperiode } = periode;
    if (isValidTidsperiode(tidsperiode)) {
        const uttaksdager = Tidsperioden(tidsperiode).getAntallUttaksdager();
        const fridager = Tidsperioden(tidsperiode).getAntallFridager();
        const uttaksdagerBrukt = beregnBrukteUttaksdager(periode.type, uttaksdager, fridager, periode.gradering);
        return {
            uttaksdager,
            fridager,
            ukerOgDager: getUkerOgDagerFromDager(uttaksdager),
            uttaksdagerBrukt
        };
    }
    return undefined;
};
