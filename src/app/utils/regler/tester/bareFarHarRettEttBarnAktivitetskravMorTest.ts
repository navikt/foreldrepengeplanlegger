import { RegelTestresultat, Regelgrunnlag, RegelTest } from '../types';
import { Situasjon } from '../../../types';

export const bareFarHarRettEttBarnAktivitetskravMorTest: RegelTest = (grunnlag: Regelgrunnlag): RegelTestresultat => {
    const { situasjon } = grunnlag;
    return {
        passerer: situasjon !== Situasjon.bareFar
    };
};
