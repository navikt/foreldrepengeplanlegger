import moment from 'moment';

import { RegelAlvorlighet, RegelTestresultat, Regelgrunnlag, RegelTest } from '../types';
import { Periode } from '../../../types';
import { RegelKey } from '../regelKeys';
import { formaterDatoUtenDag } from 'common/utils/datoUtils';

const erInnenforFørsteOgSisteMuligeUttaksdag: RegelTest = (
    key: RegelKey,
    grunnlag: Regelgrunnlag
): RegelTestresultat => {
    const { periodeFørTermin, perioder, uttaksdatoer } = grunnlag;
    const { førsteMuligeUttaksdag } = uttaksdatoer.førFødsel;
    const { sisteMuligeUttaksdag } = uttaksdatoer.etterFødsel;

    const perioderForSjekk: Periode[] = [
        ...(perioder ? perioder : []),
        ...(periodeFørTermin && periodeFørTermin.skalIkkeHaUttakFørTermin !== true ? [periodeFørTermin] : [])
    ];

    const perioderUtenforGyldigTidsrom = perioderForSjekk.filter((periode) => {
        const { fom, tom } = periode.tidsperiode;
        if (
            moment(fom).isSameOrAfter(førsteMuligeUttaksdag, 'day') === false ||
            moment(tom).isSameOrBefore(sisteMuligeUttaksdag, 'day') === false
        ) {
            return true;
        }
        return false;
    });

    const passerer = perioderUtenforGyldigTidsrom.length === 0;

    return {
        test: key,
        passerer,
        regelbrudd: passerer
            ? undefined
            : {
                  //   periodeId: periode.id,
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

export default erInnenforFørsteOgSisteMuligeUttaksdag;
