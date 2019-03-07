import * as React from 'react';
import BEMHelper from 'common/utils/bem';
import { Situasjon } from '../../../types';
import Sirkelmaske from '../../oppsummeringBlokk/Sirkelmaske';
import SituasjonForeldrepar from '../../situasjonForeldrepar/SituasjonForeldrepar';

import './situasjonSirkel.less';

interface Props {
    situasjon: Situasjon;
}

const bem = BEMHelper('situasjonSirkel');

const SituasjonSirkel: React.StatelessComponent<Props> = ({ situasjon }) => {
    return (
        <div className={bem.block}>
            <div className={bem.element('ikon')}>
                <Sirkelmaske diameter="5rem">
                    <SituasjonForeldrepar situasjon={situasjon} variant="foreldreNærmere" />
                </Sirkelmaske>
            </div>
        </div>
    );
};

export default SituasjonSirkel;
