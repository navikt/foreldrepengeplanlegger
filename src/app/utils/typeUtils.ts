import { Periodetype, Periode } from '../types';

export const changePeriodeType = (periode: Periode, type: Periodetype): Periode => {
    if (type === periode.type) {
        return periode;
    }
    switch (type) {
        case Periodetype.Ferie:
            return {
                ...periode,
                type: Periodetype.Ferie,
                gradering: undefined
            };
        case Periodetype.Arbeid:
            return {
                ...periode,
                type: Periodetype.Arbeid,
                gradering: undefined
            };
        case Periodetype.Uttak:
            return {
                ...periode,
                type: Periodetype.Uttak,
                gradering: undefined
            };
        case Periodetype.GradertUttak:
            return {
                ...periode,
                type: Periodetype.GradertUttak,
                gradering: 50
            };
        case Periodetype.UbetaltPermisjon:
            return {
                ...periode,
                type: Periodetype.UbetaltPermisjon,
                gradering: undefined
            };
    }
};
