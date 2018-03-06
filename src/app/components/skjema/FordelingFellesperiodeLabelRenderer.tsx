import * as React from 'react';

import VeilederinfoContainer from 'app/connectedComponents/VeilederinfoContainer';
import IntlTekst from 'app/intl/IntlTekst';
import { RangeInputValueLabelRendererOptions } from 'app/elements/rangeInput/RangeInput';
import { Infotekster } from 'app/redux/reducers/viewReducer';

export interface Props {
	options: RangeInputValueLabelRendererOptions;
	navnForelder1: string;
	navnForelder2: string;
}

const FordelingFellesperiodeLabelRenderer: React.StatelessComponent<Props> = ({
	options,
	navnForelder1,
	navnForelder2
}) => {
	const ukerForelder1 = options.value || 0;
	const ukerForelder2 = options.max - (options.value || 0);
	return (
		<div>
			<VeilederinfoContainer
				id={Infotekster.fordelingFellesperiode}
				type="info">
				<IntlTekst id="skjema.fordeling.veiledning" />
			</VeilederinfoContainer>
			<div className="skjema_fordelingFellesperiode">
				<div className="skjema_fordelingFellesperiode__forelder1">
					<div className="skjema_fordelingFellesperiode__forelderNavn blokk-xxxs">
						{navnForelder1}
					</div>
					<div className="skjema_fordelingFellesperiode__uker">
						<IntlTekst
							id="skjema.fordeling.uker"
							values={{
								uker: ukerForelder1
							}}
						/>
					</div>
				</div>
				<div className="skjema_fordelingFellesperiode__forelder2">
					<div className="skjema_fordelingFellesperiode__forelderNavn  blokk-xxxs">
						{navnForelder2}
					</div>
					<div className="skjema_fordelingFellesperiode__uker">
						<IntlTekst
							id="skjema.fordeling.uker"
							values={{
								uker: ukerForelder2
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FordelingFellesperiodeLabelRenderer;
