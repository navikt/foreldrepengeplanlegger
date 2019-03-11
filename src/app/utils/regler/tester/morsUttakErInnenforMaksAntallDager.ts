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

    const passerer = forbruk.mor.dagerForMye <= 0;
    const maksDager =
        tilgjengeligeDager.maksDagerMor +
        (forbruk.skalHaForeldrepengerFørFødsel ? forbruk.mor.dagerForeldrepengerFørFødsel : 0);

    return {
        key,
        passerer: forbruk.mor.dagerErOk,
        regelbrudd: passerer
            ? undefined
            : {
                  alvorlighet: RegelAlvorlighet.ULOVLIG,
                  key,
                  feilmelding: {
                      intlKey: `regel.feiler.${key}`,
                      values: {
                          navn: navnMor,
                          dagerTilgjengelig: (intl: InjectedIntl) => getVarighetString(maksDager, intl),
                          dagerRegistrert: (intl: InjectedIntl) =>
                              getVarighetString(Math.abs(forbruk.mor.dagerTotalt), intl)
                      }
                  }
              }
    };
};

export const morsUttakErInnenforMaksAntallDagerRegel: Regel = {
    key: RegelKey.morsUttakErInnenforMaksAntallDager,
    test: morsUttakErInnenforMaksAntallDager,
    erRelevant: ({ erAleneomsorg }) => (erAleneomsorg ? false : true)
};
