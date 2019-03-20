import { RegelTestresultat, Regelgrunnlag, RegelAvvikIntlInfo } from '../types';
import { Forelder, Periodetype, Periode } from '../../../types';
import moment from 'moment';

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
            moment(p.tidsperiode.fom).isSameOrBefore(sisteUttaksdagInnenforSeksUker, 'day')
    );
};

export const inneholderUtsettelseFørsteSeksUkerTest = (grunnlag: Regelgrunnlag): RegelTestresultat => {
    const {
        perioder,
        uttaksdatoer: {
            etterFødsel: { sisteUttaksdagInnenforSeksUker }
        }
    } = grunnlag;

    const utsettelserMor = getUtsettelserForForelderInnenforFørsteSeksUker(
        perioder,
        Forelder.mor,
        sisteUttaksdagInnenforSeksUker
    );

    const utsettelserFarMedmor = getUtsettelserForForelderInnenforFørsteSeksUker(
        perioder,
        Forelder.farMedmor,
        sisteUttaksdagInnenforSeksUker
    );

    const info: RegelAvvikIntlInfo[] = [];
    if (utsettelserMor.length > 0) {
        info.push({
            values: { navn: grunnlag.navnMor }
        });
    }
    if (utsettelserFarMedmor.length > 0) {
        info.push({
            values: { navn: grunnlag.navnFarMedmor }
        });
    }

    return {
        passerer: info.length === 0,
        info
    };
};
