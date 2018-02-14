import * as React from 'react';
import Dato from 'app/components/dato/Dato';
import { Tidsperiode } from 'app/types';
import { getAntallUttaksdagerITidsperiode } from 'app/utils/uttaksdagerUtils';

export interface Props {
	tidsperiode: Tidsperiode;
	visDager?: boolean;
}

const TidsperiodeTekst: React.StatelessComponent<Props> = ({
	tidsperiode,
	visDager
}) => (
	<div>
		<Dato dato={tidsperiode.startdato} /> -{' '}
		<Dato dato={tidsperiode.tom} />
		{visDager && (
			<span> ({getAntallUttaksdagerITidsperiode(tidsperiode)} dager)</span>
		)}
	</div>
);

export default TidsperiodeTekst;
