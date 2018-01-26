import * as React from 'react';
import SkjemaInputElement from 'shared/components/skjemaInputElement/SkjemaInputElement';
import { guid } from 'nav-frontend-js-utils';

export interface RangeInputValueLabelRendererOptions {
	value: number | undefined;
	min: number;
	max: number;
}

export type RangeInputValueLabelRenderer = (options: RangeInputValueLabelRendererOptions) => React.ReactElement<any>;

interface Props {
	label: string;
	value: number | undefined;
	min: number;
	max: number;
	step?: number;
	inputId?: string;
	valueLabelRenderer?: RangeInputValueLabelRenderer;
	onChange: (value: number) => void;
}

const defaultValueLabelRenderer: RangeInputValueLabelRenderer = (options: RangeInputValueLabelRendererOptions) => (
	<div className="rangeInput__valueLabels">
		<div className="rangeInput__valueLabels__left">{options.min}</div>
		<div className="rangeInput__valueLabels__right">{options.max}</div>
	</div>
);

const RangeInput: React.StatelessComponent<Props> = (props) => {
	const { label, inputId, valueLabelRenderer, ...rest } = props;
	const id = inputId || guid();
	const labelRenderer = valueLabelRenderer || defaultValueLabelRenderer;
	return (
		<SkjemaInputElement label={label} id={id}>
			{labelRenderer({ value: props.value, min: props.min, max: props.max })}
			<input
				{...rest}
				id={id}
				className="nav-frontend-range-input"
				type="range"
				onChange={(e) => props.onChange(parseInt(e.target.value, 10))}
			/>
		</SkjemaInputElement>
	);
};

export default RangeInput;
