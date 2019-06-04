import moment from 'moment';
import { RegelTestresultat, Regelgrunnlag, RegelTest } from '../types';
import { Periode } from '../../../types';
import { formaterDatoUtenDag } from 'common/util/datoUtils';

export const starterUttakInnenfor12UkerFørTerminTest: RegelTest = (grunnlag: Regelgrunnlag): RegelTestresultat => {
    const { periodeFørTermin, perioder, uttaksdatoer } = grunnlag;
    const { førsteMuligeUttaksdag } = uttaksdatoer.førFødsel;

    const perioderForSjekk: Periode[] = [
        ...(perioder ? perioder : []),
        ...(periodeFørTermin && periodeFørTermin.skalIkkeHaUttakFørTermin !== true ? [periodeFørTermin] : [])
    ];

    const periode = perioderForSjekk.find(
        (p) => moment.utc(p.tidsperiode.fom).isSameOrAfter(førsteMuligeUttaksdag, 'day') === false
    );

    return {
        passerer: periode === undefined,
        info:
            periode === undefined
                ? undefined
                : {
                      periodeId: periode.id,
                      values: {
                          dato: formaterDatoUtenDag(førsteMuligeUttaksdag)
                      }
                  }
    };
};
