import { Forelder, Periodetype, UttaksplanColor } from '../types';

const getForelderFarge = (forelder: Forelder) => {
    return forelder === Forelder.mor ? 'purple' : 'blue';
};

export const getPeriodetypeFarge = (periodetype: Periodetype | undefined, forelder?: Forelder): UttaksplanColor => {
    switch (periodetype) {
        case Periodetype.Arbeid:
        case Periodetype.Ferie:
            return 'green';
        default:
            return getForelderFarge(forelder || Forelder.farMedmor);
    }
};
