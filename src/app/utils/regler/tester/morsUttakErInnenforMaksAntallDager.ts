import { RegelTestresultat, Regelgrunnlag, RegelTest, Regel, RegelAlvorlighet } from '../types';
import { RegelKey } from '../regelKeys';
import { InjectedIntl } from 'react-intl';
import { getVarighetString } from 'common/utils/intlUtils';

const morsUttakErInnenforMaksAntallDager: RegelTest = (regel: Regel, grunnlag: Regelgrunnlag): RegelTestresultat => {
    const { forbruk, tilgjengeligeDager, navnMor } = grunnlag;
    const { key, overstyresAvRegel } = regel;

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
                  },
                  overstyresAvRegel
              }
    };
};

export const morsUttakErInnenforMaksAntallDagerRegel: Regel = {
    key: RegelKey.morsUttakErInnenforMaksAntallDager,
    test: morsUttakErInnenforMaksAntallDager,
    erRelevant: ({ erDeltOmsorg }) => erDeltOmsorg,
    overstyresAvRegel: RegelKey.alleUttakErInnenforMaksAntallDager
};
