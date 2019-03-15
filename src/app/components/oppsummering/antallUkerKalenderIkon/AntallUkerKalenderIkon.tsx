import * as React from 'react';
import KalenderBakgrunnIkon from 'common/components/ikoner/KalenderBakgrunnIkon';

import './antallUkerKalenderIkon.less';
import BEMHelper from 'common/utils/bem';

interface Props {
    uker: number;
}

const bem = BEMHelper('antallUkerKalenderIkon');

const AntallUkerKalenderIkon: React.StatelessComponent<Props> = ({ uker }) => (
    <div className={bem.classNames(bem.block, bem.modifierConditional('over99', uker > 99))}>
        <div className={bem.element('ikon')}>
            <KalenderBakgrunnIkon />
        </div>
        <div className={bem.element('uker')}>{uker}</div>
    </div>
);

export default AntallUkerKalenderIkon;
