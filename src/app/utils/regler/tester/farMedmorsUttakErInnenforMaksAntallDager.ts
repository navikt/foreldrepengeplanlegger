import { RegelTestresultat, Regelgrunnlag, RegelTest, Regel, RegelAlvorlighet } from '../types';
import { RegelKey } from '../regelKeys';
import { InjectedIntl } from 'react-intl';
import { getVarighetString } from 'common/utils/intlUtils';
import { Forelder } from '../../../types';

const farMedmorsUttakErInnenforMaksAntallDager: RegelTest = (
    key: RegelKey,
    grunnlag: Regelgrunnlag
): RegelTestresultat => {
    const { forbruk, tilgjengeligeDager, navnFarMedmor } = grunnlag;
    if (forbruk === undefined || tilgjengeligeDager === undefined || forbruk.farMedmor === undefined) {
        return {
            key,
            passerer: true
        };
    }

    const { maksDagerFar } = tilgjengeligeDager;
    const dagerGjenstående = maksDagerFar - forbruk.farMedmor.dagerTotalt;
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
                          navn: navnFarMedmor,
                          dagerTilgjengelig: (intl: InjectedIntl) => getVarighetString(maksDagerFar, intl),
                          dagerRegistrert: (intl: InjectedIntl) =>
                              getVarighetString(Math.abs(forbruk.farMedmor!.dagerTotalt), intl)
                      }
                  }
              }
    };
};

export const farMedmorsUttakErInnenforMaksAntallDagerRegel: Regel = {
    key: RegelKey.farMedmorsUttakErInnenforMaksAntallDager,
    test: farMedmorsUttakErInnenforMaksAntallDager,
    erRelevant: ({ erAleneomsorg, aleneomsorgForelder }) =>
        (erAleneomsorg && aleneomsorgForelder === Forelder.farMedmor) || erAleneomsorg === false
};
