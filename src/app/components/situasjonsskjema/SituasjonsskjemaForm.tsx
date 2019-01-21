import * as React from 'react';
import { FormikProps, Form } from 'formik';
import VelgSituasjon from '../velgSituasjon/VelgSituasjon';
import { Input } from 'nav-frontend-skjema';
import { Row, Column } from 'nav-frontend-grid';
import Block from 'common/components/block/Block';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import AntallBarnBolk from './parts/AntallBarnBolk';
import DatoInput from 'common/components/skjema/datoInput/DatoInput';
import { SituasjonSkjemadata } from '../../types';
import { Hovedknapp } from 'nav-frontend-knapper';

interface OwnProps {
    formik: FormikProps<SituasjonSkjemadata>;
}

type Props = OwnProps & InjectedIntlProps;

class SituasjonsskjemaForm extends React.Component<Props, {}> {
    render() {
        const { formik } = this.props;
        const { situasjon, antallBarn, familiehendelsesdato, navnFar } = formik.values;
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
                        id="familiehendelsesdato"
                        name="familiehendelsesdato"
                        label="familiehendelsesdato"
                        onChange={(dato: Date) => formik.setFieldValue('familiehendelsesdato', dato)}
                        dato={familiehendelsesdato}
                    />
                </Block>
                <Block align="center" visible={formik.isValid}>
                    <Hovedknapp htmlType="submit">Gå videre</Hovedknapp>
                </Block>
            </Form>
        );
    }
}
export default injectIntl(SituasjonsskjemaForm);
