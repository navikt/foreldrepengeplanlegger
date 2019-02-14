import { RegelTestresultat, Regelgrunnlag, RegelTest, Regel, RegelAlvorlighet } from '../types';
import { RegelKey } from '../regelKeys';
import { InjectedIntl } from 'react-intl';
import { getVarighetString } from 'common/utils/intlUtils';

const morsUttakErInnenforMaksAntallDager: RegelTest = (key: RegelKey, grunnlag: Regelgrunnlag): RegelTestresultat => {
    const { forbruk, tilgjengeligeDager, navnMor } = grunnlag;

    if (forbruk === undefined || tilgjengeligeDager === undefined) {
        return {
            key,
            passerer: true
        };
    }

    const maksDagerTilMor = tilgjengeligeDager.dagerForbeholdtMor + tilgjengeligeDager.dagerFelles;
    const dagerGjenstående = maksDagerTilMor - forbruk.mor.brukteUttaksdager;
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
                          dagerTilgjengelig: (intl: InjectedIntl) => getVarighetString(maksDagerTilMor, intl),
                          dagerRegistrert: (intl: InjectedIntl) =>
                              getVarighetString(Math.abs(forbruk.mor.brukteUttaksdager), intl)
                      }
                  }
              }
    };
};

export const morsUttakErInnenforMaksAntallDagerRegel: Regel = {
    key: RegelKey.morsUttakErInnenforMaksAntallDager,
    test: morsUttakErInnenforMaksAntallDager
};
