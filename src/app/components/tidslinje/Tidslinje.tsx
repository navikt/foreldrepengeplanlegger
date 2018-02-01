import * as React from 'react';

import { Element } from 'nav-frontend-typografi';
import TidslinjeInnslag from './TidslinjeInnslag';
import { TidslinjeInnslag as TidslinjeInnslagType } from './types';

import './tidslinje.less';

export interface TidslinjeProps {
	innslag: TidslinjeInnslagType[];
}

const Tidslinje: React.StatelessComponent<TidslinjeProps> = ({ innslag }) => {
	return (
		<div className="tidslinje">
			<div className="blokk-m">
				<Element>Din tidslinje for planlagt permisjon</Element>
			</div>
			{innslag.map((i, idx) => {
				return (
					<div className="tidslinje__tidslinjeInnslag" key={idx}>
						<TidslinjeInnslag key={i.startdato.toDateString()} innslag={i} />
					</div>
				);
			})}
		</div>
	);
};

export default Tidslinje;
