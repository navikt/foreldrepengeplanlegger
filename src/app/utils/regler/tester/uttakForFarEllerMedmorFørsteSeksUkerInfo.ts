import moment from 'moment';
import { RegelAlvorlighet, RegelTestresultat, Regelgrunnlag, RegelTest, Regel } from '../types';
import { RegelKey } from '../regelKeys';
import { Forelder } from '../../../types';

const uttakForFarEllerMedmorFørsteSeksUkerInfo: RegelTest = (
    key: RegelKey,
    grunnlag: Regelgrunnlag
): RegelTestresultat => {
    const { perioder, uttaksdatoer, navnFarMedmor } = grunnlag;
    const { førsteUttaksdagEtterSeksUker } = uttaksdatoer.etterFødsel;

    const periode = perioder
        .filter(
            (p) =>
                p.forelder === Forelder.farMedmor &&
                moment(p.tidsperiode.fom).isBefore(moment(førsteUttaksdagEtterSeksUker), 'day')
        )
        .shift();

    return {
        key,
        passerer: periode === undefined,
        regelbrudd:
            periode === undefined
                ? undefined
                : {
                      periodeId: periode.id,
                      key,
                      alvorlighet: RegelAlvorlighet.ULOVLIG,
                      feilmelding: {
                          intlKey: `regel.info.${key}`,
                          values: {
                              navnFarMedmor
                          }
                      }
                  }
    };
};

export const uttakForFarEllerMedmorFørsteSeksUkerInfoRegel: Regel = {
    key: RegelKey.uttakForFarEllerMedmorFørsteSeksUkerInfo,
    test: uttakForFarEllerMedmorFørsteSeksUkerInfo
};
