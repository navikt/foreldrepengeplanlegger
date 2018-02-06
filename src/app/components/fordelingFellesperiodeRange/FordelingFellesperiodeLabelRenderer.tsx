import * as React from 'react';

import { RangeInputValueLabelRendererOptions } from 'shared/components/rangeInput/RangeInput';

export interface Props {
	options: RangeInputValueLabelRendererOptions;
	navnForelder1: string;
	navnForelder2: string;
}

const pluralize = (value: number, singular: string, plural: string): string => (value === 1 ? singular : plural);

const FordelingFellesperiodeLabelRenderer: React.StatelessComponent<Props> = ({
	options,
	navnForelder1,
	navnForelder2
}) => {
	const ukerForelder1 = options.value || 0;
	const ukerForelder2 = options.max - (options.value || 0);
	return (
		<div className="skjema_fordelingFellesperiode">
			<div className="skjema_fordelingFellesperiode__forelder1">
				<div className="skjema_fordelingFellesperiode__forelderNavn">{navnForelder1}</div>
				<div className="skjema_fordelingFellesperiode__uker">
					{ukerForelder1} {pluralize(ukerForelder1 || 0, 'uke', 'uker')}
				</div>
			</div>
			{navnForelder2 && (
				<div className="skjema_fordelingFellesperiode__forelder2">
					<div className="skjema_fordelingFellesperiode__forelderNavn">{navnForelder2}</div>
					<div className="skjema_fordelingFellesperiode__uker">
						{ukerForelder2} {pluralize(ukerForelder2, 'uke', 'uker')}
					</div>
				</div>
			)}
		</div>
	);
};

export default FordelingFellesperiodeLabelRenderer;
