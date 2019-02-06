import * as React from 'react';
import { Row, Column } from 'nav-frontend-grid';
import { Input } from 'nav-frontend-skjema';
import { Situasjon } from '../../../types';
import { getAntallForeldreISituasjon } from '../../../utils/common';

interface Props {
    situasjon: Situasjon;
    navnFarMedmor?: string;
    navnMor?: string;
    onChangeFarMedmor: (navn: string) => void;
    onChangeMor: (navn: string) => void;
}

const getFarMedmorLabel = (situasjon: Situasjon): string => {
    switch (situasjon) {
        case Situasjon.farOgFar:
        case Situasjon.farOgMor:
            return 'Fornavn far';
        case Situasjon.morOgMedmor:
            return 'Fornavn mor';
        default:
            return 'Fornavn';
    }
};

const getMorLabel = (situasjon: Situasjon): string => {
    switch (situasjon) {
        case Situasjon.farOgFar:
            return 'Fornavn mor';
        case Situasjon.farOgMor:
            return 'Fornavn mor';
        case Situasjon.morOgMedmor:
            return 'Fornavn medmor';
        default:
            return 'Fornavn';
    }
};

const VelgForeldrenavn: React.StatelessComponent<Props> = ({
    situasjon,
    navnFarMedmor = '',
    navnMor = '',
    onChangeFarMedmor,
    onChangeMor
}) => {
    const toForeldre = getAntallForeldreISituasjon(situasjon) === 2;
    return (
        <Row>
            <Column xs="6">
                <Input
                    label={getMorLabel(situasjon)}
                    value={navnMor}
                    name="navnMor"
                    onChange={(evt: React.ChangeEvent<HTMLInputElement>) => onChangeMor(evt.target.value)}
                />
            </Column>
            {toForeldre && (
                <Column xs="6">
                    <Input
                        label={getFarMedmorLabel(situasjon)}
                        value={navnFarMedmor}
                        name="navnFarMedmor"
                        onChange={(evt: React.ChangeEvent<HTMLInputElement>) => onChangeFarMedmor(evt.target.value)}
                    />
                </Column>
            )}
        </Row>
    );
};

export default VelgForeldrenavn;
