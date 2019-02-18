import * as React from 'react';
import { Form, FormikProps } from 'formik';
import Block from 'common/components/block/Block';
import { Knapp, Hovedknapp } from 'nav-frontend-knapper';
import Knapperad from 'common/components/knapperad/Knapperad';
import { PeriodeskjemaFormValues } from './types';
import { OmForeldre, Periodetype, Periode } from '../../types';
import { getPeriodetypeFarge } from '../../utils/styleutils';
import PeriodetypeMeny from '../periodeliste/parts/PeriodetypeMeny';
import BEMHelper from 'common/utils/bem';
import GraderingMeny from '../periodeliste/parts/GraderingMeny';
import { getForelderNavn } from '../../utils/common';
import ForelderMeny from '../periodeliste/parts/ForelderMeny';
import VarighetMeny, { VarighetChangeEvent } from '../periodeliste/parts/VarighetMeny';
import { Tidsperiode } from 'nav-datovelger';
import PeriodelisteElement from '../periodeliste/periodelisteElement/PeriodelisteElement';
import { Ingress } from 'nav-frontend-typografi';
import PeriodeBlokk from '../periodeBlokk/PeriodeBlokk';
import periodeskjemaUtils from './utils';
import { getTidsperiode, Tidsperioden } from '../../utils/Tidsperioden';

import './periodeSkjema.less';

interface OwnProps {
    nesteUttaksdag: Date;
    førsteUttaksdagFørTermin: Date;
    førsteUttaksdag: Date;
    sisteUttaksdag: Date;
    omForeldre: OmForeldre;
    nyPeriode?: Partial<Periode>;
    perioder: Periode[];
    onCancel: () => void;
    onChange: (values: PeriodeskjemaFormValues) => void;
    formik: FormikProps<PeriodeskjemaFormValues>;
}

type Props = OwnProps;

const bem = BEMHelper('periodeElement');

class PeriodeskjemaForm extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
        this.handleTidsperiodeChange = this.handleTidsperiodeChange.bind(this);
        this.handleValueOnChange = this.handleValueOnChange.bind(this);
        this.handleChangeVarighet = this.handleChangeVarighet.bind(this);
    }

    handleTidsperiodeChange(tidsperiode: Tidsperiode) {
        const { formik } = this.props;
        formik.setFieldValue('fom', tidsperiode.fom);
        formik.setFieldValue('tom', tidsperiode.tom);
        this.handleValueOnChange();
    }

    handleChangeVarighet(evt: VarighetChangeEvent) {
        const { dager } = evt;
        const { formik } = this.props;
        const { periodetype } = formik.values;
        const fom = formik.values.fom || this.props.nesteUttaksdag;

        if (fom && dager !== undefined && dager > 0 && periodetype !== Periodetype.UttakFørTermin) {
            formik.setFieldValue('fom', fom);
            formik.setFieldValue('tom', getTidsperiode(fom, dager).tom);
            this.handleValueOnChange();
        }
    }
    handleValueOnChange() {
        const { onChange } = this.props;
        if (onChange) {
            setTimeout(() => {
                onChange(this.props.formik.values);
            });
        }
    }
    render() {
        const { formik, onCancel, omForeldre, nesteUttaksdag, førsteUttaksdag, sisteUttaksdag, perioder } = this.props;
        const { fom, tom, periodetype, forelder, gradering } = formik.values;
        const forelderNavn = getForelderNavn(forelder, omForeldre);
        const harFlereForeldre = omForeldre.antallForeldre > 1;
        const brukteUttaksdager = periodeskjemaUtils.getBrukteUttaksdagerForNyPeriode(formik.values);
        const uttaksdager = fom && tom ? Tidsperioden({ fom, tom }).getAntallUttaksdager() : undefined;
        return (
            <Form className="periodeSkjema">
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
                                            dropdownStyle="border"
                                            brukteUttaksdager={brukteUttaksdager}
                                            onChange={(type) => {
                                                formik.setFieldValue('periodetype', type);
                                                this.handleValueOnChange();
                                            }}
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
                                            dropdownStyle="border"
                                            onChange={(g) => {
                                                formik.setFieldValue('gradering', g);
                                                this.handleValueOnChange();
                                            }}
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
                                            dropdownStyle="border"
                                            onChange={(f) => {
                                                formik.setFieldValue('forelder', f);
                                                this.handleValueOnChange();
                                            }}
                                        />
                                    ),
                                    isVisibleCheck: () => harFlereForeldre
                                },
                                {
                                    id: 'varighet',
                                    className: bem.element('varighet', 'skjema'),
                                    render: () => (
                                        <VarighetMeny
                                            omForeldre={omForeldre}
                                            perioder={perioder}
                                            erNyPeriode={true}
                                            dager={uttaksdager}
                                            periodetype={periodetype}
                                            fom={fom || nesteUttaksdag}
                                            tom={tom}
                                            minDager={1}
                                            brukteUttaksdager={brukteUttaksdager}
                                            førsteUttaksdag={førsteUttaksdag}
                                            sisteUttaksdag={sisteUttaksdag}
                                            visLukkKnapp={true /*fom !== undefined && tom !== undefined*/}
                                            onTidsperiodeChange={this.handleTidsperiodeChange}
                                            onVarighetChange={this.handleChangeVarighet}
                                            dropdownStyle="border"
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
