import { Periode, PeriodeUttaksinfo, Periodetype } from '../types';
import { isValidTidsperiode, Tidsperioden } from './Tidsperioden';
import { getUkerOgDagerFromDager } from 'common/utils/datoUtils';

const beregnBrukteUttaksdager = (
    type: Periodetype,
    uttaksdager: number,
    helligdager: number,
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
            return helligdager;
        case Periodetype.UbetaltPermisjon:
            return 0;
        case Periodetype.Arbeid:
            return 0;
    }
};

export const getUttaksinfoFromPeriode = (periode: Periode): PeriodeUttaksinfo | undefined => {
    const { tidsperiode } = periode;
    if (isValidTidsperiode(tidsperiode)) {
        const uttaksdager = Tidsperioden(tidsperiode).getAntallUttaksdager();
        const helligdager = Tidsperioden(tidsperiode).getAntallHelligdager();
        const uttaksdagerBrukt = beregnBrukteUttaksdager(periode.type, uttaksdager, helligdager, periode.gradering);
        return {
            uttaksdager,
            helligdager,
            ukerOgDager: getUkerOgDagerFromDager(uttaksdager),
            uttaksdagerBrukt
        };
    }
    return undefined;
};
