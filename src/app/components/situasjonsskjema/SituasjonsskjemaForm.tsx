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
import { getAntallForeldreISituasjon, inputHasValue, getTermindatoAvgrensninger } from '../../utils/common';
import LinkButton from 'common/components/linkButton/LinkButton';
import VelgErMorEllerFar from './parts/VelgErMorEllerFar';

interface OwnProps {
    formik: FormikProps<SituasjonSkjemadata>;
    onReset?: () => void;
}
type Props = OwnProps & InjectedIntlProps;

const visAntallBarnValg = (
    situasjon: Situasjon | undefined,
    navnFarMedmor: string | undefined,
    navnMor: string | undefined
): boolean => {
    if (situasjon === undefined) {
        return false;
    }
    if (getAntallForeldreISituasjon(situasjon) === 1) {
        return inputHasValue(navnMor);
    }
    return inputHasValue(navnMor) && inputHasValue(navnFarMedmor);
};

class SituasjonsskjemaForm extends React.Component<Props> {
    render() {
        const { formik, onReset } = this.props;
        const { situasjon, antallBarn, familiehendelsesdato, navnFarMedmor, navnMor, erMor } = formik.values;
        const visErMorEllerFarMedmor = situasjon === Situasjon.aleneomsorg;
        const visNavn =
            situasjon !== undefined &&
            (visErMorEllerFarMedmor === false || (visErMorEllerFarMedmor === true && erMor !== undefined));
        const visAntallBarn = visAntallBarnValg(situasjon, navnFarMedmor, navnMor);
        const visTermindato = visAntallBarn && antallBarn !== undefined;
        const termindatoAvgrensninger = getTermindatoAvgrensninger();
        const erToForeldre = getAntallForeldreISituasjon(situasjon) > 1;
        return (
            <Form>
                <Skjemablokk tittel="Velg deres situasjon" animated={true}>
                    <Block margin="s">
                        <VelgSituasjon
                            onChange={(s) => formik.setFieldValue('situasjon', s)}
                            valgtSituasjon={situasjon}
                        />
                    </Block>

                    <Block visible={visErMorEllerFarMedmor}>
                        <VelgErMorEllerFar erMor={erMor} onChange={(em) => formik.setFieldValue('erMor', em)} />
                    </Block>

                    <Block visible={visNavn} margin="none">
                        <VelgForeldrenavn
                            situasjon={situasjon}
                            navnFarMedmor={navnFarMedmor}
                            navnMor={navnMor}
                            onChangeFarMedmor={(navn) => {
                                formik.setFieldValue('navnFarMedmor', navn);
                            }}
                            onChangeMor={(navn) => {
                                formik.setFieldValue('navnMor', navn);
                            }}
                        />
                    </Block>
                </Skjemablokk>

                {visAntallBarn && (
                    <Skjemablokk
                        tittel={erToForeldre ? 'Hvor mange barn venter dere?' : 'Hvor mange barn venter du?'}
                        visible={visAntallBarn}>
                        <VelgAntallBarn
                            antallBarn={antallBarn}
                            onChange={(antall) => formik.setFieldValue('antallBarn', antall)}
                        />
                    </Skjemablokk>
                )}

                {visTermindato && (
                    <Skjemablokk
                        tittel={`Når er ${
                            antallBarn === 1 ? 'barnet' : antallBarn === 2 ? 'tvillingene' : 'barna'
                        } forventet?`}
                        visible={visTermindato}>
                        <DatoInput
                            id="familiehendelsesdato"
                            name="familiehendelsesdato"
                            label="Termindato"
                            avgrensninger={termindatoAvgrensninger}
                            visÅrValger={true}
                            onChange={(dato: Date) => formik.setFieldValue('familiehendelsesdato', dato)}
                            dato={familiehendelsesdato}
                        />
                    </Skjemablokk>
                )}
                <Block align="center" visible={formik.isValid}>
                    <Block>
                        <Hovedknapp htmlType="submit">Gå videre</Hovedknapp>
                    </Block>
                    {onReset && (
                        <LinkButton
                            onClick={() => {
                                onReset();
                                formik.resetForm();
                            }}>
                            Start på ny
                        </LinkButton>
                    )}
                </Block>
            </Form>
        );
    }
}
export default injectIntl(SituasjonsskjemaForm);
