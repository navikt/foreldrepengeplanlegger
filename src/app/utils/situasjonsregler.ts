import { Situasjon, Forelder } from '../types';

const situasjonsregler = {
    harFarAleneomsorg: (situasjon: Situasjon, valgtForelder?: Forelder): boolean => {
        return (
            (situasjon === Situasjon.aleneomsorg && valgtForelder === Forelder.farMedmor) ||
            situasjon === Situasjon.bareFar
        );
    },
    harFarRett: (situasjon: Situasjon, forelder?: Forelder): boolean => {
        return (
            (situasjon === Situasjon.aleneomsorg && forelder === Forelder.farMedmor) ||
            situasjon === Situasjon.bareFar ||
            situasjon === Situasjon.farOgMor ||
            situasjon === Situasjon.farOgFar ||
            situasjon === Situasjon.morOgMedmor
        );
    },
    harMorAleneomsorg: (situasjon: Situasjon, valgtForelder?: Forelder): boolean => {
        return (
            (situasjon === Situasjon.aleneomsorg && valgtForelder === Forelder.mor) || situasjon === Situasjon.bareMor
        );
    },
    harMorRett: (situasjon: Situasjon, forelder?: Forelder): boolean => {
        return (
            (situasjon === Situasjon.aleneomsorg && forelder === Forelder.mor) ||
            situasjon === Situasjon.bareMor ||
            situasjon === Situasjon.farOgMor ||
            situasjon === Situasjon.farOgFar ||
            situasjon === Situasjon.morOgMedmor
        );
    }
};

export default situasjonsregler;
