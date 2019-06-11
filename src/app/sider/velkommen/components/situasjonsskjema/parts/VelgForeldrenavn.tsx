import * as React from 'react';
import { Row, Column } from 'nav-frontend-grid';
import { Input } from 'nav-frontend-skjema';
import { InjectedIntlProps, injectIntl, InjectedIntl } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import { getAntallForeldreISituasjon } from 'shared/components/foreldrepar/foreldreparUtils';
import { ForeldreparSituasjon } from 'shared/types';
import { Forelder } from 'common/types';

interface OwnProps {
    situasjon: ForeldreparSituasjon;
    forelderVedAleneomsorg?: Forelder;
    navnFarMedmor?: string;
    navnMor?: string;
    onChangeFarMedmor: (navn: string) => void;
    onChangeMor: (navn: string) => void;
}

type Props = OwnProps & InjectedIntlProps;

const getMorLabel = (situasjon: ForeldreparSituasjon, intl: InjectedIntl): string => {
    switch (situasjon) {
        case ForeldreparSituasjon.farOgFar:
        case ForeldreparSituasjon.farOgMor:
        case ForeldreparSituasjon.morOgMedmor:
            return getMessage(intl, `situasjonskjema.fornavn.mor.${situasjon}.label`);
        default:
            return getMessage(intl, 'situasjonskjema.fornavn.label');
    }
};

const getFarMedmorLabel = (situasjon: ForeldreparSituasjon, intl: InjectedIntl): string => {
    switch (situasjon) {
        case ForeldreparSituasjon.farOgFar:
        case ForeldreparSituasjon.farOgMor:
        case ForeldreparSituasjon.morOgMedmor:
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
        situasjon === ForeldreparSituasjon.bareMor ||
        (situasjon === ForeldreparSituasjon.aleneomsorg && forelderVedAleneomsorg === Forelder.mor);
    const visFarInput =
        toForeldre ||
        situasjon === ForeldreparSituasjon.bareFar ||
        (situasjon === ForeldreparSituasjon.aleneomsorg && forelderVedAleneomsorg === Forelder.farMedmor);
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
