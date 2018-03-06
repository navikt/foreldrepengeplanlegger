import * as React from 'react';

import Callout from 'app/elements/callout/Callout';
import {
	InnslagPeriodetype,
	Tidslinjeinnslag
} from 'app/components/tidslinje/types';
import { Periodetype, Utsettelsesperiode } from 'app/types';

import {
	getInnslagfarge,
	innslagErFortsettelse
} from 'app/components/tidslinje/tidslinjeUtils';
import Utsettelsesinfo from 'app/components/tidslinje/innslaginfo/Utsettelsesinfo';
import Periodeinfo from 'app/components/tidslinje/innslaginfo/Periodeinfo';

export interface PeriodeinnslagProps {
	innslag: InnslagPeriodetype;
	nesteInnslag?: Tidslinjeinnslag;
	navnForelder1: string;
	navnForelder2: string;
	erSisteInnslag?: boolean;
	onRedigerUtsettelse?: (utsettelse: Utsettelsesperiode) => void;
}

const Periodeinnslag: React.StatelessComponent<PeriodeinnslagProps> = (
	props
) => {
	const { innslag, onRedigerUtsettelse } = props;

	const getInnslaginfo = (): React.ReactNode => {
		return innslag.periode.type === Periodetype.Utsettelse ? (
			<Utsettelsesinfo
				{...props}
				onRedigerUtsettelse={
					onRedigerUtsettelse ? (i) => onRedigerUtsettelse(i) : undefined
				}
			/>
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
