import { RegelAlvorlighet, RegelTestresultat, Regelgrunnlag, RegelTest, Regel } from '../types';
import { RegelKey } from '../regelKeys';
import { Situasjon } from '../../../types';

const bareFarHarRettFlerbarnsukerAktivitetskravMorInfo: RegelTest = (
    regel: Regel,
    grunnlag: Regelgrunnlag
): RegelTestresultat => {
    const { situasjon, antallBarn } = grunnlag;
    const { key } = regel;
    if (situasjon === Situasjon.bareFar && antallBarn > 1) {
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

export const bareFarHarRettFlerbarnsukerAktivitetskravMorInfoRegel: Regel = {
    key: RegelKey.bareFarHarRettFlerbarnsukerAktivitetskravMorInfo,
    test: bareFarHarRettFlerbarnsukerAktivitetskravMorInfo,
    overstyrerRegler: [RegelKey.bareFarHarRettEttBarnAktivitetskravMorInfo]
};
