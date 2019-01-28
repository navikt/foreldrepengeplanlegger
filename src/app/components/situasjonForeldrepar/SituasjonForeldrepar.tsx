import * as React from 'react';
import Foreldrepar from 'common/components/foreldrepar/Foreldrepar';
import { Situasjon } from '../../types';

interface Props {
    situasjon: Situasjon;
}

const SituasjonForeldrepar: React.StatelessComponent<Props> = ({ situasjon }) => {
    switch (situasjon) {
        case Situasjon.farOgMor:
            return <Foreldrepar firstParent="far1" secondParent="mor1" />;
        case Situasjon.bareFar:
            return <Foreldrepar firstParent="far1" secondParent="mor1" variant="andreForelderHalvtSynlig" />;
        case Situasjon.bareMor:
            return <Foreldrepar firstParent="far1" secondParent="mor1" variant="førsteForelderHalvtSynlig" />;
        case Situasjon.aleneomsorg:
            return <Foreldrepar firstParent="far2" secondParent="mor2" variant="foreldreSeparert" />;
        case Situasjon.morOgMedmor:
            return <Foreldrepar firstParent="medmor1" secondParent="medmor2" />;
        case Situasjon.farOgFar:
            return <Foreldrepar firstParent="far4" secondParent="far3" />;
    }
};

export default SituasjonForeldrepar;
