import { addWeeks, addDays, differenceInCalendarDays, isWithinRange, isSameDay } from 'date-fns';
import {
	Grunnfordeling,
	Dekningsgrad,
	Periode,
	Stonadsperiode,
	Utsettelsesperiode,
	Periodesplitt,
	SammenslattPeriode
} from '../types';
import { forskyvTidsperiode } from './tidsperiodeUtils';
import {
	getForsteUttaksdagPaEllerForDato,
	getForsteUttaksdagForDato,
	getForsteUttaksdagPaEllerEtterDato,
	getForsteUttaksdagEtterDato
} from './uttaksdagerUtils';

export const sorterPerioder = (p1: Periode, p2: Periode) => {
	return p1.tidsperiode.startdato >= p2.tidsperiode.startdato ? 1 : -1;
};

export const leggUtsettelseInnIPeriode = (periode: Periode, utsettelse: Utsettelsesperiode): Periode[] => {
	const dagerIPeriode = differenceInCalendarDays(periode.tidsperiode.sluttdato, periode.tidsperiode.startdato);
	const dagerForsteDel = differenceInCalendarDays(utsettelse.tidsperiode.startdato, periode.tidsperiode.startdato);
	const dagerSisteDel = dagerIPeriode - dagerForsteDel;

	const forste: Stonadsperiode = {
		...(periode as Stonadsperiode),
		tidsperiode: {
			startdato: periode.tidsperiode.startdato,
			sluttdato: getForsteUttaksdagForDato(utsettelse.tidsperiode.startdato)
		}
	};
	const midt = {
		...utsettelse,
		tidsperiode: {
			startdato: getForsteUttaksdagPaEllerEtterDato(utsettelse.tidsperiode.startdato),
			sluttdato: getForsteUttaksdagPaEllerForDato(utsettelse.tidsperiode.sluttdato)
		}
	};
	const startSisteDel: Date = getForsteUttaksdagEtterDato(midt.tidsperiode.sluttdato);
	const siste: Stonadsperiode = {
		...(periode as Stonadsperiode),
		tidsperiode: {
			startdato: startSisteDel,
			sluttdato: getForsteUttaksdagPaEllerForDato(addDays(startSisteDel, dagerSisteDel - 1))
		}
	};

	return [forste, midt, siste];
};

/**
 * Finner periode som inneholder dato
 * @param perioder
 * @param dato
 */
export const finnPeriode = (perioder: Periode[], dato: Date): Periode | undefined => {
	return perioder.find((periode) => {
		return isWithinRange(dato, periode.tidsperiode.startdato, periode.tidsperiode.sluttdato);
	});
};

/**
 * Returnerer perioder før og etter en gitt periode
 * @param perioder
 * @param periode
 */
const hentPerioderForOgEtterPeriode = (perioder: Periode[], periode: Periode): Periodesplitt => {
	const index = perioder.findIndex((p) => p === periode);
	const perioderEtter = perioder.splice(index + 1);
	const perioderFor: Periode[] = [...perioder.slice(0, index)];
	return {
		perioderFor,
		perioderEtter
	};
};

export const getAntallUkerFellesperiode = (grunnfordeling: Grunnfordeling, dekningsgrad?: Dekningsgrad) => {
	const totaltAntallUker =
		dekningsgrad === '80%' ? grunnfordeling.antallUkerTotalt80 : grunnfordeling.antallUkerTotalt100;
	return (
		totaltAntallUker -
		grunnfordeling.antallUkerForelder1Totalt -
		grunnfordeling.antallUkerForelder2Totalt -
		grunnfordeling.antallUkerForelder1ForFodsel
	);
};

/**
 * Finner gyldig sluttdato for en periode ut fra antall uker den skal være og startdato
 * @param startdato
 * @param uker
 */
export const getPeriodeSluttdato = (startdato: Date, uker: number): Date => {
	let sluttdato = addDays(addWeeks(startdato, uker), -1);
	return getForsteUttaksdagPaEllerForDato(sluttdato);
};

/**
 * Legger utsettelser inn i periodene og flytter perioder som er etter utsettelsene
 *
 * @param stonadsperioder
 * @param utsettelser
 * @returns periodeliste
 */
export const leggUtsettelserTilPerioder = (
	stonadsperioder: (Stonadsperiode | SammenslattPeriode)[],
	utsettelser: Utsettelsesperiode[]
): Periode[] => {
	if (utsettelser.length === 0) {
		return stonadsperioder;
	}
	let perioder: Periode[] = stonadsperioder.map((p) => p);
	utsettelser.forEach((utsettelse) => {
		perioder = leggTilUtsettelse(perioder, utsettelse);
	});
	return perioder;
};

/**
 * Finner periode som er berørt av utsettelse, splitter den i to og
 * legger inn utsettelse i mellom. Flytter dato for påfølgende perioder
 * @param perioder
 * @param utsettelse
 */
export const leggTilUtsettelse = (perioder: Periode[], utsettelse: Utsettelsesperiode): Periode[] => {
	const periode = finnPeriode(perioder, utsettelse.tidsperiode.startdato);
	if (!periode) {
		throw 'Ingen periode funnet som passer til utsettelse';
	}

	if (isSameDay(periode.tidsperiode.startdato, utsettelse.tidsperiode.startdato)) {
		return leggTilUtsettelseEtterPeriode(perioder, periode, utsettelse);
	} else {
		return leggTilUtsettelseIPeriode(perioder, periode, utsettelse);
	}
};

export const leggTilUtsettelseEtterPeriode = (
	perioder: Periode[],
	periode: Periode,
	utsettelse: Utsettelsesperiode
): Periode[] => {
	const { perioderFor, perioderEtter } = hentPerioderForOgEtterPeriode(perioder, periode);
	return [
		...perioderFor,
		...[utsettelse],
		...forskyvPerioder([periode, ...perioderEtter], getForsteUttaksdagEtterDato(utsettelse.tidsperiode.sluttdato))
	];
};

export const leggTilUtsettelseIPeriode = (
	perioder: Periode[],
	periode: Periode,
	utsettelse: Utsettelsesperiode
): Periode[] => {
	const { perioderFor, perioderEtter } = hentPerioderForOgEtterPeriode(perioder, periode);
	const periodeSplittetMedUtsettelse = leggUtsettelseInnIPeriode(periode, utsettelse);
	const sisteSplittetPeriode = periodeSplittetMedUtsettelse[2];
	return [
		...perioderFor,
		...periodeSplittetMedUtsettelse,
		...forskyvPerioder(perioderEtter, getForsteUttaksdagEtterDato(sisteSplittetPeriode.tidsperiode.sluttdato))
	];
};

/**
 * Forskyver alle perioder ut fra ny startdato
 * @param perioder
 * @param startdato
 */
export const forskyvPerioder = (perioder: Periode[], startdato: Date): Periode[] => {
	let forrigeDato = startdato;
	return perioder.map((periode) => {
		const dager = differenceInCalendarDays(forrigeDato, periode.tidsperiode.startdato);
		const tidsperiode = forskyvTidsperiode(periode.tidsperiode, dager);
		forrigeDato = tidsperiode.sluttdato;
		return {
			...periode,
			tidsperiode
		};
	});
};
