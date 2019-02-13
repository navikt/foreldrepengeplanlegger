import moment from 'moment';

import { RegelAlvorlighet, RegelTestresultat, Regelgrunnlag, RegelTest, Regel } from '../types';
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
                          fom: formaterDatoUtenDag(førsteMuligeUttaksdag),
                          tom: formaterDatoUtenDag(sisteMuligeUttaksdag)
                      }
                  }
              }
    };
};

export const erInnenforFørsteOgSisteMuligeUttaksdagRegel: Regel = {
    key: RegelKey.erInnenforFørsteOgSisteMuligeUttaksdag,
    test: erInnenforFørsteOgSisteMuligeUttaksdag
};
