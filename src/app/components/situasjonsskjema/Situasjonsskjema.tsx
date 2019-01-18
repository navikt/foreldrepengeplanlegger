import * as React from 'react';
import { Formik, FormikProps } from 'formik';
import SituasjonsskjemaForm, { SituasjonsskjemaFormValues } from './SituasjonsskjemaForm';

interface Props {}

const initialValues: SituasjonsskjemaFormValues = {
    situasjon: undefined
};

class Situasjonsskjema extends React.Component<Props, {}> {
    render() {
        return (
            <Formik
                initialValues={initialValues}
                onSubmit={(values) => {
                    console.log(values);
                }}
                render={(props: FormikProps<SituasjonsskjemaFormValues>) => <SituasjonsskjemaForm formik={props} />}
            />
        );
    }
}
export default Situasjonsskjema;
