import * as React from 'react';
import BEMHelper from 'common/utils/bem';
import Sirkelmaske from '../../sirkelmaske/Sirkelmaske';
import AntallUkerKalenderIkon from '../antallUkerKalenderIkon/AntallUkerKalenderIkon';

import './ukerSirkel.less';

interface Props {
    uker: number;
}

const UkerSirkel: React.StatelessComponent<Props> = ({ uker }) => {
    const bem = BEMHelper('ukerSirkel');
    return (
        <div className={bem.block}>
            <div className={bem.element('ikon')}>
                <Sirkelmaske diameter="5rem">
                    <AntallUkerKalenderIkon uker={uker} />
                    {/* <div className={bem.element('uker')}>{uker}</div> */}
                </Sirkelmaske>
            </div>
        </div>
    );
};

export default UkerSirkel;
