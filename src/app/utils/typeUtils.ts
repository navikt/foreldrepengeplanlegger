import { Periodetype, Periode, PeriodeBase } from '../types';

const getBasePeriode = (periode: Periode): PeriodeBase => {
    if (periode.type === Periodetype.UttakFørTermin) {
        const { skalIkkeHaUttakFørTermin, ...rest } = periode;
        return rest;
    }
    return periode;
};

export const changePeriodeType = (periode: Periode, type: Periodetype): Periode => {
    if (type === periode.type) {
        return periode;
    }
    const basePeriode = getBasePeriode(periode);
    switch (type) {
        case Periodetype.Ferie:
            return {
                ...basePeriode,
                type: Periodetype.Ferie,
                gradering: undefined
            };
        case Periodetype.Arbeid:
            return {
                ...basePeriode,
                type: Periodetype.Arbeid,
                gradering: undefined
            };
        case Periodetype.Uttak:
            return {
                ...basePeriode,
                type: Periodetype.Uttak,
                gradering: undefined
            };
        case Periodetype.UttakFørTermin:
            return {
                ...basePeriode,
                type: Periodetype.UttakFørTermin,
                gradering: undefined
            };
        case Periodetype.GradertUttak:
            return {
                ...basePeriode,
                type: Periodetype.GradertUttak,
                gradering: 50
            };
        case Periodetype.UbetaltPermisjon:
            return {
                ...basePeriode,
                type: Periodetype.UbetaltPermisjon,
                gradering: undefined
            };
    }
};
