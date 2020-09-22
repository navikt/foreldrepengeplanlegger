import * as React from 'react';
import Foreldrepar from 'shared/components/foreldrepar/Foreldrepar';
import { getSituasjonForelderSvg, getAntallForeldreISituasjon } from 'shared/components/foreldrepar/foreldreparUtils';
import { ForeldreparSituasjon } from 'shared/types';
import { Forelder } from 'common/types';

interface Props {
    situasjon: ForeldreparSituasjon;
    kompakt?: boolean;
    valgtForelder?: Forelder;
}

const SituasjonForeldrepar: React.FunctionComponent<Props> = ({ situasjon, valgtForelder, kompakt }) => {
    const info = getSituasjonForelderSvg(situasjon);
    if (getAntallForeldreISituasjon(situasjon) === 1 && valgtForelder) {
        return <Foreldrepar forelder1={valgtForelder === Forelder.mor ? info.mor : info.farMedmor} />;
    }
    return <Foreldrepar forelder1={info.mor} forelder2={info.farMedmor} variant={info.variant} kompakt={kompakt} />;
};

export default SituasjonForeldrepar;
