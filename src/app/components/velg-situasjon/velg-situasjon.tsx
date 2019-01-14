import * as React from 'react';
import Situasjonsvalg from './Situasjonsvalg';
import { Situasjon } from '../../types';
import { SkjemaGruppe } from 'nav-frontend-skjema';

export interface Props {
    valgtSituasjon?: Situasjon;
    onChange: (situasjon: Situasjon) => void;
}

const situasjoner: Situasjon[] = [
    Situasjon.farOgMor,
    Situasjon.bareFar,
    Situasjon.bareMor,
    Situasjon.aleneomsorg,
    Situasjon.morOgMedmor,
    Situasjon.farOgFar
];

const VelgSituasjon: React.StatelessComponent<Props> = ({ valgtSituasjon, onChange }) => (
    <>
        <SkjemaGruppe>
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
        </SkjemaGruppe>
        Når begge foreldrene har rett til foreldrepenger består foreldrepengeperioden av mødrekvoten, fedrekvoten og en
        fellesperiode som dere kan dele.
    </>
);

export default VelgSituasjon;
