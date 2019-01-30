import moment from 'moment';
import { Situasjon, OmForeldre } from '../types';
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

export const getInformasjonOmForeldre = (
    situasjon: Situasjon,
    navnForelder1: string,
    navnForelder2: string
): OmForeldre => {
    const info = getSituasjonForelderSvg(situasjon);
    return {
        forelder1: {
            navn: navnForelder1,
            ikonRef: info.forelder1
        },
        forelder2:
            navnForelder2 && info.forelder2
                ? {
                      navn: navnForelder2,
                      ikonRef: info.forelder2
                  }
                : undefined
    };
};
