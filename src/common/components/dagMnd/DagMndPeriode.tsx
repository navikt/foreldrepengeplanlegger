import * as React from 'react';
import BEMHelper from 'common/util/bem';

import './dagMndPeriode.less';
import DagMnd from 'common/components/dagMnd/DagMnd';
import HighlightContent from 'common/components/highlightContent/HighlightContent';

interface Props {
    fom: Date;
    tom: Date;
}

const bem = BEMHelper('dagMndPeriode');

const DagMndPeriode: React.StatelessComponent<Props> = ({ fom, tom }) => {
    return (
        <div className={bem.block}>
            <div className={bem.element('dato')}>
                <HighlightContent watchValue={fom}>
                    <DagMnd dato={fom} />
                </HighlightContent>
            </div>
            <span className="separator">-</span>
            <div className={bem.element('dato')}>
                <HighlightContent watchValue={tom}>
                    <DagMnd dato={tom} />
                </HighlightContent>
            </div>
        </div>
    );
};

export default DagMndPeriode;
