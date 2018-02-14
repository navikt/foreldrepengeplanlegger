import * as React from 'react';

import { RangeInputValueLabelRendererOptions } from 'shared/components/rangeInput/RangeInput';
import { pluralize } from 'app/utils';
import Tekst from 'app/tekst';
import VeilederinfoContainer from 'app/connectedComponents/VeilederinfoContainer';
import Veilederinfo from 'app/components/veilederinfo/Veilederinfo';
import Infotekster from 'app/tekst/infotekster';

export interface Props {
	options: RangeInputValueLabelRendererOptions;
	navnForelder1: string;
	navnForelder2: string;
	ukerHver: number;
}

const FordelingFellesperiodeLabelRenderer: React.StatelessComponent<Props> = ({
	options,
	navnForelder1,
	navnForelder2,
	ukerHver
}) => {
	const ukerForelder1 = options.value || 0;
	const ukerForelder2 = options.max - (options.value || 0);
	return (
		<div>
			<VeilederinfoContainer id={Infotekster.fordelingFellespermisjon}>
				<div className="blokkPad-s">
					<Veilederinfo>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
						quis lectus metus, at posuere neque. Sed pharetra nibh eget orci
						convallis at posuere leo convallis. Sed blandit augue vitae augue
						scelerisque bibendum. Vivamus sit amet libero turpis, non venenatis
						urna. In blandit, odio convallis suscipit venenatis, ante ipsum
						cursus augue.
					</Veilederinfo>
				</div>
			</VeilederinfoContainer>
			<p>{Tekst.skjema.fordelingFellespermisjonInfo(ukerHver)}</p>
			<div className="skjema_fordelingFellesperiode">
				<div className="skjema_fordelingFellesperiode__forelder1">
					<div className="skjema_fordelingFellesperiode__forelderNavn">
						{navnForelder1}
					</div>
					<div className="skjema_fordelingFellesperiode__uker">
						{ukerForelder1} {pluralize(ukerForelder1 || 0, 'uke', 'uker')}
					</div>
				</div>
				{navnForelder2 && (
					<div className="skjema_fordelingFellesperiode__forelder2">
						<div className="skjema_fordelingFellesperiode__forelderNavn">
							{navnForelder2}
						</div>
						<div className="skjema_fordelingFellesperiode__uker">
							{ukerForelder2} {pluralize(ukerForelder2, 'uke', 'uker')}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default FordelingFellesperiodeLabelRenderer;
