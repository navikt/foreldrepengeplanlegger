import { RegelTestresultat, RegelTest } from '../../../../shared/types';
import { getVarighetString } from 'common/util/intlUtils';
import { Regelgrunnlag } from '../types';

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
                          lenke: 'https://familie.nav.no/om-foreldrepenger#hvor-lenge-kan-du-fa-foreldrepenger',
                          dager: (intl) => getVarighetString(dagerAvFellesperiode, intl)
                      },
                      renderAsHtml: true
                  }
        };
    }
    return {
        passerer: true
    };
};
