import * as React from 'react';
import Dato from 'app/elements/dato/Dato';
import { Tidsperiode } from 'app/types';
import { getAntallUttaksdagerITidsperiode } from 'app/utils/uttaksdagerUtils';

export interface Props {
	tidsperiode: Tidsperiode;
	visDager?: boolean;
	visSluttdato?: boolean;
}

const TidsperiodeTekst: React.StatelessComponent<Props> = ({
	tidsperiode,
	visDager,
	visSluttdato
}) => (
	<div>
		<Dato dato={tidsperiode.startdato} />
		{visSluttdato && (
			<span>
				{' '}
				- <Dato dato={tidsperiode.sluttdato} />
			</span>
		)}
		{visDager && (
			<span> ({getAntallUttaksdagerITidsperiode(tidsperiode)} dager)</span>
		)}
	</div>
);

export default TidsperiodeTekst;
