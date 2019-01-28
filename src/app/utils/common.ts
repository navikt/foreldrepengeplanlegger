import { Situasjon } from '../types';

export const getAntallForeldreISituasjon = (situasjon: Situasjon) => {
    switch (situasjon) {
        case Situasjon.aleneomsorg:
        case Situasjon.bareFar:
        case Situasjon.bareMor:
            return 1;
        default:
            return 2;
    }
};

export const inputHasValue = (value: string | undefined) => {
    return value !== undefined && value !== '';
};
