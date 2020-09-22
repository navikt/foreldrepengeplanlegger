import * as React from 'react';
import BEMHelper from 'common/util/bem';

import './ikonLabel.less';

interface Props {
    ikon: React.ReactNode;
    children: React.ReactNode;
    placement?: 'top' | 'right' | 'left';
}

const bem = BEMHelper('ikonLabel');

const IkonLabel: React.FunctionComponent<Props> = ({ ikon, placement = 'top', children }) => (
    <span className={bem.classNames(bem.block, bem.modifier(placement))}>
        <span className={bem.element('ikon')} aria-hidden={true} role="presentation">
            {ikon}
        </span>
        <span className={bem.element('label')}>{children}</span>
    </span>
);

export default IkonLabel;
