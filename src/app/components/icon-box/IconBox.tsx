import * as React from 'react';
import classnames from 'classnames';
import { UttaksplanColor } from '../../types';
import BEMHelper from 'common/utils/bem';

import './iconBox.less';

export interface Props {
    color: UttaksplanColor;
    stripes?: boolean;
}

const BEM = BEMHelper('iconBox');

const IconBox: React.StatelessComponent<Props> = ({ children, color, stripes }) => (
    <div className={classnames(BEM.block, BEM.modifier(`${color}${stripes ? '--striped' : ''}`))}>{children}</div>
);

export default IconBox;
