import React, { CSSProperties } from 'react';
import BEMHelper from 'common/utils/bem';
import { UttaksplanHexFarge } from 'common/utils/colors';

import './sirkelmaske.less';

interface Props {
    farge?: UttaksplanHexFarge;
    diameter: string;
}

const bem = BEMHelper('sirkelmaske');

const Sirkelmaske: React.StatelessComponent<Props> = ({ farge, diameter, children }) => {
    const style: Partial<CSSProperties> = {
        backgroundColor: farge
    };
    if (diameter) {
        style.width = diameter;
        style.height = diameter;
    }
    return (
        <div className={bem.block} style={style}>
            <div className={bem.element('content')}>{children}</div>
        </div>
    );
};

export default Sirkelmaske;
