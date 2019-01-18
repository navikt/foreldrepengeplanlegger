import { Periodetype, Periode } from '../types';

export const changePeriodeType = (periode: Periode, type: Periodetype): Periode => {
    switch (type) {
        case Periodetype.Ferie:
            return {
                ...periode,
                type: Periodetype.Ferie
            };
        case Periodetype.Arbeid:
            return {
                ...periode,
                type: Periodetype.Arbeid
            };
        case Periodetype.Uttak:
            return {
                ...periode,
                type: Periodetype.Uttak
            };
        case Periodetype.UbetaltPermisjon:
            return {
                ...periode,
                type: Periodetype.UbetaltPermisjon
            };
    }
};
