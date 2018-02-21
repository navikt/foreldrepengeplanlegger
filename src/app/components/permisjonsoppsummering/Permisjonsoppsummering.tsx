import * as React from 'react';
import * as classnames from 'classnames';
import { Element } from 'nav-frontend-typografi';
import { pluralize } from 'app/utils';
import { Forelder } from 'app/types';

import './permisjonsoppsummering.less';

export interface Props {
	navnForelder1: string;
	navnForelder2: string;
	foreldrepengerMor: number;
	modrekvote: number;
	fedrekvote: number;
	fellesukerForelder1: number;
	fellesukerForelder2: number;
}

interface KvoteProps {
	navn: string;
	uker: number;
	forelder: Forelder;
}
const Kvote: React.StatelessComponent<KvoteProps> = ({
	navn,
	uker,
	forelder
}) => {
	return (
		<div
			className={classnames(
				'permisjonsoppsummering__kvote',
				`permisjonsoppsummering__kvote--${forelder}`
			)}>
			<div className="permisjonsoppsummering__kvote__navn">{navn}</div>
			<div className="permisjonsoppsummering__kvote__uker">
				{uker} {pluralize(uker, 'uke', 'uker')}
			</div>
		</div>
	);
};

const Permisjonsoppsummering: React.StatelessComponent<Props> = ({
	navnForelder1,
	navnForelder2,
	foreldrepengerMor,
	modrekvote,
	fedrekvote,
	fellesukerForelder1,
	fellesukerForelder2
}) => (
	<div className="permisjonsoppsummering">
		<h3 className="sr-only">Deres fordeling av uker</h3>
		<div className="permisjonsoppsummering__forelder">
			<div className="blokk-xxs">
				<Element tag="h4">{navnForelder1}</Element>
			</div>
			<Kvote navn="Kvote" uker={modrekvote} forelder="forelder1" />
			<Kvote
				navn="Fellesperiode"
				uker={fellesukerForelder1}
				forelder="forelder1"
			/>
		</div>
		<div className="permisjonsoppsummering__forelder">
			<div className="blokk-xxs">
				<Element tag="h4">{navnForelder2}</Element>
			</div>
			<Kvote navn="Kvote" uker={modrekvote} forelder="forelder2" />
			<Kvote
				navn="Fellesperiode"
				uker={fellesukerForelder2}
				forelder="forelder2"
			/>
		</div>
	</div>
);

export default Permisjonsoppsummering;
