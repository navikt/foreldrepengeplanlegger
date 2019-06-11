import { ForeldreparSituasjon } from 'shared/types';
import { Forelder } from 'common/types';

const situasjonsregler = {
    harFarAleneomsorg: (situasjon: ForeldreparSituasjon, valgtForelder: Forelder | undefined): boolean => {
        return situasjon === ForeldreparSituasjon.aleneomsorg && valgtForelder === Forelder.farMedmor;
    },
    harFarRett: (situasjon: ForeldreparSituasjon): boolean => {
        return (
            situasjon === ForeldreparSituasjon.bareFar ||
            situasjon === ForeldreparSituasjon.farOgMor ||
            situasjon === ForeldreparSituasjon.farOgFar ||
            situasjon === ForeldreparSituasjon.morOgMedmor
        );
    },
    harMorAleneomsorg: (situasjon: ForeldreparSituasjon, valgtForelder: Forelder | undefined): boolean => {
        return situasjon === ForeldreparSituasjon.aleneomsorg && valgtForelder === Forelder.mor;
    },
    harMorRett: (situasjon: ForeldreparSituasjon): boolean => {
        return (
            situasjon === ForeldreparSituasjon.bareMor ||
            situasjon === ForeldreparSituasjon.farOgMor ||
            situasjon === ForeldreparSituasjon.farOgFar ||
            situasjon === ForeldreparSituasjon.morOgMedmor
        );
    }
};

export default situasjonsregler;
