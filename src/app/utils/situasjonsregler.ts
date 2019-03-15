import { Situasjon, Forelder } from '../types';

const situasjonsregler = {
    harFarAleneomsorg: (situasjon: Situasjon, valgtForelder: Forelder | undefined): boolean => {
        return situasjon === Situasjon.aleneomsorg && valgtForelder === Forelder.farMedmor;
    },
    harFarRett: (situasjon: Situasjon): boolean => {
        return (
            situasjon === Situasjon.bareFar ||
            situasjon === Situasjon.farOgMor ||
            situasjon === Situasjon.farOgFar ||
            situasjon === Situasjon.morOgMedmor
        );
    },
    harMorAleneomsorg: (situasjon: Situasjon, valgtForelder: Forelder | undefined): boolean => {
        return situasjon === Situasjon.aleneomsorg && valgtForelder === Forelder.mor;
    },
    harMorRett: (situasjon: Situasjon): boolean => {
        return (
            situasjon === Situasjon.bareMor ||
            situasjon === Situasjon.farOgMor ||
            situasjon === Situasjon.farOgFar ||
            situasjon === Situasjon.morOgMedmor
        );
    }
};

export default situasjonsregler;
