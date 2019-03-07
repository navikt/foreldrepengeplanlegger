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
    centerBar?: BarProps;
}

const bem = BEMHelper('multibar');

const getBarStyle = ({ width, color }: BarProps): React.CSSProperties => {
    return {
        width: `${width}%`,
        backgroundColor: color
    };
};

const Multibar: React.StatelessComponent<Props> = ({ leftBar, rightBar, centerBar, borderColor }) => {
    const backgroundStyle: React.CSSProperties = {
        borderColor
    };

    return (
        <div className={bem.block}>
            <div className={bem.element('bars')}>
                {leftBar && leftBar.width > 0 && (
                    <div className={bem.element('bar', 'left')} style={getBarStyle(leftBar)} />
                )}
                {centerBar && (
                    <div
                        className={bem.element('bar', 'center')}
                        style={{ ...getBarStyle(centerBar), left: leftBar ? `${leftBar.width}%` : undefined }}
                    />
                )}
                {rightBar && rightBar.width > 0 && (
                    <div className={bem.element('bar', 'right')} style={getBarStyle(rightBar)} />
                )}
            </div>
            <div className={bem.element('background')} style={backgroundStyle} />
        </div>
    );
};

export default Multibar;
