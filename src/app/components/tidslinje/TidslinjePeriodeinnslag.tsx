import * as React from 'react';

import Callout, { CalloutBorderColor } from 'app/components/callout/Callout';
import { Periodeinnslag } from 'app/components/tidslinje/types';
import TidsperiodeTekst from 'app/components/tidslinje/TidsperiodeTekst';
import {
	Periodetype,
	Stonadsperiode,
	StonadskontoType,
	Tidsperiode,
	Forelder
} from 'app/types';
import { getAntallUttaksdagerITidsperiode } from 'app/utils/uttaksdagerUtils';
import { grunnfordeling } from 'app/data/grunnfordeling';
import Tekst from 'app/tekst';

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

const Utsettelse: React.StatelessComponent<Props> = ({
	innslag,
	navnForelder1,
	navnForelder2
}) => {
	return (
		<InnslagLayout tidsperiode={innslag.periode.tidsperiode}>
			Utsettelse
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
			startdato: periode.tidsperiode.startdato,
			sluttdato: innslag.nestePeriode
				? innslag.nestePeriode.tidsperiode.sluttdato
				: periode.tidsperiode.sluttdato
		};

		const dagerTotalt = getAntallUttaksdagerITidsperiode(tidsperiode);
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

/**
 *
 * @param props Et innslag i tidslinjen
 */
const TidslinjePeriodeinnslag: React.StatelessComponent<Props> = (props) => {
	const { innslag } = props;

	const getForelderNavn = (forelder: Forelder): string =>
		forelder === 'forelder1' ? props.navnForelder1 : props.navnForelder2;

	const getInnslagbeskrivelse = (): React.ReactNode => {
		// Dette er en fortsettelse av forrige innslag
		if (
			innslag.periode.type !== Periodetype.Utsettelse &&
			innslag.forrigePeriode &&
			innslag.forrigePeriode.forelder === innslag.periode.forelder
		) {
			return (
				<InnslagLayout>
					{getForelderNavn(innslag.periode.forelder)} fortsetter sin permisjon.
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
			<Callout borderColor={getInnslagfarge(innslag)}>
				{getInnslagbeskrivelse()}
			</Callout>
		</div>
	);
};
export default TidslinjePeriodeinnslag;
