import * as React from 'react';
import { Formik, FormikProps } from 'formik';
import { Periode, Forelder, Periodetype } from '../../types';
import { guid } from 'nav-frontend-js-utils';
import Periodeskjema, { PeriodeFormValues } from './Periodeskjema';

interface Props {
    onSubmit: (periode: Periode) => void;
    onCancel: () => void;
}

const createPeriodeFromValues = (values: PeriodeFormValues): Periode => {
    return {
        type: Periodetype.UTTAK,
        id: guid(),
        fom: new Date(),
        tom: new Date(),
        forelder: Forelder.forelder1
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
                onSubmit={(values) => onSubmit(createPeriodeFromValues(values))}
                render={(props: FormikProps<PeriodeFormValues>) => <Periodeskjema onCancel={onCancel} formik={props} />}
            />
        );
    }
}
export default PeriodeskjemaWrapper;
