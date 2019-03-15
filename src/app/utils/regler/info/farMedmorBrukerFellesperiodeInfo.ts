import { RegelAlvorlighet, RegelTestresultat, Regelgrunnlag, RegelTest, Regel } from '../types';
import { RegelKey } from '../regelKeys';
import { getVarighetString } from 'common/utils/intlUtils';

const farMedmorBrukerFellesperiodeInfo: RegelTest = (regel: Regel, grunnlag: Regelgrunnlag): RegelTestresultat => {
    const { forbruk } = grunnlag;
    const { key } = regel;
    if (forbruk && forbruk.farMedmor && forbruk.farMedmor) {
        const { dagerAvFellesperiode } = forbruk.farMedmor;
        if (dagerAvFellesperiode > 0) {
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
                            navnMor,
                            dager: (intl) => getVarighetString(dagerAvFellesperiode, intl)
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
