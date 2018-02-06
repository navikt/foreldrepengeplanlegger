import * as React from 'react';
import RangeInput from 'shared/components/rangeInput/RangeInput';
import Tekst from 'app/tekst';
import FordelingFellesperiodeLabelRenderer from './FordelingFellesperiodeLabelRenderer';

export interface Props {
	navnForelder1: string;
	navnForelder2: string;
	ukerForelder1: number;
	ukerFellesperiode: number;
	onChange: (dager: number) => void;
}

const FordelingFellesperiodeRange: React.StatelessComponent<Props> = ({
	navnForelder1,
	navnForelder2,
	ukerForelder1,
	ukerFellesperiode,
	onChange
}) => (
	<RangeInput
		label={Tekst.skjema.fordelingFellespermisjon}
		value={ukerForelder1}
		min={0}
		max={ukerFellesperiode}
		onChange={onChange}
		valueLabelRenderer={(options) => (
			<FordelingFellesperiodeLabelRenderer
				options={options}
				navnForelder1={navnForelder1}
				navnForelder2={navnForelder2}
			/>
		)}
	/>
);

export default FordelingFellesperiodeRange;
