import * as React from 'react';

import Callout from 'app/components/callout/Callout';
import { Periodeinnslag } from 'app/components/tidslinje/types';
import { Periodetype } from 'app/types';

import {
	getInnslagfarge,
	erFortsettelse,
	getForelderNavn
} from 'app/components/tidslinje/tidslinjeUtils';
import InnslagLayout from 'app/components/tidslinje/elementer/InnslagLayout';
import {
	StonadsperiodeBeskrivelse,
	UtsettelseBeskrivelse,
	SammenslattPeriodeBeskrivelse
} from 'app/components/tidslinje/innslagtyper/PeriodeinnslagTyper';

export interface PeriodeinnslagProps {
	innslag: Periodeinnslag;
	navnForelder1: string;
	navnForelder2: string;
}

const Periodeinnslag: React.StatelessComponent<PeriodeinnslagProps> = (
	props
) => {
	const { innslag, navnForelder1, navnForelder2 } = props;

	const getInnslagbeskrivelse = (): React.ReactNode => {
		if (erFortsettelse(innslag)) {
			return (
				<InnslagLayout>
					{getForelderNavn(
						innslag.periode.forelder,
						navnForelder1,
						navnForelder2
					)}{' '}
					fortsetter sin permisjon.
				</InnslagLayout>
			);
		}
		switch (innslag.periode.type) {
			case Periodetype.Stonadsperiode:
				return <StonadsperiodeBeskrivelse {...props} />;
			case Periodetype.Utsettelse:
				return <UtsettelseBeskrivelse {...props} />;
			case Periodetype.SammenslattPeriode:
				return <SammenslattPeriodeBeskrivelse {...props} />;
			default:
				return <div />;
		}
	};

	return (
		<div className="periodeinnslag">
			<Callout
				borderColor={getInnslagfarge(innslag)}
				hideArrow={erFortsettelse(innslag)}>
				{getInnslagbeskrivelse()}
			</Callout>
		</div>
	);
};
export default Periodeinnslag;
