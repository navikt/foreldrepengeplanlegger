import moment from 'moment';

import { RegelAlvorlighet, RegelTestresultat, Regelgrunnlag, RegelTest } from '../types';
import { Periode } from '../../../types';
import { RegelKey } from '../regelKeys';
import { formaterDatoUtenDag } from 'common/utils/datoUtils';

const starterInnenfor12UkerFørTermin: RegelTest = (key: RegelKey, grunnlag: Regelgrunnlag): RegelTestresultat => {
    const { periodeFørTermin, perioder, uttaksdatoer } = grunnlag;
    const { førsteMuligeUttaksdag } = uttaksdatoer.førFødsel;

    const perioderForSjekk: Periode[] = [
        ...(perioder ? perioder : []),
        ...(periodeFørTermin && periodeFørTermin.skalIkkeHaUttakFørTermin !== true ? [periodeFørTermin] : [])
    ];

    const periode = perioderForSjekk.find(
        (p) => moment(p.tidsperiode.fom).isSameOrAfter(førsteMuligeUttaksdag, 'day') === false
    );
    return {
        test: key,
        passerer: periode === undefined,
        regelbrudd:
            periode === undefined
                ? undefined
                : {
                      periodeId: periode.id,
                      alvorlighet: RegelAlvorlighet.ULOVLIG,
                      feilmelding: {
                          intlKey: 'regel.feiler.starterInnenfor12UkerFørTermin',
                          values: {
                              dato: formaterDatoUtenDag(førsteMuligeUttaksdag)
                          }
                      }
                  }
    };
};

export default starterInnenfor12UkerFørTermin;
