import * as React from 'react';

import TerminIkon from 'app/components/ikoner/TerminIkon';
import Dato from 'app/components/dato/Dato';
import { Hendelseinnslag } from 'app/components/tidslinje/types';

interface Props {
	innslag: Hendelseinnslag;
}

const Hendelseinnslag: React.StatelessComponent<Props> = ({ innslag }) => {
	return (
		<div className="hendelseinnslag">
			<div className="m-padding-s">
				<div className="hendelseinnslag__dato">
					<Dato dato={innslag.dato} />
				</div>
				<div className="hendelseinnslag__hendelse">
					{innslag.hendelse}
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
