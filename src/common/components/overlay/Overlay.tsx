import React from 'react';
import classNames from 'classnames';
import BEMHelper from 'common/utils/bem';

export interface OverlayProps {
    active: boolean;
    inline?: boolean;
    onClick?: (evt: MouseEvent) => void;
}

import './overlay.less';

const bem = BEMHelper('overlay');

class Overlay extends React.Component<OverlayProps, {}> {
    constructor(props: OverlayProps) {
        super(props);
        this.stopClickEvent = this.stopClickEvent.bind(this);
    }

    stopClickEvent(evt: any) {
        evt.stopPropagation();
        evt.preventDefault();
        if (this.props.onClick) {
            this.props.onClick(evt);
        }
    }

    render() {
        if (!this.props.active) {
            return null;
        }
        const className = classNames(bem.block, bem.modifier('active'), {
            [bem.modifier('inline')]: this.props.inline,
            [bem.modifier('transparent')]: this.props.inline
        });
        return <div className={className} onClick={this.stopClickEvent} />;
    }
}

export default Overlay;
