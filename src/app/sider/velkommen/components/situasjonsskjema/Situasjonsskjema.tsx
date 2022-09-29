import * as React from 'react';
import { Formik, FormikProps } from 'formik';
import SituasjonsskjemaForm from './SituasjonsskjemaForm';
import { SituasjonSkjemadata } from '../../../../types';
import * as yup from 'yup';
import { injectIntl, IntlShape } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import { getAntallForeldreISituasjon } from 'shared/components/foreldrepar/foreldreparUtils';
import { ForeldreparSituasjon } from 'shared/types';
import { Forelder } from 'common/types';
import moment from 'moment';
import { getTermindatoAvgrensninger } from 'app/utils/common';
import { dateToISOFormattedDateString } from 'common/util/datoUtils';

interface OwnProps {
    skjemadata?: SituasjonSkjemadata;
    onSubmit: (data: SituasjonSkjemadata) => void;
    onReset?: () => void;
}

interface IntlProp {
    intl: IntlShape;
}

type Props = OwnProps & IntlProp;

const getSituasjonValidationSkjema = (intl: IntlShape) =>
    yup.object().shape({
        situasjon: yup.string().required(getMessage(intl, 'situasjonskjema.validering.situasjon')),
        navnMor: yup
            .string()
            .when(
                ['situasjon', 'forelderVedAleneomsorg'],
                (
                    situasjon: ForeldreparSituasjon,
                    forelderVedAleneomsorg: Forelder | undefined,
                    schema: yup.Schema<SituasjonSkjemadata>
                ) => {
                    if (getAntallForeldreISituasjon(situasjon) === 2) {
                        return schema.required(getMessage(intl, 'situasjonskjema.validering.foreldernavn'));
                    }
                    if (situasjon === ForeldreparSituasjon.bareMor) {
                        return schema.required(getMessage(intl, 'situasjonskjema.validering.foreldernavn'));
                    }
                    if (situasjon === ForeldreparSituasjon.aleneomsorg && forelderVedAleneomsorg === Forelder.mor) {
                        return schema.required(getMessage(intl, 'situasjonskjema.validering.foreldernavn'));
                    }
                    return schema;
                }
            ),
        navnFarMedmor: yup
            .string()
            .when(
                ['situasjon', 'forelderVedAleneomsorg'],
                (
                    situasjon: ForeldreparSituasjon,
                    forelderVedAleneomsorg: Forelder | undefined,
                    schema: yup.Schema<SituasjonSkjemadata>
                ) => {
                    if (getAntallForeldreISituasjon(situasjon) === 2) {
                        return schema.required(getMessage(intl, 'situasjonskjema.validering.foreldernavn'));
                    }
                    if (situasjon === ForeldreparSituasjon.bareFar) {
                        return schema.required(getMessage(intl, 'situasjonskjema.validering.foreldernavn'));
                    }
                    if (
                        situasjon === ForeldreparSituasjon.aleneomsorg &&
                        forelderVedAleneomsorg === Forelder.farMedmor
                    ) {
                        return schema.required(getMessage(intl, 'situasjonskjema.validering.foreldernavn'));
                    }
                    return schema;
                }
            ),
        forelderVedAleneomsorg: yup
            .string()
            .when('situasjon', (situasjon: ForeldreparSituasjon, schema: yup.Schema<SituasjonSkjemadata>) => {
                if (situasjon === ForeldreparSituasjon.aleneomsorg) {
                    return schema.required(getMessage(intl, 'situasjonskjema.validering.forelderVedAleneomsorg'));
                }
                return schema;
            }),

        antallBarn: yup.number().required(getMessage(intl, 'situasjonskjema.validering.antallBarn')),
        familiehendelsesdato: yup
            .date()
            .required(getMessage(intl, 'situasjonskjema.validering.termindato'))
            .test('checkFamiliehendelsesdato', 'Dato er for langt tilbake i tid', (date: Date) => {
                const termindatoAvgrensninger = getTermindatoAvgrensninger();

                if (moment(date).isSameOrAfter(dateToISOFormattedDateString(termindatoAvgrensninger.minDato))) {
                    return true;
                }

                return false;
            }),
    });

class Situasjonsskjema extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }
    handleOnSubmit(skjemadata: SituasjonSkjemadata) {
        this.props.onSubmit(skjemadata);
    }
    render() {
        const { skjemadata, onReset, intl } = this.props;
        const initialValues: Partial<SituasjonSkjemadata> = skjemadata || {};
        return (
            <>
                <Formik
                    isInitialValid={skjemadata !== undefined}
                    enableReinitialize={true}
                    initialValues={initialValues}
                    onSubmit={this.handleOnSubmit}
                    render={(props: FormikProps<SituasjonSkjemadata>) => (
                        <SituasjonsskjemaForm formik={props} onReset={onReset} />
                    )}
                    validationSchema={getSituasjonValidationSkjema(intl)}
                />
            </>
        );
    }
}
export default injectIntl(Situasjonsskjema);
