import { addYears } from 'date-fns';
import {
	trekkUttaksdagerFraDato,
	getForsteUttaksdagPaEllerEtterDato,
	getForsteUttaksdagEtterDato,
	getAntallUttaksdagerITidsperiode
} from 'app/utils/uttaksdagerUtils';
import {
	Permisjonsregler,
	Tidsperiode,
	Dekningsgrad,
	Forelder,
	Periode,
	Utsettelsesperiode,
	UtsettelseArsakType,
	Stonadsperiode,
	Periodetype,
	StonadskontoType
} from 'app/types';
import { getPeriodeSluttdato, sorterPerioder } from 'app/utils/periodeUtils';
import { normaliserDato } from 'app/utils';

export function getPermisjonStartdato(
	termindato: Date,
	permisjonsregler: Permisjonsregler
): Date {
	return trekkUttaksdagerFraDato(
		termindato, // Siste uttaksdag i denne perioden er dagen før termin
		-1 * (permisjonsregler.antallUkerForelder1FørFødsel * 5)
	);
}

export function getSisteMuligePermisjonsdag(
	termindato: Date,
	permisjonsregler: Permisjonsregler
): Date {
	return getForsteUttaksdagPaEllerEtterDato(
		addYears(termindato, permisjonsregler.maksPermisjonslengdeIÅr)
	);
}

export function getModrekvoteFørTermin(
	termindato: Date,
	permisjonsregler: Permisjonsregler
): Tidsperiode {
	const startdato = getPermisjonStartdato(termindato, permisjonsregler);
	return {
		startdato,
		sluttdato: getPeriodeSluttdato(
			startdato,
			permisjonsregler.antallUkerForelder1FørFødsel
		)
	};
}

export function getPakrevdModrekvoteEtterTermin(
	termindato: Date,
	permisjonsregler: Permisjonsregler
): Tidsperiode {
	return {
		startdato: termindato,
		sluttdato: getPeriodeSluttdato(
			termindato,
			permisjonsregler.antallUkerForelder1EtterFødsel
		)
	};
}

export function getFrivilligModrekvoteEtterTermin(
	termindato: Date,
	permisjonsregler: Permisjonsregler
): Tidsperiode {
	const startdato = getForsteUttaksdagEtterDato(
		getPakrevdModrekvoteEtterTermin(termindato, permisjonsregler).sluttdato
	);
	return {
		startdato,
		sluttdato: getPeriodeSluttdato(
			startdato,
			permisjonsregler.antallUkerMødrekvote -
				permisjonsregler.antallUkerForelder1EtterFødsel
		)
	};
}

export function getFellesperiodeForelder1(
	termindato: Date,
	permisjonsregler: Permisjonsregler,
	fellesukerForelder1: number
): Tidsperiode {
	const startdato = getForsteUttaksdagEtterDato(
		getFrivilligModrekvoteEtterTermin(termindato, permisjonsregler).sluttdato
	);
	return {
		startdato,
		sluttdato: getPeriodeSluttdato(startdato, fellesukerForelder1)
	};
}

export function getFellesperiodeForelder2(
	termindato: Date,
	permisjonsregler: Permisjonsregler,
	fellesukerForelder1: number,
	fellesukerForelder2: number
): Tidsperiode {
	const startdato = getForsteUttaksdagEtterDato(
		fellesukerForelder1 === 0
			? getFrivilligModrekvoteEtterTermin(termindato, permisjonsregler)
					.sluttdato
			: getFellesperiodeForelder1(
					termindato,
					permisjonsregler,
					fellesukerForelder1
			  ).sluttdato
	);
	return {
		startdato,
		sluttdato: getPeriodeSluttdato(startdato, fellesukerForelder2)
	};
}

export function getFedrekvote(
	termindato: Date,
	permisjonsregler: Permisjonsregler,
	fellesukerForelder1: number,
	fellesukerForelder2: number
): Tidsperiode {
	const startdato = getForsteUttaksdagEtterDato(
		fellesukerForelder2 === 0
			? getFellesperiodeForelder1(
					termindato,
					permisjonsregler,
					fellesukerForelder1
			  ).sluttdato
			: getFellesperiodeForelder2(
					termindato,
					permisjonsregler,
					fellesukerForelder1,
					fellesukerForelder2
			  ).sluttdato
	);
	return {
		startdato,
		sluttdato: getPeriodeSluttdato(
			startdato,
			permisjonsregler.antallUkerFedrekvote
		)
	};
}

/**
 * Henter ut gyldig tidsrom å legge inn en utsettelse
 * @param termindato
 * @param dekningsgrad
 * @param permisjonsregler
 */
