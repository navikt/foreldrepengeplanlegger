import { RegelAlvorlighet, RegelTestresultat, Regelgrunnlag, RegelTest, Regel } from '../types';
import { RegelKey } from '../regelKeys';
import { Forelder, Periodetype } from '../../../types';

const farMedmorUtsetterPgaArbeidInfo: RegelTest = (key: RegelKey, grunnlag: Regelgrunnlag): RegelTestresultat => {
    const { perioder } = grunnlag;
    const morsPerioderMedArbeid = perioder.filter(
        (p) =>
            p.forelder === Forelder.farMedmor && (p.type === Periodetype.Arbeid || p.type === Periodetype.GradertUttak)
    );
    if (morsPerioderMedArbeid.length > 0) {
        const { navnFarMedmor } = grunnlag;
        return {
            key,
            passerer: false,
            regelbrudd: {
                key,
                alvorlighet: RegelAlvorlighet.INFO,
                feilmelding: {
                    intlKey: `regel.info.${key}`,
                    values: {
                        navnFarMedmor
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

export const farMedmorUtsetterPgaArbeidInfoRegel: Regel = {
    key: RegelKey.farMedmorUtsetterPgaArbeidInfo,
    test: farMedmorUtsetterPgaArbeidInfo,
    erRelevant: (grunnlag) => grunnlag.erMor === false
};
