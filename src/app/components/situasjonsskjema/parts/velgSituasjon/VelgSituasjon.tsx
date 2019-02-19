import * as React from 'react';
import { Situasjon } from '../../../../types';
import Situasjonsvalg from './Situasjonsvalg';

export interface Props {
    valgtSituasjon?: Situasjon;
    onChange: (situasjon: Situasjon) => void;
}

const situasjoner: Situasjon[] = [
    Situasjon.farOgMor,
    Situasjon.bareMor,
    Situasjon.bareFar,
    Situasjon.aleneomsorg,
    Situasjon.morOgMedmor,
    Situasjon.farOgFar
];

const VelgSituasjon: React.StatelessComponent<Props> = ({ valgtSituasjon, onChange }) => (
    <>
        <div className="situasjonsvalgGruppe">
            {situasjoner.map((situasjon) => (
                <Situasjonsvalg
                    key={situasjon}
                    situasjon={situasjon}
                    checked={situasjon === valgtSituasjon}
                    onChange={() => onChange(situasjon)}
                />
            ))}
        </div>
    </>
);

export default VelgSituasjon;
