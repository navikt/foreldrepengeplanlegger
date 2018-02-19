import * as React from 'react';

import { InnslagHendelsetype } from 'app/components/tidslinje/types';
import Dato from 'app/elements/dato/Dato';
import TerminIkon from 'app/elements/ikoner/TerminIkon';

interface Props {
	innslag: InnslagHendelsetype;
}

const Hendelseinnslag: React.StatelessComponent<Props> = ({ innslag }) => {
	return (
		<div className="hendelseinnslag">
			<div className="m-padding-s">
				<div className="hendelseinnslag__dato">
					<Dato dato={innslag.dato} />
				</div>
				<div className="hendelseinnslag__hendelse">
					{innslag.hendelse === 'termin' ? 'Termin' : 'Siste permisjonsdag'}
					{innslag.hendelse === 'termin' && (
						<span className="hendelseinnslag__ikon">
							<TerminIkon />
						</span>
					)}
				</div>
			</div>
		</div>
	);
};
export default Hendelseinnslag;
