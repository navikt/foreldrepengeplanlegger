import * as React from 'react';
import { Row, Column } from 'nav-frontend-grid';
import { Input } from 'nav-frontend-skjema';
import { Situasjon } from '../../../types';
import { getAntallForeldreISituasjon } from '../../../utils/common';

interface Props {
    situasjon: Situasjon;
    navnForelder1?: string;
    navnForelder2?: string;
    onChangeForelder1: (navn: string) => void;
    onChangeForelder2: (navn: string) => void;
}

const getForelder1Label = (situasjon: Situasjon): string => {
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

const getForelder2Label = (situasjon: Situasjon): string => {
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
    navnForelder1 = '',
    navnForelder2 = '',
    onChangeForelder1,
    onChangeForelder2
}) => {
    const toForeldre = getAntallForeldreISituasjon(situasjon) === 2;
    return (
        <Row>
            <Column xs="6">
                <Input
                    label={getForelder1Label(situasjon)}
                    value={navnForelder1}
                    name="navnForelder1"
                    onChange={(evt: React.ChangeEvent<HTMLInputElement>) => onChangeForelder1(evt.target.value)}
                />
            </Column>
            {toForeldre && (
                <Column xs="6">
                    <Input
                        label={getForelder2Label(situasjon)}
                        value={navnForelder2}
                        name="navnForelder2"
                        onChange={(evt: React.ChangeEvent<HTMLInputElement>) => onChangeForelder2(evt.target.value)}
                    />
                </Column>
            )}
        </Row>
    );
};

export default VelgForeldrenavn;
