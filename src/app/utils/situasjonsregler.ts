import { Situasjon } from '../types';

const situasjonsregler = {
    harFarAleneomsorg: (situasjon: Situasjon): boolean => {
        return situasjon === Situasjon.aleneomsorg || situasjon === Situasjon.bareFar;
    },
    harFarRett: (situasjon: Situasjon): boolean => {
        return situasjon === Situasjon.aleneomsorg || situasjon === Situasjon.bareFar;
    },
    harMorAleneomsorg: (situasjon: Situasjon): boolean => {
        return situasjon === Situasjon.aleneomsorg || situasjon === Situasjon.bareMor;
    },
    harMorRett: (situasjon: Situasjon): boolean => {
        return situasjon === Situasjon.aleneomsorg || situasjon === Situasjon.bareMor;
    }
};

export default situasjonsregler;
