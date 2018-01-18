import * as React from 'react';
import * as classNames from 'classnames';

import Dato from '../dato/Dato';

import Hendelsesliste from './Hendelsesliste';
import {
	TidslinjeInnslag,
	Forelder,
	Permisjonshendelse,
	InnslagType
} from './types';
import { mockTidslinjeData } from './data';
import { hentNesteInnslag, getHendelseStrekProps } from './utils';

import './tidslinje.less';
import { kalkulerUttaksdagerIPeriode } from 'utils/tidsberegninger';

export interface InnslagStrekProps {
	forelder: Forelder;
	hendelse: Permisjonshendelse;
	hendelseFortsetter: boolean;
	type: InnslagType;
}

const TidslinjeInnslagStrek: React.StatelessComponent<InnslagStrekProps> = ({
	forelder,
	type,
	hendelse,
	hendelseFortsetter
}) => {
	const erFodselEllerTermin = type === InnslagType.termin;
	const cls = classNames(
		'tidslinjeInnslag__linje',
		`tidslinjeInnslag__linje--${forelder}`,
		{
			'tidslinjeInnslag__linje--fortsetter':
				hendelseFortsetter || erFodselEllerTermin,
			'tidslinjeInnslag__linje--fodsel': erFodselEllerTermin,
			'tidslinjeInnslag__linje--gradert': hendelse.gradert,
			'tidslinjeInnslag__linje--slutt': type === InnslagType.slutt
		}
	);
	return <div className={cls} />;
};

const TidslinjeInnslag: React.StatelessComponent<{
	innslag: TidslinjeInnslag;
	nesteInnslag?: TidslinjeInnslag;
}> = ({ innslag, nesteInnslag }) => {
	const cls = classNames('tidslinjeInnslag', {
		'tidslinjeInnslag--fodsel': innslag.type === InnslagType.termin
	});

	const morProps = getHendelseStrekProps('mor', innslag, nesteInnslag);
	const medforelderProps = getHendelseStrekProps(
		'medforelder',
		innslag,
		nesteInnslag
	);
	const antallUttaksdager = nesteInnslag
		? kalkulerUttaksdagerIPeriode(innslag.dato, nesteInnslag.dato)
		: -1;

	return (
		<div key={innslag.dato.toDateString()} className={cls}>
			{morProps && <TidslinjeInnslagStrek {...morProps} />}
			{medforelderProps && <TidslinjeInnslagStrek {...medforelderProps} />}
			{innslag.type !== InnslagType.termin}
			<p className="tidslinjeInnslag__dato">
				<Dato dato={innslag.dato} />
				{antallUttaksdager >= 1 && <span> ({antallUttaksdager} dager)</span>}
			</p>
			<div className="tidslinjeInnslag__hendelser">
				<Hendelsesliste hendelser={innslag.hendelser} />
			</div>
		</div>
	);
};

const Tidslinje: React.StatelessComponent<{}> = () => {
	return (
		<div className="tidslinje">
			{mockTidslinjeData.map((innslag, idx) => (
				<div className="tidslinje__tidslinjeInnslag" key={idx}>
					<TidslinjeInnslag
						key={innslag.dato.toDateString()}
						innslag={innslag}
						nesteInnslag={hentNesteInnslag(idx, mockTidslinjeData)}
					/>
				</div>
			))}
		</div>
	);
};

export default Tidslinje;
