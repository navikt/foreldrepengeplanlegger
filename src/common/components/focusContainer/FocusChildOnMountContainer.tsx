import * as React from 'react';
import ReactDOM from 'react-dom';
import { focusFirstElement } from 'app/utils/focusUtils';

interface Props {
    active: boolean;
    children: React.ReactNode;
}

class FocusChildOnMountContainer extends React.Component<Props, {}> {
    componentDidMount() {
        if (this.props.active) {
            const el = ReactDOM.findDOMNode(this);
            if (el) {
                focusFirstElement(el as Element);
            }
        }
    }
    render() {
        return <>{this.props.children}</>;
    }
}
export default FocusChildOnMountContainer;
