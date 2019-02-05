import * as React from 'react';
import { Form, FormikProps } from 'formik';
import Block from 'common/components/block/Block';
import TidsperiodeValg from './parts/TidsperiodeValg';
import { Knapp } from 'nav-frontend-knapper';

import './periodeskjema.less';
import PeriodetypeValg from './parts/PeriodetypeValg';
import ForelderValg from './parts/ForelderValg';
import Knapperad from 'common/components/knapperad/Knapperad';
import { PeriodeskjemaFormValues } from './types';
import { OmForeldre } from '../../types';
import PeriodeElementLayout from '../periodeliste/periodelisteElement/PeriodelisteElement';
import { getPeriodetypeFarge } from '../../utils/styleutils';
import PeriodetypeMeny from '../periodeliste/parts/PeriodetypeMeny';
import BEMHelper from 'common/utils/bem';

interface OwnProps {
    omForeldre: OmForeldre;
    onCancel: () => void;
    formik: FormikProps<PeriodeskjemaFormValues>;
}

type Props = OwnProps;

const bem = BEMHelper('periodeElement');

class PeriodeskjemaForm extends React.Component<Props, {}> {
    render() {
        const { formik, onCancel, omForeldre } = this.props;
        const { fom, tom, periodetype, forelder } = formik.values;
        return (
            <Form className="periodeskjema">
                <PeriodeElementLayout
                    farge={getPeriodetypeFarge(periodetype)}
                    menyer={[
                        {
                            id: 'periodetype',
                            className: bem.element('periode'),
                            render: () => (
                                <PeriodetypeMeny
                                    type={periodetype}
                                    forelder={forelder}
                                    flereForeldre={omForeldre.antallForeldre > 1}
                                    tidsperiode={{ fom, tom }}
                                    foreldernavn={forelder ? 'sdf' : 'sdf'}
                                    onChange={(type) => formik.setFieldValue('periodetype', periodetype)}
                                />
                            )
                        }
                    ]}
                />
                <Block>
                    <PeriodetypeValg periodetype={periodetype} onChange={(pt) => formik.setFieldValue('type', pt)} />
                </Block>
                {omForeldre.antallForeldre === 2 && (
                    <Block>
                        <ForelderValg
                            forelder={forelder}
                            onChange={(f) => formik.setFieldValue('forelder', f)}
                            mor={omForeldre.mor}
                            farMedmor={omForeldre.farMedmor!}
                        />
                    </Block>
                )}
                <Block>
                    <TidsperiodeValg
                        fom={fom}
                        tom={tom}
                        onChange={(tidsperiode) => {
                            formik.setFieldValue('fom', tidsperiode.fom);
                            formik.setFieldValue('tom', tidsperiode.tom);
                        }}
                    />
                </Block>
                <Knapperad>
                    <Knapp htmlType="submit">Ok</Knapp>
                    <Knapp htmlType="button" onClick={() => onCancel()}>
                        Avbryt
                    </Knapp>
                </Knapperad>
            </Form>
        );
    }
}
export default PeriodeskjemaForm;
