import { Situasjon, ForeldreparForelder, ForeldreparIllustrasjonsvariant } from 'app/types';

export interface SituasjonForelderSvg {
    forelder1: ForeldreparForelder;
    forelder2?: ForeldreparForelder;
    variant?: ForeldreparIllustrasjonsvariant;
}

export const getSituasjonForelderSvg = (situasjon: Situasjon): SituasjonForelderSvg => {
    switch (situasjon) {
        case Situasjon.farOgMor:
            return {
                forelder1: 'far1',
                forelder2: 'mor1'
            };
        case Situasjon.bareFar:
            return {
                forelder1: 'far1',
                forelder2: 'mor1',
                variant: 'andreForelderHalvtSynlig'
            };
        case Situasjon.bareMor:
            return {
                forelder1: 'far1',
                forelder2: 'mor1',
                variant: 'førsteForelderHalvtSynlig'
            };
        case Situasjon.aleneomsorg:
            return {
                forelder1: 'far2',
                forelder2: 'mor2',
                variant: 'foreldreSeparert'
            };
        case Situasjon.morOgMedmor:
            return {
                forelder1: 'medmor1',
                forelder2: 'medmor2'
            };
        case Situasjon.farOgFar:
            return {
                forelder1: 'far4',
                forelder2: 'far3'
            };
    }
};
