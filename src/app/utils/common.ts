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

export const getRolleVedIkkeDeltPlan = (situasjon: Situasjon, erMor: boolean | undefined): Forelder | undefined => {
    switch (situasjon) {
        case Situasjon.bareMor:
            return Forelder.mor;
        case Situasjon.bareFar:
            return Forelder.farMedmor;
        case Situasjon.aleneomsorg:
            return erMor === true ? Forelder.mor : Forelder.farMedmor;
    }
    return undefined;
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

export const getOmForeldre = (
    situasjon: Situasjon,
    navnMor: string,
    navnFarMedmor?: string,
    aleneomsorgForelder?: Forelder
): OmForeldre => {
    const info = getSituasjonForelderSvg(situasjon);
    const antallForeldre = getAntallForeldreISituasjon(situasjon);
    const erAleneomsorgMor = antallForeldre === 1 && aleneomsorgForelder === Forelder.mor;
    const erAleneomsorgFarMedmor = antallForeldre === 1 && aleneomsorgForelder === Forelder.farMedmor;
    return {
        antallForeldre,
        mor: {
            navn: navnMor,
            ikonRef: info.mor
        },
        farMedmor:
            erAleneomsorgMor === false && navnFarMedmor && info.farMedmor
                ? {
                      navn: navnFarMedmor,
                      ikonRef: info.farMedmor
                  }
                : undefined,
        aleneomsorgForelder,
        erAleneomsorgMor,
        erAleneomsorgFarMedmor
    };
};

export const dagerTilUker = (dager: number): number => dager / 5;
