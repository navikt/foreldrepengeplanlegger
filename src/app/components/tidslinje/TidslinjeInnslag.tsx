import * as React from 'react';
import * as classNames from 'classnames';

import TerminIkon from 'app/components/ikoner/TerminIkon';
import Dato from 'app/components/dato/Dato';

import { TidslinjeInnslag } from './types';
import Infotekst from 'app/components/infotekst/Infotekst';

interface TidslinjeInnslagProps {
	innslag: TidslinjeInnslag;
}

const TidslinjeStrek: React.StatelessComponent<TidslinjeInnslagProps> = ({ innslag }) => (
	<div
		className={classNames(
			'tidslinjeInnslag__linje',
			`tidslinjeInnslag__linje--${innslag.forelder}`,
			`tidslinjeInnslag__linje--${innslag.type}`,
			{
				'tidslinjeInnslag__linje--fortsettelse': innslag.fortsettelse,
				'tidslinjeInnslag__linje--fortsetter': innslag.fortsetter,
				'tidslinjeInnslag__linje--slutt': innslag.slutter
			}
		)}
	/>
);

const TidslinjeInnslag: React.StatelessComponent<TidslinjeInnslagProps> = ({ innslag }) => {
	const cls = classNames(
		'tidslinjeInnslag',
		`tidslinjeInnslag--${innslag.type}`,
		`tidslinjeInnslag--${innslag.forelder}`,
		{
			'tidslinjeInnslag--slutt': innslag.slutter
		}
	);
	return (
		<div className={cls}>
			<TidslinjeStrek innslag={innslag} />
			<div className="tidslinjeInnslag__dato">
				<Dato dato={innslag.startdato} />
			</div>
			<div className="tidslinjeInnslag__hendelse">
				{innslag.tittel}{' '}
				{innslag.type === 'termin' && (
					<span className="tidslinjeInnslag__terminHjerte">
						<TerminIkon />
					</span>
				)}
				{innslag.type === 'utsettelse' && (
					<div className="tidslinjeInnslag__info">
						<Infotekst tittel="Nyttig informasjon" />
					</div>
				)}
			</div>
		</div>
	);
};
export default TidslinjeInnslag;
