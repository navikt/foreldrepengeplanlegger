import * as React from 'react';
import { ForeldreparSituasjon } from '../../../../types';
import Situasjonsvalg from './Situasjonsvalg';

export interface Props {
    valgtSituasjon?: ForeldreparSituasjon;
    onChange: (situasjon: ForeldreparSituasjon) => void;
}

const situasjoner: ForeldreparSituasjon[] = [
    ForeldreparSituasjon.farOgMor,
    ForeldreparSituasjon.bareMor,
    ForeldreparSituasjon.bareFar,
    ForeldreparSituasjon.aleneomsorg,
    ForeldreparSituasjon.morOgMedmor,
    ForeldreparSituasjon.farOgFar
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
