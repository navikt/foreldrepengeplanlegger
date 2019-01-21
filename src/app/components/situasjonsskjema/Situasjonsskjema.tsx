import * as React from 'react';
import { Formik, FormikProps } from 'formik';
import SituasjonsskjemaForm, { SituasjonsskjemaFormValues } from './SituasjonsskjemaForm';

const initialValues: SituasjonsskjemaFormValues = {
    situasjon: undefined
};

class Situasjonsskjema extends React.Component<{}, {}> {
    render() {
        return (
            <>
                <Formik
                    initialValues={initialValues}
                    onSubmit={() => null}
                    render={(props: FormikProps<SituasjonsskjemaFormValues>) => <SituasjonsskjemaForm formik={props} />}
                />
            </>
        );
    }
}
export default Situasjonsskjema;
