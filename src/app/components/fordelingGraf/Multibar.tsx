import * as React from 'react';
import BEMHelper from 'common/utils/bem';

import './multibar.less';

interface BarProps {
    width: number;
    color: string;
}

interface Props {
    borderColor: string;
    leftBar?: BarProps;
    rightBar?: BarProps;
    overflowBar?: BarProps;
}

const bem = BEMHelper('multibar');

const getBarStyle = ({ width, color }: BarProps): React.CSSProperties => {
    return {
        width: `${width}%`,
        backgroundColor: color
    };
};

const Multibar: React.StatelessComponent<Props> = ({ leftBar, rightBar, overflowBar, borderColor }) => {
    const style: React.CSSProperties = {
        borderColor
    };

    return (
        <div className={bem.block}>
            {leftBar && <div className={bem.element('bar', 'left')} style={getBarStyle(leftBar)} />}
            {overflowBar && (
                <div
                    className={bem.element('bar', 'overflow')}
                    style={{ ...getBarStyle(overflowBar), left: leftBar ? `${leftBar.width}%` : undefined }}
                />
            )}
            {rightBar && <div className={bem.element('bar', 'right')} style={getBarStyle(rightBar)} />}
            <div className={bem.element('background')} style={style} />
        </div>
    );
};

export default Multibar;
