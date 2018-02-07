import * as React from 'react';

import { Element } from 'nav-frontend-typografi';
import { Tidslinjeinnslag, TidslinjeinnslagType } from 'app/components/tidslinje/types';
import TidslinjePeriodeinnslag from './TidslinjePeriodeinnslag';
import './tidslinje.less';
import TidslinjeHendelseinnslag from 'app/components/tidslinje/TidslinjeHendelseinnslag';
import Tidslinjestrek from 'app/components/tidslinje/Tidslinjestrek';

export interface TidslinjeProps {
	innslag: Tidslinjeinnslag[];
}

const Tidslinje: React.StatelessComponent<TidslinjeProps> = ({ innslag }) => {
	return (
		<div className="tidslinje">
			<div className="blokk-m">
				<Element>Din tidsplan</Element>
			</div>
			{innslag.map((i, idx) => {
				return (
					<div className="tidslinje__tidslinjeinnslag" key={idx}>
						<Tidslinjestrek innslag={i} />
						{i.type === TidslinjeinnslagType.periode ? (
							<TidslinjePeriodeinnslag innslag={i} />
						) : (
							<TidslinjeHendelseinnslag innslag={i}>hendelse</TidslinjeHendelseinnslag>
						)}
					</div>
				);
			})}
		</div>
	);
};

export default Tidslinje;
