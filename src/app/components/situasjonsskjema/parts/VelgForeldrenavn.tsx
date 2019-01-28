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

const VelgForeldrenavn: React.StatelessComponent<Props> = ({
    situasjon,
    navnForelder1,
    navnForelder2,
    onChangeForelder1,
    onChangeForelder2
}) => {
    const toForeldre = getAntallForeldreISituasjon(situasjon) === 2;
    return (
        <Row>
            <Column xs="6">
                <Input
                    label="Far"
                    value={navnForelder1}
                    name="navnForelder1"
                    onChange={(evt: React.ChangeEvent<HTMLInputElement>) => onChangeForelder1(evt.target.value)}
                />
            </Column>
            {toForeldre && (
                <Column xs="6">
                    <Input
                        label="Mor"
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
