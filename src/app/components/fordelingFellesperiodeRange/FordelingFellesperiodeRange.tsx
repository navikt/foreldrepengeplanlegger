import * as React from 'react';
import RangeInput from 'app/components/rangeInput/RangeInput';
import Tekst from 'app/tekst';
import FordelingFellesperiodeLabelRenderer from './FordelingFellesperiodeLabelRenderer';
import Sporsmal from 'app/elements/sporsmal/Sporsmal';
import Infotekster from 'app/tekst/infotekster';

export interface Props {
	navnForelder1: string;
	navnForelder2: string;
	ukerForelder1: number;
	ukerFellesperiode: number;
	ukerModrekvote: number;
	ukerFedrekvote: number;
	onChange: (dager: number) => void;
}

const FordelingFellesperiodeRange: React.StatelessComponent<Props> = ({
	navnForelder1,
	navnForelder2,
	ukerForelder1,
	ukerFellesperiode,
	ukerModrekvote,
	ukerFedrekvote,
	onChange
}) => (
	<RangeInput
		label={
			<div className="blokk-xs">
				<Sporsmal
					info={{
						id: Infotekster.fordelingFellespermisjon,
						label: 'Les mer om fordeling av fellesperioden'
					}}>
					{Tekst.skjema.fordelingFellespermisjon}
				</Sporsmal>
			</div>
		}
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
				ukerModrekvote={ukerModrekvote}
				ukerFedrekvote={ukerFedrekvote}
			/>
		)}
	/>
);

export default FordelingFellesperiodeRange;
