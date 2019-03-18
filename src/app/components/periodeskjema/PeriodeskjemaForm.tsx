import * as React from 'react';
import ReactDOM from 'react-dom';
import { Form, FormikProps } from 'formik';
import Block from 'common/components/block/Block';
import { Knapp, Hovedknapp } from 'nav-frontend-knapper';
import Knapperad from 'common/components/knapperad/Knapperad';
import { PeriodeskjemaFormValues } from './types';
import { OmForeldre, Periodetype, Periode, Forbruk } from '../../types';
import { getPeriodetypeFarge } from '../../utils/styleutils';
import PeriodetypeMeny from '../periodeliste/parts/PeriodetypeMeny';
import BEMHelper from 'common/utils/bem';
import GraderingMeny from '../periodeliste/parts/GraderingMeny';
import { getForelderNavn } from '../../utils/common';
import ForelderMeny from '../periodeliste/parts/ForelderMeny';
import { Tidsperiode } from 'nav-datovelger';
import PeriodelisteElement from '../periodeliste/periodelisteElement/PeriodelisteElement';
import { Ingress } from 'nav-frontend-typografi';
import PeriodeBlokk from '../periodeBlokk/PeriodeBlokk';
import periodeskjemaUtils from './utils';
import { getTidsperiode, Tidsperioden } from '../../utils/Tidsperioden';
import { VarighetChangeEvent } from './varighet/VarighetSkjema';
import VarighetMeny from './varighet/VarighetMeny';

import './periodeSkjema.less';
import EndringerVedNyPeriode from './EndringerVedNyPeriode';
import { focusFirstElement } from '../../utils/focusUtils';
import getMessage from 'common/utils/i18nUtils';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';

interface OwnProps {
    nesteUttaksdag: Date;
    førsteUttaksdagFørTermin: Date;
    førsteUttaksdag: Date;
    sisteUttaksdag: Date;
    omForeldre: OmForeldre;
    nyPeriode?: Partial<Periode>;
    perioder: Periode[];
    periodeFørTermin?: Periode;
    forbrukEksisterendePerioder: Forbruk;
    onCancel: () => void;
    onChange: (values: PeriodeskjemaFormValues) => void;
    formik: FormikProps<PeriodeskjemaFormValues>;
}

type Props = OwnProps & InjectedIntlProps;

const bem = BEMHelper('periodeElement');

class PeriodeskjemaForm extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
        this.handleTidsperiodeChange = this.handleTidsperiodeChange.bind(this);
        this.handleValueOnChange = this.handleValueOnChange.bind(this);
        this.handleChangeVarighet = this.handleChangeVarighet.bind(this);
        this.getMinDato = this.getMinDato.bind(this);
        this.getMaksDato = this.getMaksDato.bind(this);
    }

    componentDidMount() {
        const el = ReactDOM.findDOMNode(this);
        if (el) {
            focusFirstElement(el as Element);
        }
    }

    handleTidsperiodeChange(tidsperiode: Partial<Tidsperiode>) {
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
    getMinDato() {
        const { periodetype } = this.props.formik.values;
        if (periodetype === Periodetype.UttakFørTermin) {
            return this.props.førsteUttaksdagFørTermin;
        }
        return this.props.førsteUttaksdag;
    }
    getMaksDato() {
        return this.props.sisteUttaksdag;
    }
    render() {
        const {
            formik,
            onCancel,
            omForeldre,
            nesteUttaksdag,
            perioder,
            forbrukEksisterendePerioder,
            intl,
            nyPeriode
        } = this.props;
        const { fom, tom, periodetype, forelder, gradering } = formik.values;
        const forelderNavn = getForelderNavn(forelder, omForeldre);
        const antallUttaksdagerBrukt = periodeskjemaUtils.getBrukteUttaksdagerForNyPeriode(formik.values);
        const uttaksdager = fom && tom ? Tidsperioden({ fom, tom }).getAntallUttaksdager() : undefined;
        return (
            <Form className="periodeSkjema">
                <PeriodeBlokk farge={getPeriodetypeFarge(periodetype, forelder)} nyPeriode={true}>
                    <Block margin="s">
                        <Ingress>
                            <FormattedMessage id="periodeskjema.tittelNyPeriode" />
                        </Ingress>
                    </Block>
                    <Block margin="s">
                        <PeriodelisteElement
                            menyer={[
                                {
                                    id: 'periodetype',
                                    className: bem.element('periode'),
                                    render: () => (
                                        <PeriodetypeMeny
                                            type={periodetype}
                                            forelder={forelder}
                                            foreldernavn={forelderNavn}
                                            dropdownStyle="border"
                                            brukteUttaksdager={antallUttaksdagerBrukt}
                                            uttaksdager={uttaksdager}
                                            onChange={(type) => {
                                                formik.setFieldValue('periodetype', type);
                                                if (type === Periodetype.GradertUttak) {
                                                    formik.setFieldValue('gradering', formik.values.gradering || 50);
                                                }
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
                                            foreldernavn={omForeldre.erDeltOmsorg ? forelderNavn : 'du'}
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
                                    isVisibleCheck: () => omForeldre.erDeltOmsorg
                                },
                                {
                                    id: 'varighet',
                                    className: bem.element('varighet', 'skjema'),
                                    render: () => (
                                        <VarighetMeny
                                            skjemaProps={{
                                                tidsperiode: { fom, tom },
                                                antallUttaksdager: uttaksdager,
                                                antallUttaksdagerBrukt,
                                                minDato: this.getMinDato(),
                                                maksDato: this.getMaksDato(),
                                                onTidsperiodeChange: this.handleTidsperiodeChange,
                                                onVarighetChange: this.handleChangeVarighet,
                                                perioder,
                                                periodetype,
                                                nesteUttaksdag,
                                                erNyPeriode: true,
                                                gjenståendeDager: forbrukEksisterendePerioder.dagerGjenstående,
                                                gradering
                                            }}
                                            dropdownStyle="border"
                                        />
                                    )
                                }
                            ]}
                            info={
                                periodetype === Periodetype.Ferie &&
                                antallUttaksdagerBrukt &&
                                antallUttaksdagerBrukt > 0
                                    ? [
                                          getMessage(intl, 'uttaksplan.ferie.inneholderHelligdager', {
                                              dager: antallUttaksdagerBrukt,
                                              navn: forelderNavn
                                          })
                                      ]
                                    : undefined
                            }
                        />
                    </Block>
                    <Block margin="none">
                        <EndringerVedNyPeriode nyPeriode={nyPeriode} perioder={perioder} omForeldre={omForeldre} />
                    </Block>
                    <Knapperad>
                        <Hovedknapp htmlType="submit" disabled={formik.isValid === false}>
                            <FormattedMessage id="periodeskjema.knapp.leggTil" />
                        </Hovedknapp>
                        <Knapp htmlType="button" onClick={() => onCancel()}>
                            <FormattedMessage id="periodeskjema.knapp.avbryt" />
                        </Knapp>
                    </Knapperad>
                </PeriodeBlokk>
            </Form>
        );
    }
}
export default injectIntl(PeriodeskjemaForm);
