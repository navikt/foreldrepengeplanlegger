import moment from 'moment';
import { getSituasjonForelderSvg, getAntallForeldreISituasjon } from 'shared/components/foreldrepar/foreldreparUtils';
import { Avgrensninger, Forelder } from 'common/types';
import { ForeldreparSituasjon, OmForeldre } from 'shared/types';

export const getRolleVedIkkeDeltPlan = (
    situasjon: ForeldreparSituasjon,
    erMor: boolean | undefined
): Forelder | undefined => {
    switch (situasjon) {
        case ForeldreparSituasjon.bareMor:
            return Forelder.mor;
        case ForeldreparSituasjon.bareFar:
            return Forelder.farMedmor;
        case ForeldreparSituasjon.aleneomsorg:
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

export const getMedforelderNavn = (forelder: Forelder | undefined, omForeldre: OmForeldre): string => {
    switch (forelder) {
        case Forelder.mor:
            return omForeldre.farMedmor ? omForeldre.farMedmor.navn : 'medforelder';
        case Forelder.farMedmor:
            return omForeldre.mor.navn;
        default:
            return 'medforelder';
    }
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
        minDato: moment
            .utc()
            .subtract(6, 'months')
            .toDate(),
        maksDato: moment
            .utc()
            .add(24, 'months')
            .toDate()
    };
};

export const getGjelderBareFarHarRett = (situasjon: ForeldreparSituasjon): boolean => {
    return situasjon === ForeldreparSituasjon.bareFar;
};

export const getOmForeldre = (
    situasjon: ForeldreparSituasjon,
    navnMor: string,
    navnFarMedmor?: string,
    valgForelderVedAleneomsorg?: Forelder
): OmForeldre => {
    const info = getSituasjonForelderSvg(situasjon);
    const erDeltOmsorg = getAntallForeldreISituasjon(situasjon) === 2;
    const bareMor =
        situasjon === ForeldreparSituasjon.bareMor || (!erDeltOmsorg && valgForelderVedAleneomsorg === Forelder.mor);
    const bareFar =
        situasjon === ForeldreparSituasjon.bareFar ||
        (!erDeltOmsorg && valgForelderVedAleneomsorg === Forelder.farMedmor);
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
