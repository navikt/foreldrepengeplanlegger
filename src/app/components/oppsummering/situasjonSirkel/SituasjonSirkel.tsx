import * as React from 'react';
import BEMHelper from 'common/utils/bem';
import { Situasjon, Forelder } from '../../../types';
import Sirkelmaske from '../../sirkelmaske/Sirkelmaske';
import SituasjonForeldrepar from '../../situasjonForeldrepar/SituasjonForeldrepar';

import './situasjonSirkel.less';

interface Props {
    situasjon: Situasjon;
    valgtForelder?: Forelder;
}

const bem = BEMHelper('situasjonSirkel');

const SituasjonSirkel: React.StatelessComponent<Props> = ({ situasjon, valgtForelder }) => {
    return (
        <div className={bem.block}>
            <div className={bem.element('ikon')}>
                <Sirkelmaske diameter="5rem">
                    <SituasjonForeldrepar situasjon={situasjon} kompakt={true} valgtForelder={valgtForelder} />
                </Sirkelmaske>
            </div>
        </div>
    );
};

export default SituasjonSirkel;
