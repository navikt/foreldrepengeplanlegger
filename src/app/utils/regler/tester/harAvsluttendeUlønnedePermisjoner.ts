import { RegelTestresultat, Regelgrunnlag, RegelTest } from '../types';

import { Periodene } from '../../Periodene';
import { formaterDato } from 'common/utils/datoUtils';

export const harAvsluttendeUlønnedePermisjoner: RegelTest = (grunnlag: Regelgrunnlag): RegelTestresultat => {
    const antall = Periodene(grunnlag.perioder).getAvsluttendeUlønnedePermisjoner().length;
    const sistePeriode = Periodene(grunnlag.perioder).getSistePeriodeMedUttak();
    const passerer = antall === 0;
    return {
        passerer,
        info: sistePeriode
            ? {
                  values: {
                      sisteDag: formaterDato(sistePeriode.tidsperiode.tom)
                  }
              }
            : undefined
    };
};
