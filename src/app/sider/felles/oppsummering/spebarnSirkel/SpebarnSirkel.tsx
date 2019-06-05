import * as React from 'react';
import BEMHelper from 'common/util/bem';
import Sirkelmaske from '../../../../components/sirkelmaske/Sirkelmaske';
import SpebarnIkon from 'common/components/ikoner/SpebarnIkon';

import './spebarnSirkel.less';

interface Props {
    diameter?: string;
}

const SpebarnSirkel: React.StatelessComponent<Props> = (props) => {
    const bem = BEMHelper('spebarnSirkel');
    return (
        <div className={bem.block}>
            <div className={bem.element('ikon')}>
                <Sirkelmaske diameter="5rem">
                    <div className={bem.element('svg')}>
                        <SpebarnIkon size={42} />
                    </div>
                </Sirkelmaske>
            </div>
        </div>
    );
};

export default SpebarnSirkel;
