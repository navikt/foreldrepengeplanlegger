import * as React from 'react';
import SkjemaInputElement from 'shared/components/skjemaInputElement/SkjemaInputElement';

interface Props {
	value: number | undefined;
	min: number;
	max: number;
	step?: number;
	labelLeft: string;
	labelRight: string;
	onChange: (value: number) => void;
}

const RangeInput: React.StatelessComponent<Props> = (props) => {
	const { labelLeft, labelRight, ...rest } = props;
	return (
		<SkjemaInputElement label="">
			<input
				className="nav-frontend-range-input"
				type="range"
				{...rest}
				onChange={(e) => props.onChange(parseInt(e.target.value, 10))}
			/>
			{props.value !== undefined && (
				<div className="range-input__values">
					<div className="range-input__values__left">
						{labelLeft}: <span className="range-input__values__value">{props.value}</span>
					</div>
					<div className="range-input__values__right">
						{labelRight}: <span className="range-input__values__value">{props.max - props.value}</span>
					</div>
				</div>
			)}
		</SkjemaInputElement>
	);
};

export default RangeInput;
