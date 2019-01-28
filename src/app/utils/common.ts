import moment from 'moment';
import { Situasjon } from '../types';
import { Avgrensninger } from 'nav-datovelger';

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

export const getTermindatoAvgrensninger = (): Avgrensninger => {
    return {
        minDato: moment()
            .subtract(6, 'months')
            .toDate(),
        maksDato: moment()
            .add(24, 'months')
            .toDate()
    };
};
