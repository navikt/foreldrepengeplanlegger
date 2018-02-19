import * as React from 'react';
import * as classnames from 'classnames';
import { guid } from 'nav-frontend-js-utils';
import RangeStepper from 'app/components/rangeInput/RangeStepper';
import SkjemaInputElement from 'app/components/skjemaInputElement/SkjemaInputElement';

export interface RangeInputValueLabelRendererOptions {
	value: number;
	min: number;
	max: number;
}

export type RangeInputValueLabelRenderer = (
	options: RangeInputValueLabelRendererOptions
) => React.ReactElement<any>;

interface Props {
	label: string;
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
	const { label, inputId, valueLabelRenderer, steppers, ...rest } = props;
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
					<div className="rangeInput__stepper rangeInput__stepper--previous">
						<RangeStepper
							direction="previous"
							onClick={() => props.onChange(props.value - 1)}
							label={steppers ? steppers.reduceLabel : 'Mindre'}
						/>
					</div>
				)}
				<div className="rangeInput__range">
					<input
						{...rest}
						id={id}
						className="nav-frontend-range-input"
						type="range"
						onChange={(e) => props.onChange(parseInt(e.target.value, 10))}
					/>
				</div>
				{steppers && (
					<div className="rangeInput__stepper rangeInput__stepper--next">
						<RangeStepper
							direction="next"
							onClick={() => props.onChange(props.value + 1)}
							label={steppers ? steppers.increaseLabel : 'Mer'}
						/>
					</div>
				)}
			</div>
		</SkjemaInputElement>
	);
};

export default RangeInput;
