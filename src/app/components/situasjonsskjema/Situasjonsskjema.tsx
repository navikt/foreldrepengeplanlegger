import * as React from 'react';
import { Formik, FormikProps } from 'formik';
import SituasjonsskjemaForm from './SituasjonsskjemaForm';
import { SituasjonSkjemadata, Situasjon } from '../../types';
import * as yup from 'yup';
import { getAntallForeldreISituasjon } from '../../utils/common';

interface Props {
    skjemadata?: SituasjonSkjemadata;
    onSubmit: (data: SituasjonSkjemadata) => void;
}

const situasjonValidationSkjema = yup.object().shape({
    situasjon: yup.string().required('Du må velge situasjon'),
    navnForelder1: yup
        .string()
        .min(1, 'Må være minst ett tegn')
        .required('Navn på foreldre er påkrevd'),
    navnForelder2: yup.string().when('situasjon', (situasjon: Situasjon, schema: yup.Schema<SituasjonSkjemadata>) => {
        if (getAntallForeldreISituasjon(situasjon) === 2) {
            return schema.required('Forelder 2 må være fylt ut');
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
        const antallForeldre = getAntallForeldreISituasjon(skjemadata.situasjon);
        const data: SituasjonSkjemadata = {
            ...skjemadata,
            navnForelder2: antallForeldre === 2 ? skjemadata.navnForelder2 : undefined
        };
        this.props.onSubmit(data);
    }
    render() {
        const { skjemadata } = this.props;
        const initialValues: Partial<SituasjonSkjemadata> = skjemadata || {};
        return (
            <>
                <Formik
                    isInitialValid={skjemadata !== undefined}
                    initialValues={initialValues}
                    onSubmit={this.handleOnSubmit}
                    render={(props: FormikProps<SituasjonSkjemadata>) => <SituasjonsskjemaForm formik={props} />}
                    validationSchema={situasjonValidationSkjema}
                />
            </>
        );
    }
}
export default Situasjonsskjema;
