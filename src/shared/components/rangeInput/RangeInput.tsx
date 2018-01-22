import * as React from 'react';
import SkjemaInputElement from 'shared/components/skjemaInputElement/SkjemaInputElement';

interface Props {
	value: number | undefined;
	min: number;
	max: number;
	step?: number;
	onChange: (value: number) => void;
}

const RangeInput: React.StatelessComponent<Props> = (props) => {
	return (
		<SkjemaInputElement label="">
			<input
				className="nav-frontend-range-input"
				type="range"
				{...props}
				onChange={(e) => props.onChange(parseInt(e.target.value, 10))}
			/>
		</SkjemaInputElement>
	);
};

export default RangeInput;
