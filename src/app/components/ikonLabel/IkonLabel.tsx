import * as React from 'react';
import BEMHelper from 'common/utils/bem';

import './ikonLabel.less';

interface Props {
    ikon: React.ReactNode;
    children: React.ReactNode;
    placement?: 'top' | 'right' | 'left';
}

const bem = BEMHelper('ikonLabel');

const IkonLabel: React.StatelessComponent<Props> = ({ ikon, placement = 'top', children }) => (
    <div className={bem.classNames(bem.block, bem.modifier(placement))}>
        <div className={bem.element('ikon')} aria-hidden={true} role="presentation">
            {ikon}
        </div>
        <div className={bem.element('label')}>{children}</div>
    </div>
);

export default IkonLabel;
