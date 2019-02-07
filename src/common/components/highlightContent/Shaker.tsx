import * as React from 'react';
import { CSSTransition } from 'react-transition-group';

import './shaker.less';

interface Props {
    value: string | number;
}

interface State {
    active: boolean;
}

const DURATION = 400;

class Shaker extends React.Component<Props, State> {
    timeoutId: number | undefined;
    constructor(props: Props) {
        super(props);
        this.state = {
            active: false
        };
        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.shake = this.shake.bind(this);
    }
    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.value !== this.props.value) {
            this.start();
        }
    }
    componentWillUnmount() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
    }
    start() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
        this.setState({ active: true });
        this.timeoutId = window.setTimeout(this.stop, 500);
    }
    stop() {
        this.setState({ active: false });
        this.timeoutId = undefined;
    }
    shake() {
        this.start();
    }
    render() {
        const { children } = this.props;
        return (
            <CSSTransition in={this.state.active} classNames="shake" timeout={DURATION}>
                {children}
            </CSSTransition>
        );
    }
}
export default Shaker;
