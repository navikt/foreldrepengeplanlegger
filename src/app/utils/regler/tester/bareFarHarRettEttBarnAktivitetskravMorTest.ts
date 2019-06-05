import { RegelTestresultat, RegelTest } from '../../../../shared/types/regelTypes';

import { Regelgrunnlag } from '../types';
import { ForeldreparSituasjon } from 'shared/types';

export const bareFarHarRettEttBarnAktivitetskravMorTest: RegelTest = (grunnlag: Regelgrunnlag): RegelTestresultat => {
    const { situasjon } = grunnlag;
    return {
        passerer: situasjon !== ForeldreparSituasjon.bareFar
    };
};
