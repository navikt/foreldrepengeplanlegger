import * as React from 'react';
import './focusContainer.less';

interface Props {
    active: boolean;
    onClick?: () => void;
    children: React.ReactNode;
}

const FocusContainer: React.StatelessComponent<Props> = ({ active, onClick, children }) => {
    if (active !== true) {
        return <>{children}</>;
    }
    return (
        <div className="focusContainer" onClick={onClick ? () => onClick() : undefined} tabIndex={-1}>
            {children}
        </div>
    );
};
export default FocusContainer;
