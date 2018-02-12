import * as React from 'react';
import {
	Stonadsperiode,
	StonadskontoType,
	Utsettelsesperiode,
	UtsettelseArsakType
} from 'app/types';
import {
	oppsummerPeriodeinnslag,
	getForelderNavn
} from 'app/components/tidslinje/tidslinjeUtils';
import InnslagLayout from 'app/components/tidslinje/elementer/InnslagLayout';
import Tekst from 'app/tekst';

import { PeriodeinnslagProps } from './Periodeinnslag';

export const StonadsperiodeBeskrivelse: React.StatelessComponent<
	PeriodeinnslagProps
> = ({ innslag, navnForelder1, navnForelder2 }) => {
	const periode: Stonadsperiode = innslag.periode as Stonadsperiode;

	// Stønadsperiode før termin
	if (
		periode.konto === StonadskontoType.ForeldrepengerForFodsel &&
		innslag.nestePeriode
	) {
		const oppsummering = oppsummerPeriodeinnslag(innslag);
		return (
			<InnslagLayout tidsperiode={oppsummering.tidsperiode}>
				{navnForelder1} starter sin permisjon:{' '}
				{Tekst.uker(oppsummering.ukerTotalt)} totalt oppdelt i{' '}
				{Tekst.uker(oppsummering.ukerModrekvote)} mødrekvote og{' '}
				{Tekst.uker(oppsummering.ukerFellespermisjon)} fellespermisjon.
			</InnslagLayout>
		);
	}
	/** Vanlig stønadperiode */
	return (
		<InnslagLayout tidsperiode={periode.tidsperiode}>
			Stønadsperiode
		</InnslagLayout>
	);
};

export const UtsettelseBeskrivelse: React.StatelessComponent<
	PeriodeinnslagProps
> = (props) => {
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
			{getForelderNavn(
				periode.forelder,
				props.navnForelder1,
				props.navnForelder2
			)}{' '}
			utsetter med {getArsakTekst(periode.arsak)}.
		</InnslagLayout>
	);
};

export const SammenslattPeriodeBeskrivelse: React.StatelessComponent<
	PeriodeinnslagProps
> = (props) => {
	return (
		<InnslagLayout tidsperiode={props.innslag.periode.tidsperiode}>
			Sammenslått periode
		</InnslagLayout>
	);
};