export function getGyldigTidsromForUtsettelse(
	termindato: Date,
	dekningsgrad: Dekningsgrad,
	permisjonsregler: Permisjonsregler,
	sisteRegistrertePermisjonsdag: Date
): Tidsperiode {
	return {
		startdato: getForsteUttaksdagEtterDato(
			getPakrevdModrekvoteEtterTermin(termindato, permisjonsregler).sluttdato
		),
		sluttdato: sisteRegistrertePermisjonsdag
	};
}

/**
 * Finner antall uker for fellesperiode ut fra dekningsgrad
 * @param permisjonsregler
 * @param dekningsgrad
 */
export function getAntallUkerFellesperiode(
	permisjonsregler: Permisjonsregler,
	dekningsgrad?: Dekningsgrad
) {
	const totaltAntallUker =
		dekningsgrad === '80%'
			? permisjonsregler.antallUkerTotalt80
			: permisjonsregler.antallUkerTotalt100;
	return (
		totaltAntallUker -
		permisjonsregler.antallUkerMødrekvote -
		permisjonsregler.antallUkerFedrekvote -
		permisjonsregler.antallUkerForelder1FørFødsel
	);
}

/**
 * Summerer opp antall uttaksdager en forelder har i gitte perioder
 * @param forelder
 * @param perioder
 */
export const getAntallStonadsdagerForForelder = (
	forelder: Forelder,
	perioder: Periode[]
): number => {
	return perioder.reduce(
		(dager: number, periode: Periode) =>
			periode.forelder === forelder
				? dager + getAntallUttaksdagerITidsperiode(periode.tidsperiode)
				: dager,
		0
	);
};

/**
 * Summerer antall uttaksdager som er registrert som ferie for en forelder
 * @param utsettelser
 * @param forelder
 */
export const getAntallFeriedagerForForelder = (
	utsettelser: Utsettelsesperiode[],
	forelder: Forelder
): number => {
	const ferier = utsettelser.filter(
		(utsettelse) =>
			utsettelse.arsak === UtsettelseArsakType.Ferie &&
			utsettelse.forelder === forelder
	);
	return ferier.length === 0
		? 0
		: ferier.reduce(
				(dager: number, periode: Utsettelsesperiode) =>
					dager + getAntallUttaksdagerITidsperiode(periode.tidsperiode),
				0
		  );
};

/** Oppretter default stønadsperioder ut fra termindato ++ */
export function opprettStønadsperioder(
	termindato: Date,
	dekningsgrad: Dekningsgrad,
	fellesukerForelder1: number,
	fellesukerForelder2: number,
	permisjonsregler: Permisjonsregler
): Stonadsperiode[] {
	termindato = normaliserDato(termindato);
	const perioder: Stonadsperiode[] = [
		{
			type: Periodetype.Stonadsperiode,
			forelder: 'forelder1',
			konto: StonadskontoType.ForeldrepengerForFodsel,
			tidsperiode: getModrekvoteFørTermin(termindato, permisjonsregler)
		},
		{
			type: Periodetype.Stonadsperiode,
			forelder: 'forelder1',
			konto: StonadskontoType.ModrekvotePakrevd,
			tidsperiode: getPakrevdModrekvoteEtterTermin(termindato, permisjonsregler)
		},
		{
			type: Periodetype.Stonadsperiode,
			forelder: 'forelder1',
			konto: StonadskontoType.Modrekvote,
			tidsperiode: getFrivilligModrekvoteEtterTermin(
				termindato,
				permisjonsregler
			)
		},
		{
			type: Periodetype.Stonadsperiode,
			forelder: 'forelder2',
			konto: StonadskontoType.Fedrekvote,
			tidsperiode: getFedrekvote(
				termindato,
				permisjonsregler,
				fellesukerForelder1,
				fellesukerForelder2
			)
		}
	];
	if (fellesukerForelder1 > 0) {
		perioder.push({
			type: Periodetype.Stonadsperiode,
			forelder: 'forelder1',
			konto: StonadskontoType.Fellesperiode,
			tidsperiode: getFellesperiodeForelder1(
				termindato,
				permisjonsregler,
				fellesukerForelder1
			)
		});
	}
	if (fellesukerForelder2 > 0) {
		perioder.push({
			type: Periodetype.Stonadsperiode,
			forelder: 'forelder2',
			konto: StonadskontoType.Fellesperiode,
			tidsperiode: getFellesperiodeForelder2(
				termindato,
				permisjonsregler,
				fellesukerForelder1,
				fellesukerForelder2
			)
		});
	}
	return perioder.sort(sorterPerioder);
}
