import * as React from 'react';
import { FormikProps, Form } from 'formik';
import Block from 'common/components/block/Block';
import { FormattedMessage, useIntl } from 'react-intl';
import DatoInput from 'common/components/skjema/datoInput/DatoInput';
import { SituasjonSkjemadata } from '../../../../types';
import { Hovedknapp } from 'nav-frontend-knapper';
import VelgAntallBarn from './parts/VelgAntallBarn';
import Skjemablokk from '../../../../components/skjemablokk/Skjemablokk';
import VelgSituasjon from './parts/velgSituasjon/VelgSituasjon';
import VelgForeldrenavn from './parts/VelgForeldrenavn';
import { inputHasValue, getTermindatoAvgrensninger } from '../../../../utils/common';
import LinkButton from 'common/components/linkButton/LinkButton';
import VelgErMorEllerFar from './parts/VelgErMorEllerFar';
import getMessage from 'common/util/i18nUtils';
import { getAntallForeldreISituasjon } from 'shared/components/foreldrepar/foreldreparUtils';
import { ForeldreparSituasjon } from 'shared/types';
import { Forelder } from 'common/types';

interface Props {
    formik: FormikProps<SituasjonSkjemadata>;
    onReset?: () => void;
}

const visAntallBarnValg = (
    situasjon: ForeldreparSituasjon | undefined,
    navnFarMedmor: string | undefined,
    navnMor: string | undefined,
    erMor: boolean | undefined
): boolean => {
    if (situasjon === undefined) {
        return false;
    }
    if (getAntallForeldreISituasjon(situasjon) === 1) {
        if (situasjon === ForeldreparSituasjon.bareFar) {
            return inputHasValue(navnFarMedmor);
        }
        if (situasjon === ForeldreparSituasjon.bareMor) {
            return inputHasValue(navnMor);
        }
        if (situasjon === ForeldreparSituasjon.aleneomsorg && erMor !== undefined) {
            return erMor ? inputHasValue(navnMor) : inputHasValue(navnFarMedmor);
        }
        return false;
    }
    return inputHasValue(navnMor) && inputHasValue(navnFarMedmor);
};

const SituasjonsskjemaForm: React.FunctionComponent<Props> = ({ formik, onReset }) => {
    const intl = useIntl();
    const {
        situasjon,
        antallBarn,
        familiehendelsesdato,
        navnFarMedmor,
        navnMor,
        forelderVedAleneomsorg,
    } = formik.values;
    const visErMorEllerFarMedmor = situasjon === ForeldreparSituasjon.aleneomsorg;
    const visNavn =
        situasjon !== undefined &&
        (visErMorEllerFarMedmor === false || (visErMorEllerFarMedmor === true && forelderVedAleneomsorg !== undefined));
    const visAntallBarn =
        visNavn && visAntallBarnValg(situasjon, navnFarMedmor, navnMor, forelderVedAleneomsorg === Forelder.mor);
    const visTermindato = visAntallBarn && antallBarn !== undefined;
    const termindatoAvgrensninger = getTermindatoAvgrensninger();
    const erToForeldre = getAntallForeldreISituasjon(situasjon) > 1;
    return (
        <Form>
            <Skjemablokk tittel={getMessage(intl, 'situasjon.velgSituasjon')} animated={true}>
                <Block margin="s">
                    <VelgSituasjon
                        onChange={(s) => {
                            formik.setFieldValue('situasjon', s);
                            formik.setFieldValue('forelderVedAleneomsorg', undefined);
                        }}
                        valgtSituasjon={situasjon}
                    />
                </Block>

                <Block visible={visErMorEllerFarMedmor}>
                    <VelgErMorEllerFar
                        forelder={forelderVedAleneomsorg}
                        onChange={(em: any) => formik.setFieldValue('forelderVedAleneomsorg', em)}
                    />
                </Block>

                <Block visible={visNavn} margin="none">
                    <VelgForeldrenavn
                        situasjon={situasjon}
                        forelderVedAleneomsorg={forelderVedAleneomsorg}
                        navnFarMedmor={navnFarMedmor}
                        navnMor={navnMor}
                        onChangeFarMedmor={(navn: any) => {
                            formik.setFieldValue('navnFarMedmor', navn);
                        }}
                        onChangeMor={(navn: any) => {
                            formik.setFieldValue('navnMor', navn);
                        }}
                    />
                </Block>
            </Skjemablokk>

            {visAntallBarn && (
                <Skjemablokk
                    tittel={getMessage(intl, `antallBarn.hvorMange.${erToForeldre ? 'dere' : 'du'}`)}
                    visible={visAntallBarn}>
                    <VelgAntallBarn
                        antallBarn={antallBarn}
                        onChange={(antall: number) => formik.setFieldValue('antallBarn', antall)}
                    />
                </Skjemablokk>
            )}

            {visTermindato && (
                <Skjemablokk tittel={getMessage(intl, 'termindato.når')} visible={visTermindato}>
                    <DatoInput
                        id="familiehendelsesdato"
                        name="familiehendelsesdato"
                        label="Termindato"
                        datoAvgrensninger={termindatoAvgrensninger}
                        visÅrVelger={true}
                        onChange={(dato: Date) => formik.setFieldValue('familiehendelsesdato', dato)}
                        dato={familiehendelsesdato}
                    />
                </Skjemablokk>
            )}
            <Block align="center" visible={formik.isValid}>
                <Block>
                    <Hovedknapp htmlType="submit">
                        <FormattedMessage id="knapp.gåVidere" />
                    </Hovedknapp>
                </Block>
                {onReset && (
                    <Block visible={false}>
                        <LinkButton
                            onClick={() => {
                                onReset();
                                formik.resetForm();
                            }}>
                            <FormattedMessage id="lenke.startPåNy" />
                        </LinkButton>
                    </Block>
                )}
            </Block>
        </Form>
    );
};

export default SituasjonsskjemaForm;
