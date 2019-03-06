import { RegelTestresultat, Regelgrunnlag, RegelTest, Regel, RegelAlvorlighet } from '../types';
import { RegelKey } from '../regelKeys';
import { InjectedIntl } from 'react-intl';
import { getVarighetString } from 'common/utils/intlUtils';

const alleUttakErInnenforMaksAntallDager: RegelTest = (key: RegelKey, grunnlag: Regelgrunnlag): RegelTestresultat => {
    const { forbruk, tilgjengeligeDager, navnMor } = grunnlag;

    if (forbruk === undefined || tilgjengeligeDager === undefined) {
        return {
            key,
            passerer: true
        };
    }

    const { dagerGjenstående, dagerEtterTermin, skalHaForeldrepengerFørFødsel } = forbruk;
    const passerer = dagerGjenstående >= 0;

    const fffDager = skalHaForeldrepengerFørFødsel ? tilgjengeligeDager.dagerForeldrepengerFørFødsel : 0;

    const dagerTilgjengelig = dagerEtterTermin + fffDager;
    const dagerRegistrert = dagerEtterTermin + Math.abs(dagerGjenstående) + fffDager;

    return {
        key,
        passerer,
        regelbrudd: passerer
            ? undefined
            : {
                  alvorlighet: RegelAlvorlighet.ULOVLIG,
                  key,
                  feilmelding: {
                      intlKey: `regel.feiler.${key}`,
                      values: {
                          navn: navnMor,
                          dagerTilgjengelig: (intl: InjectedIntl) => getVarighetString(dagerTilgjengelig, intl),
                          dagerRegistrert: (intl: InjectedIntl) => getVarighetString(dagerRegistrert, intl)
                      }
                  }
              }
    };
};

export const alleUttakErInnenforMaksAntallDagerRegel: Regel = {
    key: RegelKey.alleUttakErInnenforMaksAntallDager,
    test: alleUttakErInnenforMaksAntallDager
};
