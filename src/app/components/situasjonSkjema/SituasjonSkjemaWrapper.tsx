import * as React from 'react';
import { Formik, FormikProps } from 'formik';
import SituasjonSkjema, { SituasjonSkjemaVerdier } from './SituasjonSkjema';

interface Props {}

const initialValues: SituasjonSkjemaVerdier = {
    situasjon: undefined
};

class SituasjonSkjemaWrapper extends React.Component<Props, {}> {
    render() {
        return (
            <Formik
                initialValues={initialValues}
                onSubmit={(values) => {
                    console.log(values);
                }}
                render={(props: FormikProps<SituasjonSkjemaVerdier>) => <SituasjonSkjema formik={props} />}
            />
        );
    }
}
export default SituasjonSkjemaWrapper;
