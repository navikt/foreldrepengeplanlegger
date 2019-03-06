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

    const { dagerGjenstående, dagerEtterTermin } = forbruk;
    const passerer = dagerGjenstående >= 0;

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
                          dagerTilgjengelig: (intl: InjectedIntl) => getVarighetString(dagerEtterTermin, intl),
                          dagerRegistrert: (intl: InjectedIntl) =>
                              getVarighetString(Math.abs(dagerEtterTermin + Math.abs(dagerGjenstående)), intl)
                      }
                  }
              }
    };
};

export const alleUttakErInnenforMaksAntallDagerRegel: Regel = {
    key: RegelKey.alleUttakErInnenforMaksAntallDager,
    test: alleUttakErInnenforMaksAntallDager
};
