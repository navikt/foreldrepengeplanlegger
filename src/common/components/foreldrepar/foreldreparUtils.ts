import { Situasjon, ForeldreparForelder, ForeldreparIllustrasjonsvariant } from 'app/types';

export interface SituasjonForelderSvg {
    farMedmor: ForeldreparForelder;
    mor?: ForeldreparForelder;
    variant?: ForeldreparIllustrasjonsvariant;
}

export const getSituasjonForelderSvg = (situasjon: Situasjon): SituasjonForelderSvg => {
    switch (situasjon) {
        case Situasjon.farOgMor:
            return {
                farMedmor: 'far1',
                mor: 'mor1'
            };
        case Situasjon.bareFar:
            return {
                farMedmor: 'far1',
                mor: 'mor1',
                variant: 'andreForelderHalvtSynlig'
            };
        case Situasjon.bareMor:
            return {
                farMedmor: 'far1',
                mor: 'mor1',
                variant: 'førsteForelderHalvtSynlig'
            };
        case Situasjon.aleneomsorg:
            return {
                farMedmor: 'far2',
                mor: 'mor2',
                variant: 'foreldreSeparert'
            };
        case Situasjon.morOgMedmor:
            return {
                farMedmor: 'medmor1',
                mor: 'medmor2'
            };
        case Situasjon.farOgFar:
            return {
                farMedmor: 'far4',
                mor: 'far3'
            };
    }
};
