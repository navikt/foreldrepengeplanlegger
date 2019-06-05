import * as React from 'react';
import classNames from 'classnames';
import BEMHelper from 'common/util/bem';

import './knapperad.less';

export interface Props {
    children: React.ReactNode;
    align?: 'left' | 'right' | 'center';
    style?: 'normal' | 'mobile-50-50';
}

const bem = BEMHelper('knapperad');

const Knapperad: React.StatelessComponent<Props> = ({ children, align = 'center', style = 'normal' }) => {
    const cls = classNames(bem.block, `${bem.modifier(align)}`, `${bem.modifier(style)}`);
    return (
        <div className={cls}>
            {React.Children.map(children, (knapp, index) => (
                <span key={index} className={bem.element('knapp')}>
                    {knapp}
                </span>
            ))}
        </div>
    );
};

export default Knapperad;
