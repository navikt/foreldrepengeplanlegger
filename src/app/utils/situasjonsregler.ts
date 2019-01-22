import { Situasjon } from '../types';

const situasjonsregler = {
    harFarAleneomsorg: (situasjon: Situasjon): boolean => {
        return true;
    },
    harFarRett: (situasjon: Situasjon): boolean => {
        return true;
    },
    harMorAleneomsorg: (situasjon: Situasjon): boolean => {
        return true;
    },
    harMorRett: (situasjon: Situasjon): boolean => {
        return true;
    }
};

export default situasjonsregler;
