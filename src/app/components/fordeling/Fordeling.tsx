import * as React from 'react';
// import * as classnames from 'classnames';
import { Element } from 'nav-frontend-typografi';

// import { Forelder } from 'app/types';
// import IntlTekst from 'app/intl/IntlTekst';

import './fordeling.less';
import IntlTekst from 'app/intl/IntlTekst';

export interface Props {
	navnForelder1: string;
	navnForelder2: string;
	foreldrepengerMor: number;
	modrekvote: number;
	fedrekvote: number;
	fellesukerForelder1: number;
	fellesukerForelder2: number;
}

// interface KvoteProps {
// 	navn: string;
// 	uker: number;
// 	forelder: Forelder;
// }
// const Kvote: React.StatelessComponent<KvoteProps> = ({
// 	navn,
// 	uker,
// 	forelder
// }) => {
// 	return (
// 		<div
// 			className={classnames(
// 				'permisjonsoppsummering__kvote',
// 				`permisjonsoppsummering__kvote--${forelder}`
// 			)}>
// 			<div className="permisjonsoppsummering__kvote__navn">{navn}</div>
// 			<div className="permisjonsoppsummering__kvote__uker">
// 				<IntlTekst id="uker" values={{ uker }} />
// 			</div>
// 		</div>
// 	);
// };

const Fordeling: React.StatelessComponent<Props> = ({
	navnForelder1,
	navnForelder2,
	foreldrepengerMor,
	modrekvote,
	fedrekvote,
	fellesukerForelder1,
	fellesukerForelder2
}) => {
	const totaltAntallUker =
		fellesukerForelder1 +
		fellesukerForelder2 +
		modrekvote +
		fedrekvote +
		foreldrepengerMor;

	const ukerF1 = fellesukerForelder1 + modrekvote + foreldrepengerMor;
	const ukerF2 = fellesukerForelder2 + fedrekvote;
	const pstF1 = 100 / totaltAntallUker * ukerF1;
	const pstF2 = 100 / totaltAntallUker * ukerF2;
	const b1 = {
		width: `${pstF1}%`
	};
	const b2 = {
		width: `${pstF2}%`
	};
	return (
		<div className="fordeling">
			<div className="fordeling__header" aria-hidden="true" role="presentation">
				<Element className="fordeling__header__forelder">
					{navnForelder1}
				</Element>
				<Element className="fordeling__header__forelder fordeling__header__forelder--forelder2">
					{navnForelder2}
				</Element>
			</div>
			<div className="fordeling__graf">
				<span
					className="fordeling__graf__bar fordeling__graf__bar--forelder1"
					style={b1}>
					<span className="sr-only">{navnForelder1}:</span>
					<IntlTekst id="uker" values={{ uker: ukerF1 }} />
				</span>
				<span
					className="fordeling__graf__bar fordeling__graf__bar--forelder2"
					style={b2}>
					<span className="sr-only">{navnForelder2}:</span>
					<IntlTekst id="uker" values={{ uker: ukerF2 }} />
				</span>
			</div>
			{/* <div className="permisjonsoppsummering__forelder">
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
		</div> */}
		</div>
	);
};

export default Fordeling;
