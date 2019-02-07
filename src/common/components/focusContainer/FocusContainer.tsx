import * as React from 'react';
import './focusContainer.less';

interface Props {
    active: boolean;
    onClick?: () => void;
    children: React.ReactNode;
}

const FocusContainer: React.StatelessComponent<Props> = ({ active, onClick, children }) => {
    if (active !== true || onClick === undefined) {
        return <>{children}</>;
    }
    return (
        <div className="focusContainer" onClick={() => onClick()} tabIndex={-1}>
            {children}
        </div>
    );
};
export default FocusContainer;
