import * as React from 'react';
import Chevron from 'nav-frontend-chevron';
import AriaText from 'shared/components/aria/AriaText';

export type Direction = 'next' | 'previous';

export interface Props {
	onClick: () => void;
	direction: Direction;
	label: string;
	disabled?: boolean;
}

const RangeStepper: React.StatelessComponent<Props> = ({
	direction,
	onClick,
	label,
	disabled
}) => (
	<button
		type="button"
		onClick={() => onClick()}
		className="rangeStepper"
		disabled={disabled}
		title={label}>
		<Chevron type={direction === 'previous' ? 'venstre' : 'høyre'} />
		<AriaText>{label}</AriaText>
	</button>
);

export default RangeStepper;
