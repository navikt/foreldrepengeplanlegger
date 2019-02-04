import * as React from 'react';
import StepperKnapp from 'common/components/stepperKnapp/StepperKnapp';
import BEMHelper from 'common/utils/bem';

import './numberStepper.less';

export interface Props {
    value?: number;
    stepSize?: number;
    max?: number;
    min?: number;
    placeholder?: string;
    disabled?: boolean;
    onChange: (value: number | undefined) => void;
}

interface State {
    value: number | undefined;
}

const bem = BEMHelper('numberStepper');

const decreaseValue = (value: number | undefined, stepSize: number = 1): number => {
    if (value === undefined) {
        return 0;
    }
    if (stepSize > 1) {
        const stepOffset = value % stepSize;
        if (stepOffset > 0) {
            return value - stepOffset;
        }
    }
    return value - stepSize;
};

const increaseValue = (value: number | undefined, stepSize: number = 1): number => {
    if (value === undefined) {
        return 0;
    }
    if (stepSize > 1) {
        const stepOffset = value % stepSize;
        if (stepOffset > 0) {
            return value + (stepSize - stepOffset);
        }
    }
    return value + stepSize;
};

const getChangeValue = (value: string, min: number | undefined, max: number | undefined): number | undefined => {
    const val = parseInt(value, 10);
    if (min && val < min) {
        return min;
    }
    if (max && val > max) {
        return max;
    }
    return val;
};

class NumberStepper extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            value: props.value
        };
        this.updateValue = this.updateValue.bind(this);
    }
    componentWillReceiveProps({ value }: Props) {
        this.setState({ value });
    }

    updateValue(value: number | undefined) {
        this.setState({ value });
    }

    render() {
        const { value } = this.state;
        const { min, max, stepSize = 1, onChange, placeholder, disabled } = this.props;
        const canDecrease = min === undefined || (value !== undefined && value > min) || value === undefined;
        const canIncrease = max === undefined || (value !== undefined && value < max) || value === undefined;
        return (
            <div className={bem.block}>
                <div className={bem.element('decrease')}>
                    <StepperKnapp
                        direction="previous"
                        disabled={disabled || canDecrease === false}
                        onClick={() => onChange(decreaseValue(value, stepSize))}
                        label="decrease"
                    />
                </div>
                <div className={bem.element('input')}>
                    <input
                        className="skjemaelement__input input--fullbredde"
                        aria-label="Verdi"
                        type="number"
                        value={value || ''}
                        placeholder={placeholder}
                        disabled={disabled}
                        onChange={(evt) => this.updateValue(getChangeValue(evt.target.value, min, max))}
                        onBlur={() => onChange(this.state.value)}
                    />
                </div>
                <div className={bem.element('increase')}>
                    <StepperKnapp
                        direction="next"
                        disabled={disabled || canIncrease === false}
                        onClick={() => onChange(increaseValue(value, stepSize))}
                        label="increase"
                    />
                </div>
            </div>
        );
    }
}
export default NumberStepper;
