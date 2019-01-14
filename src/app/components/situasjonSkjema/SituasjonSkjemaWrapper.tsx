import * as React from 'react';
import { Formik, FormikProps } from 'formik';
import SituasjonSkjema, { IntroSkjemaVerdier } from './SituasjonSkjema';

interface Props {}

const initialValues: IntroSkjemaVerdier = {
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
                render={(props: FormikProps<IntroSkjemaVerdier>) => <SituasjonSkjema formik={props} />}
            />
        );
    }
}
export default SituasjonSkjemaWrapper;
