import * as React from 'react';
import classNames from 'classnames';
import { UttaksplanFarge } from '../../types';
import BEMHelper from 'common/utils/bem';

import './iconBox.less';

export interface Props {
    color: UttaksplanFarge;
    stripes?: boolean;
}

const BEM = BEMHelper('iconBox');

const IconBox: React.StatelessComponent<Props> = ({ children, color, stripes }) => (
    <div className={classNames(BEM.block, BEM.modifier(`${color}${stripes ? '--striped' : ''}`))}>{children}</div>
);

export default IconBox;
