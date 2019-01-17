import { Periodetype, Periode } from '../../types';
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
                fixed: true,
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
                fixed: true,
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
                fixed: false,
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
                fixed: true,
                forelder: values.forelder
            };
    }
};

const getInitialFormValuesFromPeriode = (periode: Periode | undefined): PeriodeskjemaFormValues | {} => {
    if (!periode) {
        return {};
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
