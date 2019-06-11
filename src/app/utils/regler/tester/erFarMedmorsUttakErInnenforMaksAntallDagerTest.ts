import { RegelTestresultat, RegelTest } from '../../../../shared/types';
import { InjectedIntl } from 'react-intl';
import { getVarighetString } from 'common/util/intlUtils';
import { Regelgrunnlag } from '../types';
import { Forelder } from 'common/types';

export const erFarMedmorsUttakErInnenforMaksAntallDagerTest: RegelTest = (
    grunnlag: Regelgrunnlag
): RegelTestresultat => {
    const { forbruk, tilgjengeligeDager, navnFarMedmor, erDeltOmsorg, forelderVedAleneomsorg } = grunnlag;

    const erRelevant =
        (erDeltOmsorg === false && forelderVedAleneomsorg === Forelder.farMedmor) || erDeltOmsorg === true;
    if (!erRelevant) {
        return {
            passerer: true
        };
    }
    if (forbruk === undefined || tilgjengeligeDager === undefined || forbruk.farMedmor === undefined) {
        return {
            passerer: true
        };
    }

    const maksDager = erDeltOmsorg === false ? tilgjengeligeDager.dagerForeldrepenger : tilgjengeligeDager.maksDagerFar;
    const dagerGjenstående = maksDager - forbruk.farMedmor.dagerTotalt;
    const passerer = dagerGjenstående >= 0;

    return {
        passerer,
        info: passerer
            ? undefined
            : {
                  values: {
                      navn: navnFarMedmor,
                      dagerTilgjengelig: (intl: InjectedIntl) => getVarighetString(maksDager, intl),
                      dagerRegistrert: (intl: InjectedIntl) =>
                          getVarighetString(Math.abs(forbruk.farMedmor!.dagerTotalt), intl)
                  }
              }
    };
};
