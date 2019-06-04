import React, { Component } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';

interface OwnProps {
    children: React.ReactNode;
}
type Props = OwnProps & RouteComponentProps;

class ScrollToTop extends Component<Props> {
    componentDidUpdate(prevProps: Props) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            window.scrollTo(0, 0);
        }
    }
    render() {
        return this.props.children;
    }
}

export default withRouter(ScrollToTop);
