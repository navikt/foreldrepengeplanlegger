import * as React from 'react';
import { Formik, FormikProps } from 'formik';
import SituasjonsskjemaForm from './SituasjonsskjemaForm';
import { SituasjonSkjemadata } from '../../types';
import * as yup from 'yup';

interface Props {
    skjemadata?: SituasjonSkjemadata;
    onSubmit: (data: SituasjonSkjemadata) => void;
}

const situasjonValidationSkjema = yup.object().shape({
    situasjon: yup.string().required('Du må velge situasjon'),
    navnFar: yup.string(),
    navnMor: yup.string(),
    navnMedfar: yup.string(),
    navnMedmor: yup.string(),
    antallBarn: yup.number().required('Antall barn er påkrevd!'),
    familiehendelsesdato: yup.date().required('familiehendelsesdato er påkrevd!')
});

class Situasjonsskjema extends React.Component<Props> {
    render() {
        const { onSubmit, skjemadata } = this.props;
        const initialValues: Partial<SituasjonSkjemadata> = skjemadata || {};
        return (
            <>
                <Formik
                    isInitialValid={skjemadata !== undefined}
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    render={(props: FormikProps<SituasjonSkjemadata>) => <SituasjonsskjemaForm formik={props} />}
                    validationSchema={situasjonValidationSkjema}
                />
            </>
        );
    }
}
export default Situasjonsskjema;
