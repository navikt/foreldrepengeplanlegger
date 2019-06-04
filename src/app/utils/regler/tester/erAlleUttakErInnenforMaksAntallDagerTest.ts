import { RegelTestresultat, Regelgrunnlag, RegelTest } from '../../../../shared/regler/types';
import { InjectedIntl } from 'react-intl';
import { getVarighetString } from 'common/util/intlUtils';

export const erAlleUttakErInnenforMaksAntallDagerTest: RegelTest = (grunnlag: Regelgrunnlag): RegelTestresultat => {
    const { forbruk, tilgjengeligeDager, navnMor } = grunnlag;

    if (forbruk === undefined || tilgjengeligeDager === undefined) {
        return {
            passerer: true
        };
    }

    const { dagerGjenstående, skalHaForeldrepengerFørFødsel } = forbruk;
    const passerer = dagerGjenstående >= 0;
    const dagerTilgjengelig =
        tilgjengeligeDager.dagerEtterTermin +
        (skalHaForeldrepengerFørFødsel ? tilgjengeligeDager.dagerForeldrepengerFørFødsel : 0);

    return {
        passerer,
        info: passerer
            ? undefined
            : {
                  values: {
                      navn: navnMor,
                      dagerTilgjengelig: (intl: InjectedIntl) => getVarighetString(dagerTilgjengelig, intl),
                      dagerForMye: (intl: InjectedIntl) => getVarighetString(Math.abs(dagerGjenstående), intl)
                  }
              }
    };
};
