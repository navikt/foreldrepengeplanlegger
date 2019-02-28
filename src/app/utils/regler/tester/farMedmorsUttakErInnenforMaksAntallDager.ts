import { RegelTestresultat, Regelgrunnlag, RegelTest, Regel, RegelAlvorlighet } from '../types';
import { RegelKey } from '../regelKeys';
import { InjectedIntl } from 'react-intl';
import { getVarighetString } from 'common/utils/intlUtils';

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

    const { maksDagerTilgjengeligFar } = tilgjengeligeDager;
    const dagerGjenstående = maksDagerTilgjengeligFar - forbruk.farMedmor.brukteUttaksdager;
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
                          dagerTilgjengelig: (intl: InjectedIntl) => getVarighetString(maksDagerTilgjengeligFar, intl),
                          dagerRegistrert: (intl: InjectedIntl) =>
                              getVarighetString(Math.abs(forbruk.farMedmor!.brukteUttaksdager), intl)
                      }
                  }
              }
    };
};

export const farMedmorsUttakErInnenforMaksAntallDagerRegel: Regel = {
    key: RegelKey.farMedmorsUttakErInnenforMaksAntallDager,
    test: farMedmorsUttakErInnenforMaksAntallDager,
    erRelevant: ({ erAleneomsorg, erMor }) => ((erAleneomsorg && erMor === true) || erMor === false ? false : true)
};
