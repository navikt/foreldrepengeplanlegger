import * as React from 'react';
import classNames from 'classnames';
import BEMHelper from 'common/util/bem';
import AriaText from 'common/components/aria/AriaText';

import './iconText.less';

interface Props {
    icon?: React.ReactNode;
    iconOnly?: boolean;
    layout?: 'horizontal' | 'vertical';
    align?: 'left' | 'right' | 'center';
    fullWidth?: boolean;
    children: React.ReactNode;
}

const bem = BEMHelper('iconText');

const IconText: React.FunctionComponent<Props> = ({
    icon,
    iconOnly,
    align = 'left',
    layout = 'horizontal',
    fullWidth,
    children,
}) => (
    <div
        className={classNames(bem.block, bem.modifier(layout), bem.modifier(align), {
            [`${bem.modifier('iconOnly')}`]: iconOnly,
            [`${bem.modifier('fullWidth')}`]: fullWidth,
        })}>
        {icon && <div className={bem.element('icon')}>{icon}</div>}
        {iconOnly ? <AriaText>{children}</AriaText> : <div className={bem.element('text')}>{children}</div>}
    </div>
);

export default IconText;
