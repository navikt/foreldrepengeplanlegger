import * as React from 'react';
import Foreldrepar from 'common/components/foreldrepar/Foreldrepar';
import { Situasjon, Forelder } from '../../types';
import { getSituasjonForelderSvg } from 'common/components/foreldrepar/foreldreparUtils';
import { getAntallForeldreISituasjon } from '../../utils/common';

interface Props {
    situasjon: Situasjon;
    kompakt?: boolean;
    valgtForelder?: Forelder;
}

const SituasjonForeldrepar: React.StatelessComponent<Props> = ({ situasjon, valgtForelder, kompakt }) => {
    const info = getSituasjonForelderSvg(situasjon);
    if (getAntallForeldreISituasjon(situasjon) === 1 && valgtForelder) {
        return <Foreldrepar forelder1={valgtForelder === Forelder.mor ? info.mor : info.farMedmor} />;
    }
    return <Foreldrepar forelder1={info.mor} forelder2={info.farMedmor} variant={info.variant} kompakt={kompakt} />;
};

export default SituasjonForeldrepar;
