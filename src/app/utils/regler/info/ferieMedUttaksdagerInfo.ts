import { RegelAlvorlighet, RegelTestresultat, Regelgrunnlag, RegelTest, Regel } from '../types';
import { RegelKey } from '../regelKeys';
import { Periodetype } from '../../../types';
import { InjectedIntl } from 'react-intl';
import { getVarighetString } from 'common/utils/intlUtils';

const ferieMedUttaksdagerInfo: RegelTest = (regel: Regel, grunnlag: Regelgrunnlag): RegelTestresultat => {
    const { perioder } = grunnlag;
    const { key } = regel;
    const dager = perioder
        .filter((p) => p.type === Periodetype.Ferie)
        .map((p) => (p.uttaksinfo ? p.uttaksinfo.antallUttaksdagerBrukt : 0))
        .reduce((d, nyeDager) => nyeDager + d, 0);

    return {
        key,
        passerer: dager === 0,
        regelbrudd:
            (dager === 0) === undefined
                ? undefined
                : {
                      key,
                      alvorlighet: RegelAlvorlighet.INFO,
                      feilmelding: {
                          intlKey: `regel.info.${key}`,
                          values: {
                              dager: (intl: InjectedIntl) => getVarighetString(dager, intl)
                          }
                      }
                  }
    };
};

export const ferieMedUttaksdagerInfoRegel: Regel = {
    key: RegelKey.ferieMedUttaksdagerInfo,
    test: ferieMedUttaksdagerInfo
};
