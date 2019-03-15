import { RegelAlvorlighet, RegelTestresultat, Regelgrunnlag, RegelTest, Regel } from '../types';
import { RegelKey } from '../regelKeys';
import { Situasjon } from '../../../types';

const bareFarHarRettEttBarnAktivitetskravMorInfo: RegelTest = (
    regel: Regel,
    grunnlag: Regelgrunnlag
): RegelTestresultat => {
    const { situasjon } = grunnlag;
    const { key } = regel;
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

export const bareFarHarRettEttBarnAktivitetskravMorInfoRegel: Regel = {
    key: RegelKey.bareFarHarRettEttBarnAktivitetskravMorInfo,
    test: bareFarHarRettEttBarnAktivitetskravMorInfo
};
