import { Periode, Uttaksinfo, Periodetype } from '../types';
import { isValidTidsperiode, Tidsperioden } from './Tidsperioden';
import Features from '../features';

const beregnBrukteUttaksdager = (
    type: Periodetype,
    uttaksdager: number,
    fridager: number,
    gradering?: number
): number => {
    switch (type) {
        case Periodetype.Uttak:
        case Periodetype.UttakFørTermin:
            return uttaksdager;
        case Periodetype.GradertUttak:
            if (gradering === undefined || isNaN(gradering)) {
                return uttaksdager;
            }
            if (Features.avrundGraderingPerPeriode) {
                return Math.floor(uttaksdager * (gradering / 100));
            }
            return uttaksdager * (gradering / 100);
        case Periodetype.Ferie:
            return fridager;
        case Periodetype.UlønnetPermisjon:
            return 0;
        case Periodetype.Arbeid:
            return 0;
    }
};

export const getUttaksinfoForPeriode = (periode: Periode): Uttaksinfo | undefined => {
    const { tidsperiode } = periode;
    if (isValidTidsperiode(tidsperiode)) {
        const antallUttaksdager =
            periode.type === Periodetype.UttakFørTermin && periode.skalIkkeHaUttakFørTermin
                ? 0
                : Tidsperioden(tidsperiode).getAntallUttaksdager();
        const antallFridager = Tidsperioden(tidsperiode).getAntallFridager();
        const antallUttaksdagerBrukt = beregnBrukteUttaksdager(
            periode.type,
            antallUttaksdager,
            antallFridager,
            periode.gradering
        );
        return {
            antallUttaksdager,
            antallFridager,
            antallUttaksdagerBrukt
        };
    }
    return undefined;
};
