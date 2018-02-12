import * as React from 'react';

import Callout from 'app/components/callout/Callout';
import { Periodeinnslag } from 'app/components/tidslinje/types';
import { Periodetype } from 'app/types';

import {
	getInnslagfarge,
	innslagErFortsettelse,
	getForelderNavn
} from 'app/components/tidslinje/tidslinjeUtils';
import Fortsettelsesinfo from 'app/components/tidslinje/innslaginfo/Fortsettelseinfo';
import Utsettelsesinfo from 'app/components/tidslinje/innslaginfo/Utsettelsesinfo';
import Periodeinfo from 'app/components/tidslinje/innslaginfo/Periodeinfo';

export interface PeriodeinnslagProps {
	innslag: Periodeinnslag;
	navnForelder1: string;
	navnForelder2: string;
}

const Periodeinnslag: React.StatelessComponent<PeriodeinnslagProps> = (
	props
) => {
	const { innslag, navnForelder1, navnForelder2 } = props;

	const getInnslaginfo = (): React.ReactNode => {
		if (
			innslagErFortsettelse(innslag) &&
			innslag.periode.type !== Periodetype.Utsettelse
		) {
			return (
				<Fortsettelsesinfo
					navn={getForelderNavn(
						innslag.periode.forelder,
						navnForelder1,
						navnForelder2
					)}
				/>
			);
		}
		return innslag.periode.type === Periodetype.Utsettelse ? (
			<Utsettelsesinfo {...props} />
		) : (
			<Periodeinfo {...props} />
		);
	};

	return (
		<div className="periodeinnslag">
			<Callout
				borderColor={getInnslagfarge(innslag)}
				hideArrow={innslagErFortsettelse(innslag)}>
				{getInnslaginfo()}
			</Callout>
		</div>
	);
};
export default Periodeinnslag;
