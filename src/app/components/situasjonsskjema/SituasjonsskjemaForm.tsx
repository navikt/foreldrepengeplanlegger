import * as React from 'react';
import { FormikProps, Form } from 'formik';
import { Situasjon } from '../../types';
import VelgSituasjon from '../velgSituasjon/VelgSituasjon';
import { Input } from 'nav-frontend-skjema';
import { Row, Column } from 'nav-frontend-grid';
import Block from 'common/components/block/Block';
import { Dekningsgrad } from 'common/types';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import AntallBarnBolk from './parts/AntallBarnBolk';
import DatoInput from 'common/components/skjema/datoInput/DatoInput';
import RadioGroup from 'common/components/skjema/radioGroup/RadioGroup';

export interface SituasjonsskjemaFormValues {
    situasjon?: Situasjon;
    navnFar?: string;
    navnMor?: string;
    navnMedfar?: string;
    navnMedmor?: string;
    antallBarn?: number;
    termindato?: Date;
    dekningsgrad?: Dekningsgrad;
}

interface OwnProps {
    formik: FormikProps<SituasjonsskjemaFormValues>;
}

type Props = OwnProps & InjectedIntlProps;

class SituasjonsskjemaForm extends React.Component<Props, {}> {
    render() {
        const { formik } = this.props;
        const { situasjon, antallBarn, dekningsgrad, termindato, navnFar } = formik.values;
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

                <button type="submit">Ok</button>
            </Form>
        );
    }
}
export default injectIntl(SituasjonsskjemaForm);
