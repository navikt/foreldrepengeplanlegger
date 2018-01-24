import * as React from 'react';
import * as classNames from 'classnames';

import Dato from '../dato/Dato';

import { TidslinjeInnslag, InnslagType } from './types';
import { mockTidslinjeData } from './data';

import './tidslinje.less';
import { kalkulerUttaksdagerIPeriode } from 'app/utils/tidsberegninger';
import TerminIkon from 'app/components/tidslinje/TerminIkon';

interface TidslinjeInnslagProps {
	innslag: TidslinjeInnslag;
	nesteInnslag?: TidslinjeInnslag;
}

const TidslinjeStrek: React.StatelessComponent<TidslinjeInnslagProps> = ({ innslag }) => (
	<div
		className={classNames(
			'tidslinjeInnslag__linje',
			`tidslinjeInnslag__linje--${innslag.forelder}`,
			`tidslinjeInnslag__linje--${innslag.type}`,
			{
				'tidslinjeInnslag__linje--gradert': innslag.gradert
			}
		)}
	/>
);

const TidslinjeInnslag: React.StatelessComponent<TidslinjeInnslagProps> = ({ innslag, nesteInnslag }) => {
	const cls = classNames(
		'tidslinjeInnslag',
		`tidslinjeInnslag--${innslag.type}`,
		`tidslinjeInnslag--${innslag.forelder}`
	);
	const antallUttaksdager = nesteInnslag ? kalkulerUttaksdagerIPeriode(innslag.dato, nesteInnslag.dato) : -1;
	return (
		<div className={cls}>
			<TidslinjeStrek innslag={innslag} />
			<div className="tidslinjeInnslag__dato">
				<Dato dato={innslag.dato} />
				{antallUttaksdager >= 1 && <span> ({antallUttaksdager} dager)</span>}
			</div>
			<div className="tidslinjeInnslag__hendelse">
				{innslag.tittel}{' '}
				{innslag.type === InnslagType.termin && (
					<span className="tidslinjeInnslag__terminHjerte">
						<TerminIkon />
					</span>
				)}
			</div>
		</div>
	);
};

const Tidslinje: React.StatelessComponent<{}> = () => {
	return (
		<div className="tidslinje">
			{mockTidslinjeData.map((innslag, idx) => (
				<div className="tidslinje__tidslinjeInnslag" key={idx}>
					<TidslinjeInnslag key={innslag.dato.toDateString()} innslag={innslag} />
				</div>
			))}
		</div>
	);
};

export default Tidslinje;
