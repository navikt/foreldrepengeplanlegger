import * as React from 'react';
import * as classNames from 'classnames';

import TerminIkon from 'app/components/ikoner/TerminIkon';
import Dato from 'app/components/dato/Dato';

import { TidslinjeInnslag } from './types';
import { getAntallDagerITidsperiode } from 'app/utils/periodeUtils';

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
				'tidslinjeInnslag__linje--fortsettelse': innslag.erFortsettelse,
				'tidslinjeInnslag__linje--fortsetter': innslag.fortsetter,
				'tidslinjeInnslag__linje--slutt': innslag.erSlutt
			}
		)}
	/>
);

const TidslinjeInnslag: React.StatelessComponent<TidslinjeInnslagProps> = ({ innslag }) => {
	const cls = classNames(
		'tidslinjeInnslag',
		`tidslinjeInnslag--${innslag.type}`,
		`tidslinjeInnslag--${innslag.forelder}`
	);
	const varighet = getAntallDagerITidsperiode({ startdato: innslag.startdato, sluttdato: innslag.sluttdato });
	return (
		<div className={cls}>
			<TidslinjeStrek innslag={innslag} />
			<div className="tidslinjeInnslag__dato">
				<Dato dato={innslag.startdato} />{' '}
				{innslag.sluttdato && (
					<span>
						{' '}
						- <Dato dato={innslag.sluttdato} />
					</span>
				)}
				{varighet >= 1 && <span> ({varighet} dager)</span>}
			</div>
			<div className="tidslinjeInnslag__hendelse">
				{innslag.tittel}{' '}
				{innslag.type === 'termin' && (
					<span className="tidslinjeInnslag__terminHjerte">
						<TerminIkon />
					</span>
				)}
			</div>
		</div>
	);
};
export default TidslinjeInnslag;
