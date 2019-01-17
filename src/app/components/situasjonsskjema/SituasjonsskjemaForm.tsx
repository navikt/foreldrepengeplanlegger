import * as React from 'react';

import { FormikProps, Form } from 'formik';
import { Situasjon } from '../../types';
import VelgSituasjon from '../VelgSituasjon/VelgSituasjon';
import { Input } from 'nav-frontend-skjema';
import { Row, Column } from 'nav-frontend-grid';
import Block from 'common/components/block/Block';
import { Dekningsgrad } from 'common/types';
import { Normaltekst, Ingress } from 'nav-frontend-typografi';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import AntallBarnBolk from './parts/AntallBarnBolk';
import DatoInput from 'common/components/skjema/datoInput/DatoInput';
import RadioGroup from 'common/components/skjema/radioGroup/RadioGroup';
import RangeInput from 'common/components/skjema/rangeInput/RangeInput';

export interface SituasjonsskjemaFormValues {
    situasjon?: Situasjon;
    navnFar?: string;
    navnMor?: string;
    navnMedfar?: string;
    navnMedmor?: string;
    antallBarn?: number;
    termindato?: Date;
    dekningsgrad?: Dekningsgrad;
    fellesperiodeukerMor?: number;
}

interface OwnProps {
    formik: FormikProps<SituasjonsskjemaFormValues>;
}

type Props = OwnProps & InjectedIntlProps;

class SituasjonsskjemaForm extends React.Component<Props, {}> {
    render() {
        const { formik, intl } = this.props;
        const {
            situasjon,
            antallBarn,
            dekningsgrad,
            termindato,
            fellesperiodeukerMor,
            navnFar,
            navnMor
        } = formik.values;
        return (
            <Form>
                <Block title="Velg din eller deres situasjon">
                    <VelgSituasjon onChange={(s) => formik.setFieldValue('situasjon', s)} valgtSituasjon={situasjon} />
                </Block>
                <Block visible={situasjon !== undefined}>
                    <Row>
                        <Column xs="6">
                            <Input label="Far" name="navnFar" onChange={formik.handleChange} />
                        </Column>
                        <Column xs="6">
                            <Input label="Mor" name="navnMor" onChange={formik.handleChange} />
                        </Column>
                    </Row>
                </Block>
                <Block margin="none" visible={navnFar !== undefined}>
                    <AntallBarnBolk
                        spørsmål="Hvor mange barn venter dere?"
                        inputName="antallBarn"
                        antallBarn={antallBarn}
                        onChange={(antall) => formik.setFieldValue('antallBarn', antall)}
                    />
                </Block>
                <Block visible={antallBarn !== undefined} title="Når er barnet forventet?">
                    <DatoInput
                        id="termindato"
                        name="termindato"
                        label="Termindato"
                        onChange={(dato: Date) => formik.setFieldValue('termindato', dato)}
                        dato={termindato}
                    />
                </Block>
                <Block visible={termindato !== undefined}>
                    <RadioGroup
                        name="dekningsgrad"
                        legend="Hvor lang periode med foreldrepenger ønsker du/dere?"
                        options={[
                            {
                                label: '49 uker med 100 prosent foreldrepenger',
                                value: '100'
                            },
                            {
                                label: '59 uker med 80 prosent foreldrepenger',
                                value: '80'
                            }
                        ]}
                        onChange={(dg) => formik.setFieldValue('dekningsgrad', dg)}
                        checked={dekningsgrad}
                        twoColumns={true}
                    />
                </Block>
                <Block visible={dekningsgrad !== undefined}>
                    <RangeInput
                        label="Hvordan ønsker dere å fordele fellesperioden"
                        ariaLabelText="Hvordan ønsker dere å fordele fellesperioden"
                        value={fellesperiodeukerMor || 10}
                        min={0}
                        max={49}
                        onChange={(uker) => formik.setFieldValue('fellesperiodeukerMor', uker)}
                        steppers={{
                            reduceLabel: intl.formatMessage({
                                id: 'uttaksplan.skjema.fordeling.reduser.tooltip'
                            }),
                            increaseLabel: intl.formatMessage({ id: 'uttaksplan.skjema.fordeling.øk.tooltip' })
                        }}
                        ariaValueChangedMessage={(value) =>
                            intl.formatMessage(
                                { id: 'uttaksplan.skjema.fordeling.valgtVerdi' },
                                {
                                    ukerForelder: value,
                                    ukerTotalt: 49,
                                    navnForelder: navnMor || intl.formatMessage({ id: 'uttaksplan.mor' })
                                }
                            )
                        }
                        valueLabelRenderer={(options) => (
                            <Ingress tag="p" className="m-text-center fordelingFellesperiode--valgtVerdi">
                                <FormattedMessage
                                    id="uttaksplan.skjema.fordeling.valgtVerdi"
                                    values={{
                                        ukerForelder: options.value,
                                        ukerTotalt: options.max,
                                        navnForelder: navnMor || intl.formatMessage({ id: 'uttaksplan.mor' })
                                    }}
                                />
                            </Ingress>
                        )}
                        valueLabelPlacement="above"
                        bottomContentRenderer={(options) => (
                            <Normaltekst className="m-text-center fordelingFellesperiode--bottomContent">
                                <FormattedMessage
                                    id="uttaksplan.skjema.fordeling.annenForeldersFellesperiode"
                                    values={{
                                        annenForeldersNavn: navnFar,
                                        antallUker: options.max - options.value
                                    }}
                                />
                            </Normaltekst>
                        )}
                    />{' '}
                </Block>

                <button type="submit">Ok</button>
            </Form>
        );
    }
}
export default injectIntl(SituasjonsskjemaForm);
