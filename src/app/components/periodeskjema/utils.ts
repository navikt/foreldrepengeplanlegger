import { Periodetype, Periode, OmForeldre, Forelder } from '../../types';
import { guid } from 'nav-frontend-js-utils';
import { PeriodeskjemaFormValues } from './types';

const createPeriodeFromValues = (values: PeriodeskjemaFormValues): Periode => {
    switch (values.type) {
        case Periodetype.Ferie:
            return {
                type: Periodetype.Ferie,
                id: guid(),
                tidsperiode: {
                    fom: values.fom,
                    tom: values.tom
                },
                forelder: values.forelder
            };
        case Periodetype.Arbeid:
            return {
                type: Periodetype.Arbeid,
                id: guid(),
                tidsperiode: {
                    fom: values.fom,
                    tom: values.tom
                },
                forelder: values.forelder
            };
        case Periodetype.Uttak:
            return {
                type: Periodetype.Uttak,
                id: guid(),
                tidsperiode: {
                    fom: values.fom,
                    tom: values.tom
                },
                forelder: values.forelder
            };
        case Periodetype.GradertUttak:
            return {
                type: Periodetype.GradertUttak,
                id: guid(),
                tidsperiode: {
                    fom: values.fom,
                    tom: values.tom
                },
                forelder: values.forelder
            };
        case Periodetype.UbetaltPermisjon:
            return {
                type: Periodetype.UbetaltPermisjon,
                id: guid(),
                tidsperiode: {
                    fom: values.fom,
                    tom: values.tom
                },
                forelder: values.forelder
            };
    }
};

const getInitialFormValuesFromPeriode = (
    periode: Periode | undefined,
    omForeldre: OmForeldre
): PeriodeskjemaFormValues | {} => {
    if (!periode) {
        return {
            forelder: omForeldre.antallForeldre === 1 ? Forelder.forelder1 : undefined
        };
    }
    return {
        fom: periode.tidsperiode.fom,
        tom: periode.tidsperiode.tom,
        forelder: periode.forelder,
        gradering: periode.gradering,
        type: periode.type
    };
};

const periodeskjemaUtils = {
    createPeriodeFromValues,
    getInitialFormValuesFromPeriode
};

export default periodeskjemaUtils;
