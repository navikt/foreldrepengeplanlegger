import * as React from 'react';
import * as classnames from 'classnames';

import { Systemtittel } from 'nav-frontend-typografi';
import {
	Tidslinjeinnslag,
	TidslinjeinnslagType
} from 'app/components/tidslinje/types';
import TidslinjePeriodeinnslag from './TidslinjePeriodeinnslag';
import TidslinjeHendelseinnslag from 'app/components/tidslinje/TidslinjeHendelseinnslag';
import Tidslinjestrek from 'app/components/tidslinje/Tidslinjestrek';

export interface TidslinjeProps {
	innslag: Tidslinjeinnslag[];
}

const Tidslinje: React.StatelessComponent<TidslinjeProps> = ({ innslag }) => {
	return (
		<div className="tidslinje">
			<div className="blokk-m">
				<Systemtittel>Din tidsplan</Systemtittel>
			</div>
			{innslag.map((i, idx) => {
				const className = classnames(
					'tidslinje__innslag',
					`tidslinje__innslag--${i.type}`
				);
				return (
					<div className={className} key={idx}>
						<Tidslinjestrek innslag={i} />
						{i.type === TidslinjeinnslagType.periode ? (
							<TidslinjePeriodeinnslag innslag={i} />
						) : (
							<TidslinjeHendelseinnslag innslag={i}>
								hendelse
							</TidslinjeHendelseinnslag>
						)}
					</div>
				);
			})}
		</div>
	);
};

export default Tidslinje;
