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
                          dager: (intl) => getVarighetString(dagerAvFellesperiode, intl),
                      },
                      renderAsHtml: true,
                      htmlValues: {
                          lenke: {
                              href: 'https://www.nav.no/no/person/familie/foreldrepenger/foreldrepenger#hvor-lenge-kan-du-fa-foreldrepenger',
                          },
                      },
                  },
        };
    }
    return {
        passerer: true,
    };
};
