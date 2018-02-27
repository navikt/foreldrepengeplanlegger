import * as React from 'react';
import * as classnames from 'classnames';
import { guid } from 'nav-frontend-js-utils';

import './rangeInput.less';
import SkjemaInputElement from 'app/elements/skjemaInputElement/SkjemaInputElement';
import RangeStepper from 'app/elements/rangeInput/RangeStepper';
import AriaText from 'shared/components/aria/AriaText';

export interface RangeInputValueLabelRendererOptions {
	value: number;
	min: number;
	max: number;
}

export type RangeInputValueLabelRenderer = (
	options: RangeInputValueLabelRendererOptions
) => React.ReactElement<any>;

interface Props {
	label: string | React.ReactNode;
	ariaDescription?: string;
	value: number;
	min: number;
	max: number;
	step?: number;
	inputId?: string;
	valueLabelRenderer?: RangeInputValueLabelRenderer;
	steppers?: {
		increaseLabel: string;
		reduceLabel: string;
	};
	onChange: (value: number) => void;
}

const defaultValueLabelRenderer: RangeInputValueLabelRenderer = (
	options: RangeInputValueLabelRendererOptions
) => (
	<div className="rangeInput__valueLabels">
		<div className="rangeInput__valueLabels__left">{options.min}</div>
		<div className="rangeInput__valueLabels__right">{options.max}</div>
	</div>
);

const RangeInput: React.StatelessComponent<Props> = (props) => {
	const {
		label,
		inputId,
		valueLabelRenderer,
		steppers,
		ariaDescription,
		...rest
	} = props;
	const id = inputId || guid();
	const labelRenderer = valueLabelRenderer || defaultValueLabelRenderer;
	return (
		<SkjemaInputElement label={label} id={id}>
			{labelRenderer({ value: props.value, min: props.min, max: props.max })}
			<div
				className={classnames('rangeInput', {
					'rangeInput--withSteppers': steppers !== undefined
				})}>
				{steppers && (
					<div
						className="rangeInput__stepper rangeInput__stepper--previous"
						role="presentation">
						<RangeStepper
							direction="previous"
							onClick={() =>
								props.value > props.min ? props.onChange(props.value - 1) : null
							}
							label={steppers ? steppers.reduceLabel : 'Mindre'}
						/>
					</div>
				)}
				<div className="rangeInput__range">
					{ariaDescription && <AriaText id="aria">{ariaDescription}</AriaText>}
					<input
						{...rest}
						id={id}
						aria-describedby="aria"
						className="nav-frontend-range-input"
						type="range"
						onChange={(e) => props.onChange(parseInt(e.target.value, 10))}
					/>
				</div>
				{steppers && (
					<div
						className="rangeInput__stepper rangeInput__stepper--next"
						role="presentation">
						<RangeStepper
							direction="next"
							onClick={() =>
								props.value < props.max ? props.onChange(props.value + 1) : null
							}
							label={steppers ? steppers.increaseLabel : 'Mer'}
						/>
					</div>
				)}
			</div>
		</SkjemaInputElement>
	);
};

export default RangeInput;
