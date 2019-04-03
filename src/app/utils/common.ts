import moment from 'moment';
import { Situasjon, Forelder, OmForeldre } from '../types';
import { getSituasjonForelderSvg } from 'common/components/foreldrepar/foreldreparUtils';
import { Avgrensninger } from 'common/types';

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

const navnSlutterPåSLyd = (navn: string): boolean => {
    const sisteBokstav = navn.charAt(navn.length - 1).toLowerCase();
    return sisteBokstav === 's' || sisteBokstav === 'x' || sisteBokstav === 'z';
};

export const getNavnGenitivEierform = (navn: string): string | undefined => {
    if (navnSlutterPåSLyd(navn)) {
        return `${navn}'`;
    }
    return `${navn}s`;
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
    valgForelderVedAleneomsorg?: Forelder
): OmForeldre => {
    const info = getSituasjonForelderSvg(situasjon);
    const erDeltOmsorg = getAntallForeldreISituasjon(situasjon) === 2;
    const bareMor = situasjon === Situasjon.bareMor || (!erDeltOmsorg && valgForelderVedAleneomsorg === Forelder.mor);
    const bareFar =
        situasjon === Situasjon.bareFar || (!erDeltOmsorg && valgForelderVedAleneomsorg === Forelder.farMedmor);
    return {
        mor: {
            navn: navnMor,
            ikonRef: info.mor
        },
        farMedmor:
            bareMor === false && navnFarMedmor && info.farMedmor
                ? {
                      navn: navnFarMedmor,
                      ikonRef: info.farMedmor
                  }
                : undefined,
        erDeltOmsorg,
        bareMor,
        bareFar,
        forelderVedAleneomsorg: erDeltOmsorg ? undefined : bareMor ? Forelder.mor : Forelder.farMedmor
    };
};

export const dagerTilUker = (dager: number): number => dager / 5;
