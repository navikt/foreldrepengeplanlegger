import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import Sporsmal from 'app/elements/sporsmal/Sporsmal';
import { intlString } from 'app/intl/IntlTekst';
import RangeInput from 'app/elements/rangeInput/RangeInput';
import FordelingFellesperiodeLabelRenderer from 'app/components/skjema/FordelingFellesperiodeLabelRenderer';

export interface OwnProps {
	navnForelder1: string;
	navnForelder2: string;
	ukerForelder1: number;
	ukerFellesperiode: number;
	ukerForTermin: number;
	ukerModrekvote: number;
	ukerFedrekvote: number;
	onChange: (dager: number) => void;
}

const FordelingFellesperiode: React.StatelessComponent<
	OwnProps & InjectedIntlProps
> = ({
	navnForelder1,
	navnForelder2,
	ukerForelder1,
	ukerFellesperiode,
	ukerModrekvote,
	ukerFedrekvote,
	ukerForTermin,
	onChange,
	intl
}) => (
	<RangeInput
		label={
			<div className="blokk-xs">
				<Sporsmal>{intlString(intl, 'skjema.fordeling.sporsmal')}</Sporsmal>
			</div>
		}
		value={ukerForelder1}
		min={0}
		max={ukerFellesperiode}
		onChange={onChange}
		steppers={{
			reduceLabel: intlString(intl, 'skjema.fordeling.reduser.tooltip', {
				navn: navnForelder1
			}),
			increaseLabel: intlString(intl, 'skjema.fordeling.reduser.tooltip', {
				navn: navnForelder2
			})
		}}
		valueLabelRenderer={(options) => (
			<FordelingFellesperiodeLabelRenderer
				options={options}
				ukerForTermin={ukerForTermin}
				navnForelder1={navnForelder1}
				navnForelder2={navnForelder2}
				ukerModrekvote={ukerModrekvote}
				ukerFedrekvote={ukerFedrekvote}
			/>
		)}
	/>
);

export default injectIntl(FordelingFellesperiode);
