import { UtsettelsesårsakType, Periodetype, Periode } from '../../types';
import { guid } from 'nav-frontend-js-utils';
import { PeriodeskjemaFormValues } from './types';

const createPeriodeFromValues = (values: PeriodeskjemaFormValues): Periode => {
    switch (values.type) {
        case Periodetype.Utsettelse:
            return {
                type: Periodetype.Utsettelse,
                id: guid(),
                tidsperiode: {
                    fom: values.fom,
                    tom: values.tom
                },
                fixed: true,
                forelder: values.forelder,
                årsak: UtsettelsesårsakType.Ferie
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

const periodeskjemaUtils = {
    createPeriodeFromValues
};

export default periodeskjemaUtils;
