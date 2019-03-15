import { RegelAlvorlighet, RegelTestresultat, Regelgrunnlag, Regel } from '../types';
import { RegelKey } from '../regelKeys';
import { Forelder, Periodetype } from '../../../types';
import moment from 'moment';

const erUtsettelse = (type: Periodetype): boolean =>
    type === Periodetype.Arbeid || type === Periodetype.GradertUttak || type === Periodetype.Ferie;

const utsettelseFørsteSeksUker = (forelder: Forelder, regel: Regel, grunnlag: Regelgrunnlag): RegelTestresultat => {
    const { perioder } = grunnlag;
    const { key } = regel;

    const utsettelser = perioder.filter(
        (p) =>
            p.forelder === forelder &&
            erUtsettelse(p.type) &&
            moment(p.tidsperiode.fom).isSameOrBefore(
                grunnlag.uttaksdatoer.etterFødsel.sisteUttaksdagInnenforSeksUker,
                'day'
            )
    );

    if (utsettelser.length > 0) {
        const navn = forelder === Forelder.mor ? grunnlag.navnMor : grunnlag.navnFarMedmor;
        return {
            key,
            passerer: false,
            regelbrudd: {
                key,
                alvorlighet: RegelAlvorlighet.ULOVLIG,
                feilmelding: {
                    intlKey: `regel.feiler.${key}`,
                    values: {
                        navn
                    }
                }
            }
        };
    }
    return {
        key,
        passerer: true
    };
};

export const morUsetterFørsteSeksUkerRegel: Regel = {
    key: RegelKey.usetterFørsteSeksUker,
    test: (regel: Regel, grunnlag: Regelgrunnlag) => utsettelseFørsteSeksUker(Forelder.mor, regel, grunnlag)
};

export const farMedmormorUsetterFørsteSeksUkerRegel: Regel = {
    key: RegelKey.usetterFørsteSeksUker,
    test: (regel: Regel, grunnlag: Regelgrunnlag) => utsettelseFørsteSeksUker(Forelder.farMedmor, regel, grunnlag)
};
