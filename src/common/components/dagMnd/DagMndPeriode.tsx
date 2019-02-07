import * as React from 'react';
import BEMHelper from 'common/utils/bem';

import './dagMndPeriode.less';
import DagMnd from 'common/components/dagMnd/DagMnd';

interface Props {
    fom: Date;
    tom: Date;
}

const bem = BEMHelper('dagMndPeriode');

const DagMndPeriode: React.StatelessComponent<Props> = ({ fom, tom }) => {
    return (
        <div className={bem.block}>
            <div className={bem.element('dato')}>
                <DagMnd dato={fom} />
            </div>
            <span className="separator">-</span>
            <div className={bem.element('dato')}>
                <DagMnd dato={tom} />
            </div>
        </div>
    );
};

export default DagMndPeriode;
