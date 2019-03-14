import moment from 'moment';
import { RegelAlvorlighet, RegelTestresultat, Regelgrunnlag, RegelTest, Regel } from '../types';
import { RegelKey } from '../regelKeys';
import { Forelder, Situasjon } from '../../../types';

const uttakForFarEllerMedmorFørsteSeksUkerInfo: RegelTest = (
    key: RegelKey,
    grunnlag: Regelgrunnlag
): RegelTestresultat => {
    const { perioder, uttaksdatoer, navnFarMedmor, situasjon, navnMor } = grunnlag;
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
        passerer: periode === undefined || (situasjon === Situasjon.bareFar || situasjon === Situasjon.aleneomsorg),
        regelbrudd:
            periode === undefined
                ? undefined
                : {
                      periodeId: periode.id,
                      key,
                      alvorlighet: RegelAlvorlighet.VIKTIG,
                      feilmelding: {
                          intlKey: `regel.info.${key}`,
                          values: {
                              navnFarMedmor,
                              navnMor
                          }
                      }
                  }
    };
};

export const uttakForFarEllerMedmorFørsteSeksUkerInfoRegel: Regel = {
    key: RegelKey.uttakForFarEllerMedmorFørsteSeksUkerInfo,
    test: uttakForFarEllerMedmorFørsteSeksUkerInfo,
    erRelevant: (grunnlag: Regelgrunnlag) => grunnlag.situasjon !== Situasjon.farOgFar
};
