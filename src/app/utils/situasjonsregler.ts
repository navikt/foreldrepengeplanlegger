import { Situasjon } from '../types';

const situasjonsregler = {
    harFarAleneomsorg: (situasjon: Situasjon): boolean => {
        return situasjon === Situasjon.aleneomsorg || situasjon === Situasjon.bareFar;
    },
    harFarRett: (situasjon: Situasjon): boolean => {
        return (
            situasjon === Situasjon.aleneomsorg ||
            situasjon === Situasjon.bareFar ||
            situasjon === Situasjon.farOgMor ||
            situasjon === Situasjon.farOgFar ||
            situasjon === Situasjon.morOgMedmor
        );
    },
    harMorAleneomsorg: (situasjon: Situasjon): boolean => {
        return situasjon === Situasjon.aleneomsorg || situasjon === Situasjon.bareMor;
    },
    harMorRett: (situasjon: Situasjon): boolean => {
        return (
            situasjon === Situasjon.aleneomsorg ||
            situasjon === Situasjon.bareMor ||
            situasjon === Situasjon.farOgMor ||
            situasjon === Situasjon.farOgFar ||
            situasjon === Situasjon.morOgMedmor
        );
    }
};

export default situasjonsregler;
