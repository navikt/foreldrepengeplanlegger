import * as React from 'react';
import { Formik, FormikProps } from 'formik';
import { Periode } from '../../types';
import { guid } from 'nav-frontend-js-utils';
import Periodeskjema, { PeriodeFormValues } from './Periodeskjema';

interface Props {
    onSubmit: (periode: Periode) => void;
    onCancel: () => void;
}

const createPeriodeFromValues = (values: PeriodeFormValues): Periode => {
    return {
        id: guid(),
        type: values.type,
        tidsperiode: {
            fom: values.fom,
            tom: values.tom
        },
        forelder: values.forelder
    };
};

class PeriodeskjemaWrapper extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
    }
    render() {
        const { onSubmit, onCancel } = this.props;
        return (
            <Formik
                initialValues={{}}
                onSubmit={(values: PeriodeFormValues) => onSubmit(createPeriodeFromValues(values))}
                render={(props: FormikProps<PeriodeFormValues>) => <Periodeskjema onCancel={onCancel} formik={props} />}
            />
        );
    }
}
export default PeriodeskjemaWrapper;
