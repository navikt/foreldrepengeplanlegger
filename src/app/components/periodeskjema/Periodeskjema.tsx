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
    nyPeriode?: Partial<Periode>;
    omForeldre: OmForeldre;
    nesteUttaksdag: Date;
    førsteUttaksdagFørTermin: Date;
    førsteUttaksdag: Date;
    sisteUttaksdag: Date;
    nyPeriodeId: string;
    onSubmit: (periode: Periode) => void;
    onCancel: () => void;
    onChange: (periode?: Periode) => void;
}
export type PeriodeSkjemaProps = Props;

const periodeValidationSchema = yup.object().shape({
    periodetype: yup.string().required('Du må velge periodetype'),
    forelder: yup.string().required('Du må velge hvem perioden gjelder'),
    fom: yup.date().required('Fradato må velges'),
    tom: yup.date().required('Tildato må velges'),
    gradering: yup.number().when('periodetype', {
        is: Periodetype.GradertUttak,
        then: yup.string().required('Gradering må velges')
    })
});

class Periodeskjema extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
        this.handleFormValuesChange = this.handleFormValuesChange.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    onCancel() {
        this.props.onCancel();
        this.handleFormValuesChange();
    }

    handleFormValuesChange(values: Partial<PeriodeskjemaFormValues> = {}) {
        const { onChange, nyPeriodeId } = this.props;
        if (onChange) {
            const { fom, forelder, gradering, periodetype, tom } = values;
            if (fom && tom && forelder && periodetype) {
                onChange(
                    periodeskjemaUtils.createPeriodeFromValues(
                        {
                            fom,
                            tom,
                            forelder,
                            periodetype,
                            gradering
                        },
                        nyPeriodeId
                    )
                );
            } else {
                onChange();
            }
        }
    }
    render() {
        const {
            periode,
            nyPeriode,
            omForeldre,
            nesteUttaksdag,
            førsteUttaksdagFørTermin,
            førsteUttaksdag,
            sisteUttaksdag,
            nyPeriodeId,
            onSubmit
        } = this.props;
        return (
            <Formik
                isInitialValid={false}
                initialValues={periodeskjemaUtils.getInitialFormValuesFromPeriode(periode, omForeldre)}
                onSubmit={(values: PeriodeskjemaFormValues) =>
                    onSubmit(periodeskjemaUtils.createPeriodeFromValues(values, nyPeriodeId))
                }
                render={(props: FormikProps<PeriodeskjemaFormValues>) => (
                    <PeriodeskjemaForm
                        nyPeriode={nyPeriode}
                        onCancel={this.onCancel}
                        onChange={this.handleFormValuesChange}
                        formik={props}
                        omForeldre={omForeldre}
                        nesteUttaksdag={nesteUttaksdag}
                        førsteUttaksdagFørTermin={førsteUttaksdagFørTermin}
                        førsteUttaksdag={førsteUttaksdag}
                        sisteUttaksdag={sisteUttaksdag}
                    />
                )}
                validationSchema={periodeValidationSchema}
            />
        );
    }
}
export default Periodeskjema;
