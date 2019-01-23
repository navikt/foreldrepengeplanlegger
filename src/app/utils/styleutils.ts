import { Forelder, Periodetype, UttaksplanColor } from '../types';

const getForelderFarge = (forelder: Forelder) => {
    return forelder === Forelder.forelder1 ? 'purple' : 'blue';
};

export const getPeriodetypeFarge = (periodetype: Periodetype, forelder: Forelder): UttaksplanColor => {
    switch (periodetype) {
        case Periodetype.Arbeid:
        case Periodetype.Ferie:
            return 'green';
        default:
            return getForelderFarge(forelder);
    }
};