import React, { CSSProperties } from 'react';
import BEMHelper from 'common/util/bem';
import { UttaksplanHexFarge } from 'common/util/colors';

import './sirkelmaske.less';

interface Props {
    aktiv?: boolean;
    farge?: UttaksplanHexFarge;
    diameter: string;
}

const bem = BEMHelper('sirkelmaske');

const Sirkelmaske: React.FunctionComponent<Props> = ({ farge, diameter, aktiv = true, children }) => {
    const style: Partial<CSSProperties> = {
        backgroundColor: farge,
    };
    if (diameter) {
        style.width = diameter;
        style.height = diameter;
    }
    return (
        <div className={bem.classNames(bem.block, bem.modifierConditional('inaktiv', aktiv === false))} style={style}>
            <div className={bem.element('content')}>{children}</div>
        </div>
    );
};

export default Sirkelmaske;
