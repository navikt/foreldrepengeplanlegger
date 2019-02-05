import * as React from 'react';
import { Formik, FormikProps } from 'formik';
import * as yup from 'yup';
import PeriodeskjemaForm from './PeriodeskjemaForm';
import { Periode, Periodetype } from '../../types/periodetyper';
import periodeskjemaUtils from './utils';
import { PeriodeskjemaFormValues } from './types';
import { OmForeldre } from '../../types';

interface Props {
    periode?: Periode;
    omForeldre: OmForeldre;
    nesteUttaksdag: Date;
    onSubmit: (periode: Periode) => void;
    onCancel: () => void;
}

const periodeValidationSchema = yup.object().shape({
    periodetype: yup.string().required('Du må velge periodetype'),
    forelder: yup.string().required('Du må velge hvem perioden gjelder'),
    fom: yup.date().required('Fradato må velges'),
    tom: yup.date().required('Tildato må velges'),
    gradering: yup
        .number()
        .when('periodetype', (periodetype: Periodetype, schema: yup.Schema<PeriodeskjemaFormValues>) => {
            if (periodetype === Periodetype.GradertUttak) {
                return schema.required('Gradering må velges');
            }
            return schema;
        })
});

class Periodeskjema extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
    }
    render() {
        const { periode, omForeldre, nesteUttaksdag, onSubmit, onCancel } = this.props;
        return (
            <Formik
                isInitialValid={false}
                initialValues={periodeskjemaUtils.getInitialFormValuesFromPeriode(periode, omForeldre)}
                onSubmit={(values: PeriodeskjemaFormValues) =>
                    onSubmit(periodeskjemaUtils.createPeriodeFromValues(values))
                }
                render={(props: FormikProps<PeriodeskjemaFormValues>) => (
                    <PeriodeskjemaForm
                        onCancel={onCancel}
                        formik={props}
                        omForeldre={omForeldre}
                        nesteUttaksdag={nesteUttaksdag}
                    />
                )}
                validationSchema={periodeValidationSchema}
            />
        );
    }
}
export default Periodeskjema;
