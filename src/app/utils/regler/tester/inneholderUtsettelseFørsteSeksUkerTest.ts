import { RegelTestresultat } from '../../../../shared/types/regelTypes';
import { Forelder, Periodetype, Periode } from '../../../types';
import moment from 'moment';
import { Regelgrunnlag } from '../types';

const erUtsettelse = (type: Periodetype): boolean =>
    type === Periodetype.Arbeid || type === Periodetype.GradertUttak || type === Periodetype.Ferie;

const getUtsettelserForForelderInnenforFørsteSeksUker = (
    perioder: Periode[],
    forelder: Forelder,
    sisteUttaksdagInnenforSeksUker: Date
): Periode[] => {
    return perioder.filter(
        (p) =>
            p.forelder === forelder &&
            erUtsettelse(p.type) &&
            moment.utc(p.tidsperiode.fom).isSameOrBefore(sisteUttaksdagInnenforSeksUker, 'day')
    );
};

const inneholderUtsettelseFørsteSeksUkerTest = (grunnlag: Regelgrunnlag, forelder: Forelder): RegelTestresultat => {
    const {
        perioder,
        uttaksdatoer: {
            etterFødsel: { sisteUttaksdagInnenforSeksUker }
        }
    } = grunnlag;

    const utsettelser = getUtsettelserForForelderInnenforFørsteSeksUker(
        perioder,
        forelder,
        sisteUttaksdagInnenforSeksUker
    );

    const passerer = utsettelser.length === 0;
    return {
        passerer,
        info: passerer
            ? undefined
            : {
                  values: { navn: forelder === Forelder.mor ? grunnlag.navnMor : grunnlag.navnFarMedmor }
              }
    };
};

export const harMorUtsettelseFørsteSeksUkerTest = (grunnlag: Regelgrunnlag): RegelTestresultat =>
    inneholderUtsettelseFørsteSeksUkerTest(grunnlag, Forelder.mor);

export const harFarMedmorUtsettelseFørsteSeksUkerTest = (grunnlag: Regelgrunnlag): RegelTestresultat =>
    inneholderUtsettelseFørsteSeksUkerTest(grunnlag, Forelder.farMedmor);
