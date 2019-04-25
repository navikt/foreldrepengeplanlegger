import * as React from 'react';

export interface ContainerBlurEvent {
    source: 'esc' | 'blur';
}

export function contains(node: HTMLElement, child: Element) {
    return node === child || node.contains(child);
}

export interface Props extends React.Props<any> {
    onKeyDown?: (evt: React.KeyboardEvent<any>) => void;
    onBlur?: (evt: React.FocusEvent<any> | { source: string }) => void;
    onFocus?: (evt: React.FocusEvent<any>) => void;
    active?: boolean;
    className?: string;
    tabIndex?: number;
}

class DomEventContainer extends React.Component<Props, {}> {
    domElement: HTMLDivElement | null;
    ignoreDocumentClick: boolean;

    constructor(props: Props) {
        super(props);
        this.handleBlur = this.handleBlur.bind(this);
        this.startEventListening = this.startEventListening.bind(this);
        this.stopEventListening = this.stopEventListening.bind(this);
        this.handleDocumentKeyDown = this.handleDocumentKeyDown.bind(this);
        this.handleInternalDocumentKeyDown = this.handleInternalDocumentKeyDown.bind(this);
        if (props.active) {
            this.startEventListening();
        }
    }

    componentWillReceiveProps(nextProps: Props) {
        if (!this.props.active && nextProps.active) {
            this.startEventListening();
        } else {
            this.stopEventListening();
        }
    }

    componentWillUnmount() {
        this.stopEventListening();
    }

    handleBlur(evt: React.FocusEvent<any>) {
        if (!this.domElement) {
            return;
        }
        setTimeout(() => {
            if (this.domElement && window.document.activeElement) {
                const isChildElement = contains(this.domElement, window.document.activeElement);
                if (!isChildElement) {
                    this.blur('blur');
                }
            }
        }, 0);
    }

    blur(source: string) {
        if (this.props.onBlur) {
            this.props.onBlur({
                source
            });
        }
    }

    handleDocumentKeyDown(evt: KeyboardEvent) {
        if (evt.keyCode === 27) {
            this.blur('esc');
        }
    }

    handleInternalDocumentKeyDown(evt: React.KeyboardEvent<any>) {
        if (this.props.onKeyDown) {
            this.props.onKeyDown(evt);
        }
    }

    startEventListening() {
        window.addEventListener('keydown', this.handleDocumentKeyDown);
    }

    stopEventListening() {
        window.removeEventListener('keydown', this.handleDocumentKeyDown);
    }

    render() {
        /** Fjerner props som ikke er gyldige på div */
        const { active: deletedActive, onBlur: deletedOnBlur, children, ...propsRest } = this.props;

        return (
            <div
                ref={(c) => (this.domElement = c)}
                {...propsRest}
                onBlur={this.handleBlur}
                onKeyDown={this.handleInternalDocumentKeyDown}
                tabIndex={this.props.tabIndex}>
                {this.props.children}
            </div>
        );
    }
}

export default DomEventContainer;
