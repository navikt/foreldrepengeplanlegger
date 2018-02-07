import * as React from 'react';

import TerminIkon from 'app/components/ikoner/TerminIkon';
import Dato from 'app/components/dato/Dato';
import { Hendelseinnslag } from 'app/components/tidslinje/types';

interface Props {
	innslag: Hendelseinnslag;
}

const TidslinjeHendelseinnslag: React.StatelessComponent<Props> = ({ innslag }) => {
	return (
		<div className="tidslinjeinnslag--hendelse">
			<div className="m-padding-s">
				<div className="tidslinjeinnslag__dato">
					<Dato dato={innslag.dato} />
				</div>
				<div className="tidslinjeinnslag__hendelse">
					{innslag.hendelse}
					{innslag.hendelse === 'termin' && (
						<span className="tidslinjeInnslag__terminHjerte">
							<TerminIkon />
						</span>
					)}
				</div>
			</div>
		</div>
	);
};
export default TidslinjeHendelseinnslag;
