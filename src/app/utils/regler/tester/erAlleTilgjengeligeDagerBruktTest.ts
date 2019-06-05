import { RegelTestresultat, RegelTest } from '../../../../shared/types/regelTypes';
import { getVarighetString } from 'common/util/intlUtils';
import { Regelgrunnlag } from '../types';

export const erAlleTilgjengeligeDagerBruktTest: RegelTest = (grunnlag: Regelgrunnlag): RegelTestresultat => {
    const { forbruk } = grunnlag;
    const dager = (forbruk !== undefined && forbruk.dagerGjenstående) || 0;
    const passerer = dager <= 0;
    return {
        passerer,
        info:
            passerer === false
                ? {
                      values: {
                          dager: (intl) => getVarighetString(dager, intl)
                      }
                  }
                : undefined
    };
};
