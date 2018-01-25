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
		<SkjemaInputElement label="Fordel uker">
			<input
				className="nav-frontend-range-input"
				type="range"
				{...rest}
				onChange={(e) => props.onChange(parseInt(e.target.value, 10))}
			/>
			{props.value !== undefined && (
				<div className="range-input__values">
					<div className="range-input__values__left">{labelLeft}</div>
					<div className="range-input__values__right">{labelRight}</div>
				</div>
			)}
		</SkjemaInputElement>
	);
};

export default RangeInput;
