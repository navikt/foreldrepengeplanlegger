import * as React from 'react';
import { Formik, FormikProps } from 'formik';
import PeriodeskjemaForm from './PeriodeskjemaForm';
import { Periode } from '../../types/periodetyper';
import periodeskjemaUtils from './utils';
import { PeriodeskjemaFormValues } from './types';

interface Props {
    periode?: Periode;
    onSubmit: (periode: Periode) => void;
    onCancel: () => void;
}

class Periodeskjema extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
    }
    render() {
        const { periode, onSubmit, onCancel } = this.props;
        return (
            <Formik
                isInitialValid={true}
                initialValues={periodeskjemaUtils.getInitialFormValuesFromPeriode(periode)}
                onSubmit={(values: PeriodeskjemaFormValues) =>
                    onSubmit(periodeskjemaUtils.createPeriodeFromValues(values))
                }
                render={(props: FormikProps<PeriodeskjemaFormValues>) => (
                    <PeriodeskjemaForm onCancel={onCancel} formik={props} />
                )}
            />
        );
    }
}
export default Periodeskjema;
