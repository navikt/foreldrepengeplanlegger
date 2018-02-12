import * as React from 'react';

import Callout, { CalloutBorderColor } from 'app/components/callout/Callout';
import { Periodeinnslag } from 'app/components/tidslinje/types';
import TidsperiodeTekst from 'app/components/tidslinje/TidsperiodeTekst';
import {
	Periodetype,
	Stonadsperiode,
	StonadskontoType,
	Tidsperiode,
	Forelder,
	Utsettelsesperiode,
	UtsettelseArsakType
} from 'app/types';
import { grunnfordeling } from 'app/data/grunnfordeling';
import Tekst from 'app/tekst';
import { getAntallUttaksdagerIPerioder } from 'app/utils/periodeUtils';

interface Props {
	innslag: Periodeinnslag;
	navnForelder1: string;
	navnForelder2: string;
}

const getInnslagfarge = (innslag: Periodeinnslag): CalloutBorderColor => {
	if (innslag.periode.type === Periodetype.Utsettelse) {
		return 'green';
	}
	if (innslag.periode.forelder === 'forelder1') {
		return 'purple';
	}
	return 'blue';
};

const getForelderNavn = (forelder: Forelder, props: Props): string =>
	forelder === 'forelder1' ? props.navnForelder1 : props.navnForelder2;

const Utsettelse: React.StatelessComponent<Props> = (props) => {
	const { innslag } = props;
	const periode: Utsettelsesperiode = innslag.periode as Utsettelsesperiode;
	const getArsakTekst = (arsak: UtsettelseArsakType) => {
		switch (arsak) {
			case UtsettelseArsakType.Arbeid:
				return 'arbeid';
			case UtsettelseArsakType.Ferie:
				return 'ferie';
			case UtsettelseArsakType.Sykdom:
				return 'sykdom';
			default:
				return '';
		}
	};
	return (
		<InnslagLayout tidsperiode={innslag.periode.tidsperiode}>
			{getForelderNavn(periode.forelder, props)} utsetter med{' '}
			{getArsakTekst(periode.arsak)}.
		</InnslagLayout>
	);
};

const SammenslattPeriode: React.StatelessComponent<Props> = ({
	innslag,
	navnForelder1,
	navnForelder2
}) => {
	return (
		<InnslagLayout tidsperiode={innslag.periode.tidsperiode}>
			Sammenslått periode
		</InnslagLayout>
	);
};

const Stonadsperiode: React.StatelessComponent<{
	innslag: Periodeinnslag;
	navnForelder1: string;
	navnForelder2: string;
}> = ({ innslag, navnForelder1, navnForelder2 }) => {
	const periode: Stonadsperiode = innslag.periode as Stonadsperiode;

	// Stønadsperiode før termin
	if (
		periode.konto === StonadskontoType.ForeldrepengerForFodsel &&
		innslag.nestePeriode
	) {
		const tidsperiode = {
			startdato: innslag.perioderekke[0].tidsperiode.sluttdato,
			sluttdato:
				innslag.perioderekke[innslag.perioderekke.length - 1].tidsperiode
					.sluttdato
		};

		const dagerTotalt = getAntallUttaksdagerIPerioder(innslag.perioderekke);
		const ukerTotalt = dagerTotalt / 5;
		const ukerFellespermisjon = Math.min(
			ukerTotalt -
				grunnfordeling.antallUkerModrekvote -
				grunnfordeling.antallUkerForelder1ForFodsel
		);
		const ukerModrekvote = ukerTotalt - ukerFellespermisjon;
		return (
			<InnslagLayout tidsperiode={tidsperiode}>
				{navnForelder1} starter sin permisjon: {Tekst.uker(ukerTotalt)} totalt
				oppdelt i {Tekst.uker(ukerModrekvote)} mødrekvote og{' '}
				{Tekst.uker(ukerFellespermisjon)} fellespermisjon.
			</InnslagLayout>
		);
	}
	return (
		<InnslagLayout tidsperiode={periode.tidsperiode}>
			Stønadsperiode
		</InnslagLayout>
	);
};

/**
 * HTML wrapper for innholdet i et innslag
 */
const InnslagLayout: React.StatelessComponent<{
	tidsperiode?: Tidsperiode;
	children: React.ReactNode;
}> = ({ tidsperiode, children }) => (
	<div className="m-padding-s">
		{tidsperiode && (
			<div className="periodeinnslag__dato">
				<TidsperiodeTekst tidsperiode={tidsperiode} />
			</div>
		)}
		<div className="periodeinnslag__beskrivelse">{children}</div>
	</div>
);

const erFortsettelse = (innslag: Periodeinnslag): boolean =>
	(innslag.periode.type !== Periodetype.Utsettelse &&
		innslag.forrigePeriode &&
		innslag.forrigePeriode.forelder === innslag.periode.forelder) ||
	false;

/**
 *
 * @param props Et innslag i tidslinjen
 */
const TidslinjePeriodeinnslag: React.StatelessComponent<Props> = (props) => {
	const { innslag } = props;

	const getInnslagbeskrivelse = (): React.ReactNode => {
		// Dette er en fortsettelse av forrige innslag
		if (erFortsettelse(innslag)) {
			return (
				<InnslagLayout>
					{getForelderNavn(innslag.periode.forelder, props)} fortsetter sin
					permisjon.
				</InnslagLayout>
			);
		}
		switch (innslag.periode.type) {
			case Periodetype.Utsettelse:
				return <Utsettelse {...props} />;
			case Periodetype.SammenslattPeriode:
				return <SammenslattPeriode {...props} />;
			case Periodetype.Stonadsperiode:
				return <Stonadsperiode {...props} />;
			default:
				return <div />;
		}
	};

	return (
		<div className="periodeinnslag">
			<Callout
				borderColor={getInnslagfarge(innslag)}
				hideArrow={erFortsettelse(innslag)}>
				{getInnslagbeskrivelse()}
			</Callout>
		</div>
	);
};
export default TidslinjePeriodeinnslag;
