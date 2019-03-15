import { RegelAlvorlighet, RegelTestresultat, Regelgrunnlag, RegelTest, Regel } from '../types';
import { RegelKey } from '../regelKeys';
import { Situasjon } from '../../../types';

const bareFarHarRettAktivitetskravMorInfo: RegelTest = (key: RegelKey, grunnlag: Regelgrunnlag): RegelTestresultat => {
    const { situasjon } = grunnlag;
    if (situasjon === Situasjon.bareFar) {
        return {
            key,
            passerer: false,
            regelbrudd: {
                key,
                alvorlighet: RegelAlvorlighet.INFO,
                feilmelding: {
                    intlKey: `regel.info.${key}`
                }
            }
        };
    }
    return {
        key,
        passerer: true
    };
};

export const bareFarHarRettAktivitetskravMorInfoRegel: Regel = {
    key: RegelKey.bareFarHarRettAktivitetskravMorInfo,
    test: bareFarHarRettAktivitetskravMorInfo
};
