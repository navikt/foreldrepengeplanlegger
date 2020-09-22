import * as React from 'react';
import classNames from 'classnames';
import BEMHelper from 'common/util/bem';

import './linkButton.less';

export interface LinkButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    color?: 'default' | 'white' | 'red';
}

const bem = BEMHelper('linkButton');

const LinkButton: React.FunctionComponent<LinkButtonProps> = (props) => {
    const { className, color, ...rest } = props;
    return (
        <button
            type="button"
            className={classNames(bem.block, className, color ? `linkButton--${color}` : undefined)}
            {...rest}
        />
    );
};
export default LinkButton;
