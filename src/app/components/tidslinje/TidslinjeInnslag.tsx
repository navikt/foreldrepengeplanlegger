import * as React from 'react';
import * as classNames from 'classnames';

import TerminIkon from 'app/components/ikoner/TerminIkon';
import Dato from 'app/components/dato/Dato';

import { TidslinjeInnslag } from './types';
import { kalkulerUttaksdagerIPeriode } from 'app/utils/periodeUtils';

interface TidslinjeInnslagProps {
	innslag: TidslinjeInnslag;
	nesteInnslag?: TidslinjeInnslag;
}

const TidslinjeStrek: React.StatelessComponent<TidslinjeInnslagProps> = ({ innslag }) => (
	<div
		className={classNames(
			'tidslinjeInnslag__linje',
			`tidslinjeInnslag__linje--${innslag.forelder}`,
			`tidslinjeInnslag__linje--${innslag.type}`
		)}
	/>
);

const TidslinjeInnslag: React.StatelessComponent<TidslinjeInnslagProps> = ({ innslag, nesteInnslag }) => {
	const cls = classNames(
		'tidslinjeInnslag',
		`tidslinjeInnslag--${innslag.type}`,
		`tidslinjeInnslag--${innslag.forelder}`
	);
	const antallUttaksdager = nesteInnslag ? kalkulerUttaksdagerIPeriode(innslag.startdato, nesteInnslag.startdato) : -1;
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
				{antallUttaksdager >= 1 && <span> ({antallUttaksdager} dager)</span>}
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
