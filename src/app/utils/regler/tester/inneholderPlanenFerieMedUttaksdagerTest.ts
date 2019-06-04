import { RegelTestresultat, Regelgrunnlag, RegelTest } from '../types';
import { Periodetype } from '../../../types';
import { InjectedIntl } from 'react-intl';
import { getVarighetString } from 'common/util/intlUtils';

export const inneholderPlanenFerieMedUttaksdagerTest: RegelTest = (grunnlag: Regelgrunnlag): RegelTestresultat => {
    const { perioder } = grunnlag;
    const dager = perioder
        .filter((p) => p.type === Periodetype.Ferie)
        .map((p) => (p.uttaksinfo ? p.uttaksinfo.antallUttaksdagerBrukt : 0))
        .reduce((d, nyeDager) => nyeDager + d, 0);

    const passerer = dager === 0;
    return {
        passerer,
        info: passerer
            ? undefined
            : {
                  values: {
                      dager: (intl: InjectedIntl) => getVarighetString(dager, intl)
                  }
              }
    };
};
