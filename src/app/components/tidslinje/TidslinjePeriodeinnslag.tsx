import * as React from 'react';

import Callout from 'app/components/callout/Callout';
import { Periodeinnslag } from 'app/components/tidslinje/types';
import TidsperiodeTekst from 'app/components/tidslinje/TidsperiodeTekst';

interface Props {
	innslag: Periodeinnslag;
}

const TidslinjePeriodeinnslag: React.StatelessComponent<Props> = ({ innslag }) => {
	const { periode } = innslag;

	return (
		<div className="periodeinnslag">
			<Callout>
				<div className="m-padding-s">
					<div className="periodeinnslag__dato">
						<TidsperiodeTekst tidsperiode={periode.tidsperiode} visDager={true} />
					</div>
					<div className="periodeinnslag__type">{periode.type} </div>
				</div>
			</Callout>
		</div>
	);
};
export default TidslinjePeriodeinnslag;
