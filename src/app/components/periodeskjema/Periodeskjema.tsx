import * as React from 'react';
import { Form, FormikProps } from 'formik';
import Block from 'common/components/block/Block';
import TidsperiodeValg from './TidsperiodeValg';
import { Knapp } from 'nav-frontend-knapper';
import { Periode } from '../../types';

import './periodeskjema.less';
import PeriodetypeValg from './PeriodetypeValg';
import ForelderValg from './ForelderValg';

export type PeriodeFormValues = Partial<Periode>;

interface OwnProps {
    onCancel: () => void;
    formik: FormikProps<PeriodeFormValues>;
}

type Props = OwnProps & PeriodeFormValues;

class Periodeskjema extends React.Component<Props, {}> {
    render() {
        const { formik, onCancel } = this.props;
        const { fom, tom, type, forelder } = formik.values;
        return (
            <Form className="periodeskjema">
                <Block>
                    <PeriodetypeValg
                        periodetype={type}
                        onChange={(periodetype) => formik.setFieldValue('type', periodetype)}
                    />
                </Block>
                <Block>
                    <ForelderValg forelder={forelder} onChange={(f) => formik.setFieldValue('forelder', f)} />
                </Block>
                <Block>
                    <TidsperiodeValg fom={fom} tom={tom} onChange={(evt) => formik.setValues(evt)} />
                </Block>
                <Knapp htmlType="submit">Ok</Knapp>
                <Knapp htmlType="button" onClick={() => onCancel()}>
                    Avbryt
                </Knapp>
            </Form>
        );
    }
}
export default Periodeskjema;
