import { RegelTestresultat, Regelgrunnlag, RegelTest } from '../../../../shared/regler/types';

import { Periodene } from '../../Periodene';
import { formaterDato } from 'common/util/datoUtils';

export const harAvsluttendeUlønnedePermisjoner: RegelTest = (grunnlag: Regelgrunnlag): RegelTestresultat => {
    const antall = Periodene(grunnlag.perioder).getAvsluttendeUlønnedePermisjoner().length;
    const sistePeriode = Periodene(grunnlag.perioder).getSistePeriodeMedUttak();
    const passerer = antall === 0;
    return {
        passerer,
        info: sistePeriode
            ? {
                  values: {
                      antallForeldre: grunnlag.erDeltOmsorg ? 2 : 1,
                      sisteDag: formaterDato(sistePeriode.tidsperiode.tom)
                  }
              }
            : undefined
    };
};
