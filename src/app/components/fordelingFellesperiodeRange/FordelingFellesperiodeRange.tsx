import * as React from 'react';
import RangeInput from 'app/components/rangeInput/RangeInput';
import Tekst from 'app/tekst';
import FordelingFellesperiodeLabelRenderer from './FordelingFellesperiodeLabelRenderer';

export interface Props {
	navnForelder1: string;
	navnForelder2: string;
	ukerForelder1: number;
	ukerFellesperiode: number;
	ukerHver: number;
	onChange: (dager: number) => void;
}

const FordelingFellesperiodeRange: React.StatelessComponent<Props> = ({
	navnForelder1,
	navnForelder2,
	ukerForelder1,
	ukerFellesperiode,
	ukerHver,
	onChange
}) => (
	<RangeInput
		label={Tekst.skjema.fordelingFellespermisjon}
		value={ukerForelder1}
		min={0}
		max={ukerFellesperiode}
		onChange={onChange}
		steppers={{
			reduceLabel: `En uke mindre fellespermisjon til ${navnForelder1}`,
			increaseLabel: `En uke mindre fellespermisjon til ${navnForelder2}`
		}}
		valueLabelRenderer={(options) => (
			<FordelingFellesperiodeLabelRenderer
				options={options}
				navnForelder1={navnForelder1}
				navnForelder2={navnForelder2}
				ukerHver={ukerHver}
			/>
		)}
	/>
);

export default FordelingFellesperiodeRange;
