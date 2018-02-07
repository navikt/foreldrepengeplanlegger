import * as React from 'react';

import Dato from 'app/components/dato/Dato';
import { getAntallUttaksdagerITidsperiode } from 'app/utils/uttaksdagerUtils';
import Callout from 'app/components/callout/Callout';
import { Periodeinnslag } from 'app/components/tidslinje/types';

interface Props {
	innslag: Periodeinnslag;
}

const TidslinjePeriodeinnslag: React.StatelessComponent<Props> = ({ innslag }) => {
	const { periode } = innslag;
	const dager = getAntallUttaksdagerITidsperiode(periode.tidsperiode.startdato, periode.tidsperiode.sluttdato);
	return (
		<div className="tidslinjeinnslag--periode">
			<Callout>
				<div className="m-padding-s">
					<div className="tidslinjeinnslag__dato">
						<Dato dato={periode.tidsperiode.startdato} />
						<span>
							{' '}
							- <Dato dato={periode.tidsperiode.sluttdato} /> ({dager} dager)
						</span>
					</div>
					<div className="tidslinjeinnslag__hendelse">{periode.type} </div>
				</div>
			</Callout>
		</div>
	);
};
export default TidslinjePeriodeinnslag;
