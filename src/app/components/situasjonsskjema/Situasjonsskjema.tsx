import * as React from 'react';
import { Formik, FormikProps } from 'formik';
import SituasjonsskjemaForm from './SituasjonsskjemaForm';
import { SituasjonSkjemadata, Situasjon } from '../../types';
import * as yup from 'yup';
import { getAntallForeldreISituasjon } from '../../utils/common';

interface Props {
    skjemadata?: SituasjonSkjemadata;
    onSubmit: (data: SituasjonSkjemadata) => void;
    onReset?: () => void;
}

const situasjonValidationSkjema = yup.object().shape({
    situasjon: yup.string().required('Du må velge situasjon'),
    navnMor: yup
        .string()
        .when(
            ['situasjon', 'erMor'],
            (situasjon: Situasjon, erMor: string | undefined, schema: yup.Schema<SituasjonSkjemadata>) => {
                if (getAntallForeldreISituasjon(situasjon) === 2) {
                    return schema.required('Navn på foreldre er påkrevd');
                }
                if (situasjon === Situasjon.bareMor) {
                    return schema.required('Navn på foreldre er påkrevd');
                }
                if (situasjon === Situasjon.aleneomsorg && erMor === 'true') {
                    return schema.required('Navn på foreldre er påkrevd');
                }
                return schema;
            }
        ),
    navnFarMedmor: yup
        .string()
        .when(
            ['situasjon', 'erMor'],
            (situasjon: Situasjon, erMor: string | undefined, schema: yup.Schema<SituasjonSkjemadata>) => {
                if (getAntallForeldreISituasjon(situasjon) === 2) {
                    return schema.required('Navn på foreldre er påkrevd');
                }
                if (situasjon === Situasjon.bareFar) {
                    return schema.required('Navn på foreldre er påkrevd');
                }
                if (situasjon === Situasjon.aleneomsorg && erMor !== 'true') {
                    return schema.required('Navn på foreldre er påkrevd');
                }
                return schema;
            }
        ),
    erMor: yup.string().when('situasjon', (situasjon: Situasjon, schema: yup.Schema<SituasjonSkjemadata>) => {
        if (situasjon === Situasjon.aleneomsorg) {
            return schema.required('Du må velge om du er mor, far eller medmor');
        }
        return schema;
    }),

    antallBarn: yup.number().required('Antall barn er påkrevd!'),
    familiehendelsesdato: yup.date().required('familiehendelsesdato er påkrevd!')
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
        const { skjemadata, onReset } = this.props;
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
                    validationSchema={situasjonValidationSkjema}
                />
            </>
        );
    }
}
export default Situasjonsskjema;
