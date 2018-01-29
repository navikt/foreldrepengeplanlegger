import * as React from 'react';

import { Element } from 'nav-frontend-typografi';
import TidslinjeInnslag from './TidslinjeInnslag';
import { TidslinjeInnslag as TidslinjeInnslagType } from './types';

import './tidslinje.less';

export interface TidslinjeProps {
	innslag: TidslinjeInnslagType[];
}

const Tidslinje: React.StatelessComponent<TidslinjeProps> = ({ innslag }) => {
	const antallInnslag = innslag.length;
	return (
		<div className="tidslinje">
			<div className="blokk-m">
				<Element>Din tidslinje for planlagt permisjon</Element>
			</div>
			{innslag.map((i, idx) => {
				const nesteInnslag = idx < antallInnslag - 1 ? innslag[idx + 1] : undefined;
				return (
					<div className="tidslinje__tidslinjeInnslag" key={idx}>
						<TidslinjeInnslag key={i.startdato.toDateString()} innslag={i} nesteInnslag={nesteInnslag} />
					</div>
				);
			})}
		</div>
	);
};

export default Tidslinje;
