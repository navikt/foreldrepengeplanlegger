import { Forelder, Periodetype, UttaksplanColor } from '../types';

const getForelderFarge = (forelder?: Forelder): UttaksplanColor => {
    return forelder ? (forelder === Forelder.mor ? 'purple' : 'blue') : 'gray';
};

export const getPeriodetypeFarge = (periodetype: Periodetype | undefined, forelder?: Forelder): UttaksplanColor => {
    switch (periodetype) {
        case Periodetype.Arbeid:
        case Periodetype.Ferie:
            return 'green';
        default:
            return getForelderFarge(forelder);
    }
};
