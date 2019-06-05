import { RegelTestresultat, RegelTest } from '../../../../shared/types/regelTypes';
import { Regelgrunnlag } from '../types';
import { ForeldreparSituasjon } from 'shared/types';

export const bareFarHarRettFlerbarnsukerAktivitetskravMorTest: RegelTest = (
    grunnlag: Regelgrunnlag
): RegelTestresultat => {
    const { situasjon, antallBarn } = grunnlag;
    return {
        passerer: (situasjon === ForeldreparSituasjon.bareFar && antallBarn > 1) === false
    };
};
