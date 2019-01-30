import * as React from 'react';
import Foreldrepar from 'common/components/foreldrepar/Foreldrepar';
import { Situasjon } from '../../types';
import { getSituasjonForelderSvg } from 'common/components/foreldrepar/foreldreparUtils';

interface Props {
    situasjon: Situasjon;
}

const SituasjonForeldrepar: React.StatelessComponent<Props> = ({ situasjon }) => {
    const info = getSituasjonForelderSvg(situasjon);
    return <Foreldrepar firstParent={info.forelder1} secondParent={info.forelder2} variant={info.variant} />;
};

export default SituasjonForeldrepar;
