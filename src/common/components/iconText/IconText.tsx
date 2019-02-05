import * as React from 'react';
import classNames from 'classnames';
import BEMHelper from 'common/utils/bem';
import AriaText from 'common/components/aria/AriaText';

import './iconText.less';

interface Props {
    icon?: React.ReactNode;
    iconOnly?: boolean;
    layout?: 'horizontal' | 'vertical';
    children: React.ReactNode;
}

const bem = BEMHelper('iconText');

const IconText: React.StatelessComponent<Props> = ({ icon, iconOnly, layout = 'horizontal', children }) => (
    <div className={classNames(bem.block, bem.modifier(layout), { [`${bem.block}--iconOnly`]: iconOnly })}>
        {icon && <span className={bem.element('icon')}>{icon}</span>}
        {iconOnly ? <AriaText>{children}</AriaText> : <span className={bem.element('text')}>{children}</span>}
    </div>
);

export default IconText;
