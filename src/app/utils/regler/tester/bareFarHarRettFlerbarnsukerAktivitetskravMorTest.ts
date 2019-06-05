import { RegelTestresultat, RegelTest } from '../../../../shared/types/regelTypes';
import { ForeldreparSituasjon } from 'app/types';
import { Regelgrunnlag } from '../types';

export const bareFarHarRettFlerbarnsukerAktivitetskravMorTest: RegelTest = (
    grunnlag: Regelgrunnlag
): RegelTestresultat => {
    const { situasjon, antallBarn } = grunnlag;
    return {
        passerer: (situasjon === ForeldreparSituasjon.bareFar && antallBarn > 1) === false
    };
};
