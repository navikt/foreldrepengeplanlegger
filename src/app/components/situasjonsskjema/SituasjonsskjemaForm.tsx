import * as React from 'react';
import { FormikProps, Form } from 'formik';
import Block from 'common/components/block/Block';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import DatoInput from 'common/components/skjema/datoInput/DatoInput';
import { SituasjonSkjemadata, Situasjon } from '../../types';
import { Hovedknapp } from 'nav-frontend-knapper';
import VelgAntallBarn from './parts/VelgAntallBarn';
import Skjemablokk from '../skjemablokk/Skjemablokk';
import VelgSituasjon from './parts/velgSituasjon/VelgSituasjon';
import VelgForeldrenavn from './parts/VelgForeldrenavn';
import { getAntallForeldreISituasjon, inputHasValue } from '../../utils/common';

interface OwnProps {
    formik: FormikProps<SituasjonSkjemadata>;
}

type Props = OwnProps & InjectedIntlProps;

const visAntallBarnValg = (
    situasjon: Situasjon | undefined,
    navnForelder1: string | undefined,
    navnForelder2: string | undefined
): boolean => {
    if (situasjon === undefined) {
        return false;
    }
    if (getAntallForeldreISituasjon(situasjon) === 1) {
        return inputHasValue(navnForelder1);
    }
    return inputHasValue(navnForelder1) && inputHasValue(navnForelder2);
};

class SituasjonsskjemaForm extends React.Component<Props, {}> {
    render() {
        const { formik } = this.props;
        const { situasjon, antallBarn, familiehendelsesdato, navnForelder1, navnForelder2 } = formik.values;
        const visAntallBarn = visAntallBarnValg(situasjon, navnForelder1, navnForelder2);
        const visTermindato = visAntallBarn && antallBarn !== undefined;
        return (
            <Form>
                <Skjemablokk tittel="Velg deres situasjon">
                    <Block margin="s">
                        <VelgSituasjon
                            onChange={(s) => formik.setFieldValue('situasjon', s)}
                            valgtSituasjon={situasjon}
                        />
                    </Block>
                    <Block visible={situasjon !== undefined} margin="none">
                        <VelgForeldrenavn
                            situasjon={situasjon}
                            navnForelder1={navnForelder1}
                            navnForelder2={navnForelder2}
                            onChangeForelder1={(navn) => {
                                formik.setFieldValue('navnForelder1', navn);
                            }}
                            onChangeForelder2={(navn) => {
                                formik.setFieldValue('navnForelder2', navn);
                            }}
                        />
                    </Block>
                </Skjemablokk>

                <Skjemablokk tittel="Hvor mange barn venter dere?" visible={visAntallBarn}>
                    <VelgAntallBarn
                        antallBarn={antallBarn}
                        onChange={(antall) => formik.setFieldValue('antallBarn', antall)}
                    />
                </Skjemablokk>

                <Skjemablokk tittel="Når er barnet forventet?" visible={visTermindato}>
                    <DatoInput
                        id="familiehendelsesdato"
                        name="familiehendelsesdato"
                        label="Termindato"
                        onChange={(dato: Date) => formik.setFieldValue('familiehendelsesdato', dato)}
                        dato={familiehendelsesdato}
                    />
                </Skjemablokk>
                <Block align="center" visible={formik.isValid}>
                    <Hovedknapp htmlType="submit">Gå videre</Hovedknapp>
                </Block>
            </Form>
        );
    }
}
export default injectIntl(SituasjonsskjemaForm);
