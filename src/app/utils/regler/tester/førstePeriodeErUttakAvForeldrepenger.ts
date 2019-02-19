import { RegelTestresultat, Regelgrunnlag, RegelTest, Regel, RegelAlvorlighet } from '../types';
import { RegelKey } from '../regelKeys';
import { InjectedIntl } from 'react-intl';
import { Periodetype } from '../../../types';

const førstePeriodeErUttakAvForeldrepenger: RegelTest = (key: RegelKey, grunnlag: Regelgrunnlag): RegelTestresultat => {
    const { perioder } = grunnlag;

    let passerer = true;
    const periode = perioder.length > 0 ? perioder[0] : undefined;
    if (periode && periode.type !== Periodetype.Uttak) {
        passerer = false;
    }
    return {
        key,
        passerer,
        regelbrudd:
            passerer === false && periode !== undefined
                ? {
                      alvorlighet: RegelAlvorlighet.ULOVLIG,
                      key,
                      periodeId: periode ? periode.id : undefined,
                      feilmelding: {
                          intlKey: `regel.feiler.${key}`,
                          values: {
                              type: (intl: InjectedIntl) => intl.formatMessage({ id: `periodetype.${periode.type}` })
                          }
                      }
                  }
                : undefined
    };
};

export const førstePeriodeErUttakAvForeldrepengerRegel: Regel = {
    key: RegelKey.førstePeriodeErUttakAvForeldrepenger,
    test: førstePeriodeErUttakAvForeldrepenger
};
