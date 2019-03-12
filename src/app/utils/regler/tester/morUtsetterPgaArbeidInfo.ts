import { RegelAlvorlighet, RegelTestresultat, Regelgrunnlag, RegelTest, Regel } from '../types';
import { RegelKey } from '../regelKeys';
import { Forelder, Periodetype } from '../../../types';

const morUtsetterPgaArbeidInfo: RegelTest = (key: RegelKey, grunnlag: Regelgrunnlag): RegelTestresultat => {
    const { perioder } = grunnlag;
    const morsPerioderMedArbeid = perioder.filter(
        (p) => p.forelder === Forelder.mor && (p.type === Periodetype.Arbeid || p.type === Periodetype.GradertUttak)
    );
    if (morsPerioderMedArbeid.length > 0) {
        const { navnMor } = grunnlag;
        return {
            key,
            passerer: false,
            regelbrudd: {
                key,
                alvorlighet: RegelAlvorlighet.INFO,
                feilmelding: {
                    intlKey: `regel.info.${key}`,
                    values: {
                        navnMor
                    }
                }
            }
        };
    }
    return {
        key,
        passerer: true
    };
};

export const morUtsetterPgaArbeidInfoRegel: Regel = {
    key: RegelKey.morUtsetterPgaArbeidInfo,
    test: morUtsetterPgaArbeidInfo
};
