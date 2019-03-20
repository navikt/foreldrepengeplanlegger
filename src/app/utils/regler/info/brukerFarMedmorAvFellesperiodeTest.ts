import { RegelTestresultat, Regelgrunnlag, RegelTest } from '../types';
import { getVarighetString } from 'common/utils/intlUtils';

export const brukerFarMedmorAvFellesperiodeTest: RegelTest = (grunnlag: Regelgrunnlag): RegelTestresultat => {
    const { forbruk } = grunnlag;
    if (forbruk && forbruk.farMedmor && forbruk.farMedmor) {
        const { dagerAvFellesperiode } = forbruk.farMedmor;
        const { navnMor, navnFarMedmor } = grunnlag;
        const passerer = dagerAvFellesperiode === 0;
        return {
            passerer,
            info: passerer
                ? undefined
                : {
                      values: {
                          navnFarMedmor,
                          navnMor,
                          dager: (intl) => getVarighetString(dagerAvFellesperiode, intl)
                      }
                  }
        };
    }
    return {
        passerer: true
    };
};
