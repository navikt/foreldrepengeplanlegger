import moment from 'moment';

import { RegelAlvorlighet, RegelTestresultat, Regelgrunnlag, RegelTest, Regel } from '../types';
import { Periode } from '../../../types';
import { RegelKey } from '../regelKeys';
import { formaterDatoUtenDag } from 'common/utils/datoUtils';

const erInnenforSisteMuligeUttaksdag: RegelTest = (regel: Regel, grunnlag: Regelgrunnlag): RegelTestresultat => {
    const { key } = regel;
    const { periodeFørTermin, perioder, uttaksdatoer } = grunnlag;
    const { sisteMuligeUttaksdag } = uttaksdatoer.etterFødsel;

    const perioderForSjekk: Periode[] = [
        ...(perioder ? perioder : []),
        ...(periodeFørTermin && periodeFørTermin.skalIkkeHaUttakFørTermin !== true ? [periodeFørTermin] : [])
    ];

    const perioderUtenforGyldigTidsrom = perioderForSjekk.filter((periode) => {
        const { tom } = periode.tidsperiode;
        if (moment(tom).isSameOrBefore(sisteMuligeUttaksdag, 'day') === false) {
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
                          tom: formaterDatoUtenDag(sisteMuligeUttaksdag)
                      }
                  }
              }
    };
};

export const erInnenforSisteMuligeUttaksdagRegel: Regel = {
    key: RegelKey.erInnenforSisteMuligeUttaksdag,
    test: erInnenforSisteMuligeUttaksdag
};
