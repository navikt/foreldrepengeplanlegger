import moment from 'moment';
import { Situasjon, Forelder, OmForeldre } from '../types';
import { Avgrensninger } from 'nav-datovelger';
import { getSituasjonForelderSvg } from 'common/components/foreldrepar/foreldreparUtils';

export const getAntallForeldreISituasjon = (situasjon: Situasjon) => {
    switch (situasjon) {
        case Situasjon.aleneomsorg:
        case Situasjon.bareFar:
        case Situasjon.bareMor:
            return 1;
        default:
            return 2;
    }
};

export const getForelderNavn = (forelder: Forelder | undefined, omForeldre: OmForeldre): string | undefined => {
    if (forelder) {
        if (forelder === Forelder.mor) {
            return omForeldre.mor.navn;
        } else {
            return omForeldre.farMedmor ? omForeldre.farMedmor.navn : undefined;
        }
    }
    return undefined;
};

export const inputHasValue = (value: string | undefined) => {
    return value !== undefined && value !== '';
};

export const getTermindatoAvgrensninger = (): Avgrensninger => {
    return {
        minDato: moment()
            .subtract(6, 'months')
            .toDate(),
        maksDato: moment()
            .add(24, 'months')
            .toDate()
    };
};

export const getInformasjonOmForeldre = (situasjon: Situasjon, navnMor: string, navnFarMedmor?: string): OmForeldre => {
    const info = getSituasjonForelderSvg(situasjon);
    const antallForeldre = getAntallForeldreISituasjon(situasjon);
    return {
        antallForeldre,
        mor: {
            navn: navnMor,
            ikonRef: info.mor
        },
        farMedmor:
            antallForeldre === 2 && navnFarMedmor && info.farMedmor
                ? {
                      navn: navnFarMedmor,
                      ikonRef: info.farMedmor
                  }
                : undefined
    };
};
