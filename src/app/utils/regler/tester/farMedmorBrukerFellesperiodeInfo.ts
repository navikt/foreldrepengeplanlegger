import { RegelAlvorlighet, RegelTestresultat, Regelgrunnlag, RegelTest, Regel } from '../types';
import { RegelKey } from '../regelKeys';

const farMedmorBrukerFellesperiodeInfo: RegelTest = (key: RegelKey, grunnlag: Regelgrunnlag): RegelTestresultat => {
    const { forbruk } = grunnlag;
    if (forbruk && forbruk.farMedmor && forbruk.farMedmor) {
        if (forbruk.farMedmor.dagerAvFellesperiode > 0) {
            const { navnMor, navnFarMedmor } = grunnlag;
            return {
                key,
                passerer: false,
                regelbrudd: {
                    key,
                    alvorlighet: RegelAlvorlighet.INFO,
                    feilmelding: {
                        intlKey: `regel.info.${key}`,
                        values: {
                            navnFarMedmor,
                            navnMor
                        }
                    }
                }
            };
        }
    }
    return {
        key,
        passerer: true
    };
};

export const farMedmorBrukerFellesperiodeInfoRegel: Regel = {
    key: RegelKey.farMedmorBrukerFellesperiodeInfo,
    test: farMedmorBrukerFellesperiodeInfo
};
