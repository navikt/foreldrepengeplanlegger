import * as React from 'react';
import { Formik, FormikProps } from 'formik';
import * as yup from 'yup';
import PeriodeskjemaForm from './PeriodeskjemaForm';
import { Periode, Periodetype } from '../../types/periodetyper';
import periodeskjemaUtils from './utils';
import { PeriodeskjemaFormValues } from './types';
import { OmForeldre, Forbruk } from '../../types';
import { injectIntl, InjectedIntlProps, InjectedIntl } from 'react-intl';
import getMessage from 'common/utils/i18nUtils';

interface OwnProps {
    periode?: Periode;
    nyPeriode?: Partial<Periode>;
    omForeldre: OmForeldre;
    nesteUttaksdag: Date;
    førsteUttaksdagFørTermin: Date;
    førsteUttaksdag: Date;
    sisteUttaksdag: Date;
    nyPeriodeId: string;
    perioder: Periode[];
    periodeFørTermin?: Periode;
    forbruk: Forbruk;
    onSubmit: (periode: Periode) => void;
    onCancel: () => void;
    onChange: (periode?: Periode) => void;
}
export type PeriodeSkjemaProps = Props;

const getPeriodeValidationSchema = (intl: InjectedIntl) => {
    return yup.object().shape({
        periodetype: yup.string().required(getMessage(intl, 'periodeskjema.validering.periodetype')),
        forelder: yup.string().required(getMessage(intl, 'periodeskjema.validering.forelder')),
        fom: yup.date().required(getMessage(intl, 'periodeskjema.validering.fom')),
        tom: yup.date().required(getMessage(intl, 'periodeskjema.validering.tom')),
        gradering: yup.number().when('periodetype', {
            is: Periodetype.GradertUttak,
            then: yup.string().required(getMessage(intl, 'periodeskjema.validering.arbeidOgUttak'))
        })
    });
};

type Props = OwnProps & InjectedIntlProps;

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
            const { fom, forelder, gradering, periodetype, tom, medforelder } = values;
            if (fom && tom && forelder && periodetype) {
                onChange(
                    periodeskjemaUtils.createPeriodeFromValues(
                        {
                            fom,
                            tom,
                            forelder,
                            medforelder,
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
            perioder,
            periodeFørTermin,
            forbruk,
            onSubmit,
            intl
        } = this.props;
        return (
            <>
                <Formik
                    isInitialValid={false}
                    initialValues={periodeskjemaUtils.getInitialFormValuesFromPeriode(periode, omForeldre)}
                    validationSchema={getPeriodeValidationSchema(intl)}
                    onSubmit={(values: PeriodeskjemaFormValues) =>
                        onSubmit(periodeskjemaUtils.createPeriodeFromValues(values, nyPeriodeId))
                    }
                    render={(props: FormikProps<PeriodeskjemaFormValues>) => (
                        <PeriodeskjemaForm
                            perioder={perioder}
                            periodeFørTermin={periodeFørTermin}
                            nyPeriode={nyPeriode}
                            onCancel={this.onCancel}
                            onChange={this.handleFormValuesChange}
                            forbrukEksisterendePerioder={forbruk}
                            formik={props}
                            omForeldre={omForeldre}
                            nesteUttaksdag={nesteUttaksdag}
                            førsteUttaksdagFørTermin={førsteUttaksdagFørTermin}
                            førsteUttaksdag={førsteUttaksdag}
                            sisteUttaksdag={sisteUttaksdag}
                        />
                    )}
                />
            </>
        );
    }
}
export default injectIntl(Periodeskjema);
