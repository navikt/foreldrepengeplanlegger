import moment from 'moment';
import { RegelTestresultat, RegelTest } from '../../../../shared/types/regelTypes';
import { Periode } from '../../../types';
import { formaterDatoUtenDag } from 'common/util/datoUtils';
import { Regelgrunnlag } from '../types';

export const erPlanenInnenforSisteMuligeUttaksdagTest: RegelTest = (grunnlag: Regelgrunnlag): RegelTestresultat => {
    const { periodeFørTermin, perioder, uttaksdatoer } = grunnlag;
    const { sisteMuligeUttaksdag } = uttaksdatoer.etterFødsel;

    const perioderForSjekk: Periode[] = [
        ...(perioder ? perioder : []),
        ...(periodeFørTermin && periodeFørTermin.skalIkkeHaUttakFørTermin !== true ? [periodeFørTermin] : [])
    ];

    const perioderUtenforGyldigTidsrom = perioderForSjekk.filter((periode) => {
        const { tom } = periode.tidsperiode;
        if (moment.utc(tom).isSameOrBefore(sisteMuligeUttaksdag, 'day') === false) {
            return true;
        }
        return false;
    });

    const passerer = perioderUtenforGyldigTidsrom.length === 0;

    return {
        passerer,
        info: passerer
            ? undefined
            : {
                  values: {
                      tom: formaterDatoUtenDag(sisteMuligeUttaksdag)
                  }
              }
    };
};
