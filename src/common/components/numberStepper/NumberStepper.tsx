import * as React from 'react';
import StepperKnapp from 'common/components/stepperKnapp/StepperKnapp';
import BEMHelper from 'common/utils/bem';

import './numberStepper.less';

export interface Props {
    value?: number;
    stepSize?: number;
    max?: number;
    min?: number;
    onChange: (value: number | undefined) => void;
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

const NumberStepper: React.StatelessComponent<Props> = ({ value, min, max, stepSize = 1, onChange }) => {
    const canDecrease = min === undefined || (value !== undefined && value > min) || value === undefined;
    const canIncrease = max === undefined || (value !== undefined && value < max) || value === undefined;
    return (
        <div className={bem.block}>
            <div className={bem.element('decrease')}>
                <StepperKnapp
                    direction="previous"
                    disabled={canDecrease === false}
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
                    onChange={(evt) =>
                        evt.target.value !== '' ? onChange(getChangeValue(evt.target.value, min, max)) : undefined
                    }
                />
            </div>
            <div className={bem.element('increase')}>
                <StepperKnapp
                    direction="next"
                    disabled={canIncrease === false}
                    onClick={() => onChange(increaseValue(value, stepSize))}
                    label="increase"
                />
            </div>
        </div>
    );
};

export default NumberStepper;
