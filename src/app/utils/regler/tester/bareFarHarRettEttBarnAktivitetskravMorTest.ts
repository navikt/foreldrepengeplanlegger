import { RegelTestresultat, RegelTest } from '../../../../shared/types/regelTypes';
import { ForeldreparSituasjon } from '../../../types';
import { Regelgrunnlag } from '../types';

export const bareFarHarRettEttBarnAktivitetskravMorTest: RegelTest = (grunnlag: Regelgrunnlag): RegelTestresultat => {
    const { situasjon } = grunnlag;
    return {
        passerer: situasjon !== ForeldreparSituasjon.bareFar
    };
};
