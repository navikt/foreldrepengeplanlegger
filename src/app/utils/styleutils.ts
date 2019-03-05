import { Forelder, Periodetype, UttaksplanFarge } from '../types';

const getForelderFarge = (forelder?: Forelder): UttaksplanFarge => {
    return forelder ? (forelder === Forelder.mor ? 'lilla' : 'blaa') : 'graa';
};

export const getPeriodetypeFarge = (periodetype: Periodetype | undefined, forelder?: Forelder): UttaksplanFarge => {
    switch (periodetype) {
        case Periodetype.Arbeid:
        case Periodetype.Ferie:
            return 'gronn';
        default:
            return getForelderFarge(forelder);
    }
};
