import * as React from 'react';
import { Formik, FormikProps } from 'formik';
import SituasjonsskjemaForm from './SituasjonsskjemaForm';
import { SituasjonSkjemadata, Situasjon, Forelder } from '../../types';
import * as yup from 'yup';
import { getAntallForeldreISituasjon } from '../../utils/common';
import { InjectedIntlProps, injectIntl, InjectedIntl } from 'react-intl';
import getMessage from 'common/utils/i18nUtils';

interface OwnProps {
    skjemadata?: SituasjonSkjemadata;
    onSubmit: (data: SituasjonSkjemadata) => void;
    onReset?: () => void;
}

type Props = OwnProps & InjectedIntlProps;

const getSituasjonValidationSkjema = (intl: InjectedIntl) =>
    yup.object().shape({
        situasjon: yup.string().required(getMessage(intl, 'situasjonskjema.validering.situasjon')),
        navnMor: yup
            .string()
            .when(
                ['situasjon', 'forelderVedAleneomsorg'],
                (
                    situasjon: Situasjon,
                    forelderVedAleneomsorg: Forelder | undefined,
                    schema: yup.Schema<SituasjonSkjemadata>
                ) => {
                    if (getAntallForeldreISituasjon(situasjon) === 2) {
                        return schema.required(getMessage(intl, 'situasjonskjema.validering.foreldernavn'));
                    }
                    if (situasjon === Situasjon.bareMor) {
                        return schema.required(getMessage(intl, 'situasjonskjema.validering.foreldernavn'));
                    }
                    if (situasjon === Situasjon.aleneomsorg && forelderVedAleneomsorg === Forelder.mor) {
                        return schema.required(getMessage(intl, 'situasjonskjema.validering.foreldernavn'));
                    }
                    return schema;
                }
            ),
        navnFarMedmor: yup
            .string()
            .when(
                ['situasjon', 'forelderVedAleneomsorg'],
                (
                    situasjon: Situasjon,
                    forelderVedAleneomsorg: Forelder | undefined,
                    schema: yup.Schema<SituasjonSkjemadata>
                ) => {
                    if (getAntallForeldreISituasjon(situasjon) === 2) {
                        return schema.required(getMessage(intl, 'situasjonskjema.validering.foreldernavn'));
                    }
                    if (situasjon === Situasjon.bareFar) {
                        return schema.required(getMessage(intl, 'situasjonskjema.validering.foreldernavn'));
                    }
                    if (situasjon === Situasjon.aleneomsorg && forelderVedAleneomsorg === Forelder.farMedmor) {
                        return schema.required(getMessage(intl, 'situasjonskjema.validering.foreldernavn'));
                    }
                    return schema;
                }
            ),
        forelderVedAleneomsorg: yup
            .string()
            .when('situasjon', (situasjon: Situasjon, schema: yup.Schema<SituasjonSkjemadata>) => {
                if (situasjon === Situasjon.aleneomsorg) {
                    return schema.required(getMessage(intl, 'situasjonskjema.validering.forelderVedAleneomsorg'));
                }
                return schema;
            }),

        antallBarn: yup.number().required(getMessage(intl, 'situasjonskjema.validering.antallBarn')),
        familiehendelsesdato: yup.date().required(getMessage(intl, 'situasjonskjema.validering.termindato'))
    });

class Situasjonsskjema extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }
    handleOnSubmit(skjemadata: SituasjonSkjemadata) {
        this.props.onSubmit(skjemadata);
    }
    render() {
        const { skjemadata, onReset, intl } = this.props;
        const initialValues: Partial<SituasjonSkjemadata> = skjemadata || {};
        return (
            <>
                <Formik
                    isInitialValid={skjemadata !== undefined}
                    enableReinitialize={true}
                    initialValues={initialValues}
                    onSubmit={this.handleOnSubmit}
                    render={(props: FormikProps<SituasjonSkjemadata>) => (
                        <SituasjonsskjemaForm formik={props} onReset={onReset} />
                    )}
                    validationSchema={getSituasjonValidationSkjema(intl)}
                />
            </>
        );
    }
}
export default injectIntl(Situasjonsskjema);
