import * as React from 'react';
import classNames from 'classnames';
import BEMHelper from 'common/utils/bem';
import Spinner from 'nav-frontend-spinner';
import Overlay from '../overlay/Overlay';

interface Props {
    loading?: boolean;
    overlay?: boolean;
    children: React.ReactNode;
}

import './loadContainer.less';

const bem = BEMHelper('loadContainer');

const LoadContainer: React.StatelessComponent<Props> = ({ loading, overlay, children }) => {
    if (loading !== true) {
        return <>{children}</>;
    }
    if (overlay) {
        return (
            <div className={classNames(bem.block, { [bem.modifier('overlay')]: overlay })}>
                <div className={bem.element('content')}>{children}</div>
                <Overlay active={true} />
                <div className={bem.element('spinner')}>
                    <Spinner type="XXL" />
                </div>
            </div>
        );
    }
    return (
        <div className={bem.block}>
            <Spinner className={bem.element('spinner')} type="L" negativ={true} />
        </div>
    );
};

export default LoadContainer;
