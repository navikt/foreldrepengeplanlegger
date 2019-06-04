import * as React from 'react';
import { Row, Column } from 'nav-frontend-grid';
import { Input } from 'nav-frontend-skjema';
import { Situasjon, Forelder } from '../../../types';
import { getAntallForeldreISituasjon } from '../../../utils/common';
import { InjectedIntlProps, injectIntl, InjectedIntl } from 'react-intl';
import getMessage from 'common/util/i18nUtils';

interface OwnProps {
    situasjon: Situasjon;
    forelderVedAleneomsorg?: Forelder;
    navnFarMedmor?: string;
    navnMor?: string;
    onChangeFarMedmor: (navn: string) => void;
    onChangeMor: (navn: string) => void;
}

type Props = OwnProps & InjectedIntlProps;

const getMorLabel = (situasjon: Situasjon, intl: InjectedIntl): string => {
    switch (situasjon) {
        case Situasjon.farOgFar:
        case Situasjon.farOgMor:
        case Situasjon.morOgMedmor:
            return getMessage(intl, `situasjonskjema.fornavn.mor.${situasjon}.label`);
        default:
            return getMessage(intl, 'situasjonskjema.fornavn.label');
    }
};

const getFarMedmorLabel = (situasjon: Situasjon, intl: InjectedIntl): string => {
    switch (situasjon) {
        case Situasjon.farOgFar:
        case Situasjon.farOgMor:
        case Situasjon.morOgMedmor:
            return getMessage(intl, `situasjonskjema.fornavn.far.${situasjon}.label`);
        default:
            return getMessage(intl, 'situasjonskjema.fornavn.label');
    }
};

const VelgForeldrenavn: React.StatelessComponent<Props> = ({
    situasjon,
    forelderVedAleneomsorg,
    navnFarMedmor = '',
    navnMor = '',
    onChangeFarMedmor,
    onChangeMor,
    intl
}) => {
    const toForeldre = getAntallForeldreISituasjon(situasjon) === 2;
    const visMorInput =
        toForeldre ||
        situasjon === Situasjon.bareMor ||
        (situasjon === Situasjon.aleneomsorg && forelderVedAleneomsorg === Forelder.mor);
    const visFarInput =
        toForeldre ||
        situasjon === Situasjon.bareFar ||
        (situasjon === Situasjon.aleneomsorg && forelderVedAleneomsorg === Forelder.farMedmor);
    return (
        <Row>
            {visMorInput && (
                <Column xs="6">
                    <Input
                        label={getMorLabel(situasjon, intl)}
                        value={navnMor}
                        name="navnMor"
                        onChange={(evt: React.ChangeEvent<HTMLInputElement>) => onChangeMor(evt.target.value)}
                    />
                </Column>
            )}
            {visFarInput && (
                <Column xs="6">
                    <Input
                        label={getFarMedmorLabel(situasjon, intl)}
                        value={navnFarMedmor}
                        name="navnFarMedmor"
                        onChange={(evt: React.ChangeEvent<HTMLInputElement>) => onChangeFarMedmor(evt.target.value)}
                    />
                </Column>
            )}
        </Row>
    );
};

export default injectIntl(VelgForeldrenavn);
