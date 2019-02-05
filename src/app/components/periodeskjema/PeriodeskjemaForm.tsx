import * as React from 'react';
import { Form, FormikProps } from 'formik';
import Block from 'common/components/block/Block';
import { Knapp, Hovedknapp } from 'nav-frontend-knapper';
import Knapperad from 'common/components/knapperad/Knapperad';
import { PeriodeskjemaFormValues } from './types';
import { OmForeldre, Periodetype } from '../../types';
import { getPeriodetypeFarge } from '../../utils/styleutils';
import PeriodetypeMeny from '../periodeliste/parts/PeriodetypeMeny';
import BEMHelper from 'common/utils/bem';
import GraderingMeny from '../periodeliste/parts/GraderingMeny';
import { getForelderNavn } from '../../utils/common';
import ForelderMeny from '../periodeliste/parts/ForelderMeny';
import { getUkerOgDagerFromDager } from 'common/utils/datoUtils';
import { Tidsperioden } from '../../utils/Tidsperioden';
import VarighetMeny from '../periodeliste/parts/VarighetMeny';
import { Tidsperiode } from 'nav-datovelger';
import PeriodelisteElement from '../periodeliste/periodelisteElement/PeriodelisteElement';
import { Ingress } from 'nav-frontend-typografi';
import PeriodeBlokk from '../periodeBlokk/PeriodeBlokk';

interface OwnProps {
    omForeldre: OmForeldre;
    onCancel: () => void;
    formik: FormikProps<PeriodeskjemaFormValues>;
}

type Props = OwnProps;

const bem = BEMHelper('periodeElement');

class PeriodeskjemaForm extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
        this.handleTidsperiodeChange = this.handleTidsperiodeChange.bind(this);
    }

    handleTidsperiodeChange(tidsperiode: Tidsperiode) {
        const { formik } = this.props;
        formik.setFieldValue('fom', tidsperiode.fom);
        formik.setFieldValue('tom', tidsperiode.tom);
    }
    render() {
        const { formik, onCancel, omForeldre } = this.props;
        const { fom, tom, periodetype, forelder, gradering } = formik.values;
        const forelderNavn = getForelderNavn(forelder, omForeldre);
        const harFlereForeldre = omForeldre.antallForeldre > 1;
        const { uker, dager } = getUkerOgDagerFromDager(Tidsperioden({ fom, tom }).getAntallUttaksdager());
        return (
            <Form>
                <Block margin="xs">
                    <Ingress>Legg til ny periode</Ingress>
                </Block>
                <PeriodeBlokk farge={getPeriodetypeFarge(periodetype, forelder)} nyPeriode={true}>
                    <Block margin="xs">
                        <PeriodelisteElement
                            menyer={[
                                {
                                    id: 'periodetype',
                                    className: bem.element('periode'),
                                    render: () => (
                                        <PeriodetypeMeny
                                            type={periodetype}
                                            forelder={forelder}
                                            flereForeldre={harFlereForeldre}
                                            tidsperiode={{ fom, tom }}
                                            foreldernavn={forelderNavn}
                                            onChange={(type) => formik.setFieldValue('periodetype', type)}
                                        />
                                    )
                                },
                                {
                                    id: 'gradering',
                                    className: bem.element('gradering'),
                                    render: () => (
                                        <GraderingMeny
                                            foreldernavn={harFlereForeldre ? forelderNavn : 'du'}
                                            gradering={gradering}
                                            onChange={(g) => formik.setFieldValue('gradering', g)}
                                        />
                                    ),
                                    isVisibleCheck: () => periodetype === Periodetype.GradertUttak
                                },
                                {
                                    id: 'forelder',
                                    className: bem.element('foreldre', 'skjema'),
                                    render: () => (
                                        <ForelderMeny
                                            forelder={forelder}
                                            mor={omForeldre.mor}
                                            farMedmor={omForeldre.farMedmor!}
                                            onChange={(f) => formik.setFieldValue('forelder', f)}
                                        />
                                    ),
                                    isVisibleCheck: () => harFlereForeldre
                                },
                                {
                                    id: 'varighet',
                                    className: bem.element('varighet', 'skjema'),
                                    render: () => (
                                        <VarighetMeny
                                            fom={fom}
                                            tom={tom}
                                            uker={uker}
                                            dager={dager}
                                            minDager={1}
                                            visLukkKnapp={fom !== undefined && tom !== undefined}
                                            onTidsperiodeChange={this.handleTidsperiodeChange}
                                        />
                                    )
                                }
                            ]}
                        />
                    </Block>
                    <Knapperad>
                        <Hovedknapp htmlType="submit" disabled={formik.isValid === false}>
                            Legg til
                        </Hovedknapp>
                        <Knapp htmlType="button" onClick={() => onCancel()}>
                            Avbryt
                        </Knapp>
                    </Knapperad>
                </PeriodeBlokk>
            </Form>
        );
    }
}
export default PeriodeskjemaForm;
