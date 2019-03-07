import * as React from 'react';
import Foreldrepar from 'common/components/foreldrepar/Foreldrepar';
import { Situasjon, ForeldreparIllustrasjonsvariant } from '../../types';
import { getSituasjonForelderSvg } from 'common/components/foreldrepar/foreldreparUtils';

interface Props {
    situasjon: Situasjon;
    variant?: ForeldreparIllustrasjonsvariant;
}

const SituasjonForeldrepar: React.StatelessComponent<Props> = ({ situasjon, variant }) => {
    const info = getSituasjonForelderSvg(situasjon);
    return <Foreldrepar firstParent={info.mor} secondParent={info.farMedmor} variant={variant || info.variant} />;
};

export default SituasjonForeldrepar;
