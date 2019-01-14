import * as React from 'react';
import { Formik, FormikProps } from 'formik';
import { guid } from 'nav-frontend-js-utils';
import Periodeskjema, { PeriodeFormValues } from './Periodeskjema';
import { Periode, Periodetype, UtsettelsesårsakType } from '../../types/periodetyper';

interface Props {
    onSubmit: (periode: Periode) => void;
    onCancel: () => void;
}

const createPeriodeFromValues = (values: PeriodeFormValues): Periode => {
    console.log(values);
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

class PeriodeskjemaWrapper extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
    }
    render() {
        const { onSubmit, onCancel } = this.props;
        return (
            <Formik
                initialValues={{}}
                onSubmit={(values: PeriodeFormValues) => onSubmit(createPeriodeFromValues(values))}
                render={(props: FormikProps<PeriodeFormValues>) => <Periodeskjema onCancel={onCancel} formik={props} />}
            />
        );
    }
}
export default PeriodeskjemaWrapper;
