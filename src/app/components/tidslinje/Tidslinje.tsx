import * as React from 'react';

import { Undertittel } from 'nav-frontend-typografi';
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
				<Undertittel>Din tidslinje for planlagt permisjon</Undertittel>
			</div>
			{innslag.map((i, idx) => (
				<div className="tidslinje__tidslinjeInnslag" key={idx}>
					<TidslinjeInnslag key={i.dato.toDateString()} innslag={i} />
				</div>
			))}
		</div>
	);
};

export default Tidslinje;
