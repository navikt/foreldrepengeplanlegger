import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import Sporsmal from 'app/elements/sporsmal/Sporsmal';
import IntlTekst, { intlString } from 'app/intl/IntlTekst';
import RangeInput from 'app/elements/rangeInput/RangeInput';
import FordelingFellesperiodeLabelRenderer from 'app/components/skjema/FordelingFellesperiodeLabelRenderer';
import { Infotekster } from 'app/redux/reducers/viewReducer';

export interface OwnProps {
	navnForelder1: string;
	navnForelder2: string;
	ukerForelder1: number;
	ukerFellesperiode: number;
	introRenderer: () => React.ReactNode;
	onChange: (dager: number) => void;
}

const FordelingFellesperiode: React.StatelessComponent<
	OwnProps & InjectedIntlProps
> = ({
	navnForelder1,
	navnForelder2,
	ukerForelder1,
	ukerFellesperiode,
	introRenderer,
	onChange,
	intl
}) => (
	<RangeInput
		label={
			<Sporsmal
				info={{
					id: Infotekster.fordelingFellesperiode,
					label: intlString(intl, 'skjema.fordeling.sporsmal.ikonlabel')
				}}>
				<IntlTekst id="skjema.fordeling.sporsmal" />
			</Sporsmal>
		}
		ariaDescription={`Hvor mange uker av fellesperioden skal ${navnForelder1} ha av totalt ${ukerFellesperiode} uker?`}
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
		ariaValueChangedMessage={(value) =>
			intlString(intl, 'skjermleser.fordeling_av_fellesperiode', {
				ukerForelder1: value,
				ukerForelder2: ukerFellesperiode - value,
				navnForelder1,
				navnForelder2
			})
		}
		valueLabelRenderer={(options) => (
			<FordelingFellesperiodeLabelRenderer
				options={options}
				navnForelder1={navnForelder1}
				navnForelder2={navnForelder2}
				introRenderer={introRenderer}
			/>
		)}
	/>
);

export default injectIntl(FordelingFellesperiode);
