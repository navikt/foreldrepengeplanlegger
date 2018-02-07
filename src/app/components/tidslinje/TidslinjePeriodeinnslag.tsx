import * as React from 'react';

import Callout, { CalloutBorderColor } from 'app/components/callout/Callout';
import { Periodeinnslag } from 'app/components/tidslinje/types';
import TidsperiodeTekst from 'app/components/tidslinje/TidsperiodeTekst';
import { Periodetype } from 'app/types';

interface Props {
	innslag: Periodeinnslag;
}

const getInnslagfarge = (innslag: Periodeinnslag): CalloutBorderColor => {
	if (innslag.periode.type === Periodetype.Utsettelse) {
		return 'green';
	}
	if (innslag.periode.forelder === 'forelder1') {
		return 'purple';
	}
	return 'blue';
};

const TidslinjePeriodeinnslag: React.StatelessComponent<Props> = ({ innslag }) => {
	const { periode } = innslag;

	return (
		<div className="periodeinnslag">
			<Callout borderColor={getInnslagfarge(innslag)}>
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
