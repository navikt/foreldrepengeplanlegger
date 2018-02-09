import { addDays, isWithinRange, isSameDay } from 'date-fns';
import {
	Grunnfordeling,
	Dekningsgrad,
	Periode,
	Stonadsperiode,
	Utsettelsesperiode,
	Periodesplitt,
	SammenslattPeriode,
	Tidsperiode,
	Forelder
} from 'app/types';
import {
	getForsteUttaksdagPaEllerForDato,
	getForsteUttaksdagForDato,
	getForsteUttaksdagPaEllerEtterDato,
	getForsteUttaksdagEtterDato,
	leggUttaksdagerTilDato,
	getAntallUttaksdagerITidsperiode
} from './uttaksdagerUtils';

/**
 * Sorterer perioder ut fra startdato - asc
 * @param p1
 * @param p2
 */
export const sorterPerioder = (p1: Periode, p2: Periode) => {
	return p1.tidsperiode.startdato >= p2.tidsperiode.startdato ? 1 : -1;
};

/**
 * Finner periode som inneholder dato
 * @param perioder
 * @param dato
 */
export const finnPeriode = (
	perioder: Periode[],
	dato: Date
): Periode | undefined => {
	return perioder.find((periode) => {
		return isWithinRange(
			dato,
			periode.tidsperiode.startdato,
			periode.tidsperiode.sluttdato
		);
	});
};

/**
 * Returnerer perioder før og etter en gitt periode
 * @param perioder
 * @param periode
 */
const hentPerioderForOgEtterPeriode = (
	perioder: Periode[],
	periode: Periode
): Periodesplitt => {
	const index = perioder.findIndex((p) => p === periode);
	const perioderEtter = perioder.splice(index + 1);
	const perioderFor: Periode[] = [...perioder.slice(0, index)];
	return {
		perioderFor,
		perioderEtter
	};
};

/**
 * Finner antall uker for fellesperiode ut fra dekningsgrad
 * @param grunnfordeling
 * @param dekningsgrad
 */
export const getAntallUkerFellesperiode = (
	grunnfordeling: Grunnfordeling,
	dekningsgrad?: Dekningsgrad
) => {
	const totaltAntallUker =
		dekningsgrad === '80%'
			? grunnfordeling.antallUkerTotalt80
			: grunnfordeling.antallUkerTotalt100;
	return (
		totaltAntallUker -
		grunnfordeling.antallUkerModrekvote -
		grunnfordeling.antallUkerFedrekvote -
		grunnfordeling.antallUkerForelder1ForFodsel
	);
};

/**
 * Finner gyldig sluttdato for en periode ut fra startdato og varighet i antall uker
 * @param startdato
 * @param uker
 */
export const getPeriodeSluttdato = (startdato: Date, uker: number): Date => {
	let sluttdato = leggUttaksdagerTilDato(startdato, uker * 5 - 1);
	return getForsteUttaksdagPaEllerForDato(sluttdato);
};

/**
 * Legger utsettelser inn i periodene og flytter perioder som er etter utsettelsene
 * @param stonadsperioder
 * @param utsettelser
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
 * legger inn utsettelse i mellom. Forskyver påfølgende perioder
 * @param perioder
 * @param utsettelse
 */
export const leggTilUtsettelse = (
	perioder: Periode[],
	utsettelse: Utsettelsesperiode
): Periode[] => {
	const periode = finnPeriode(perioder, utsettelse.tidsperiode.startdato);
	if (!periode) {
		throw 'Ingen periode funnet som passer til utsettelse';
	}

	if (
		isSameDay(periode.tidsperiode.startdato, utsettelse.tidsperiode.startdato)
	) {
		return leggTilUtsettelseEtterPeriode(perioder, periode, utsettelse);
	} else {
		return leggTilUtsettelseIPeriode(perioder, periode, utsettelse);
	}
};

/**
 * Legger inn en utsettelse etter en periode, og forskyver påfølgende perioder
 * @param perioder
 * @param periode
 * @param utsettelse
 */
export const leggTilUtsettelseEtterPeriode = (
	perioder: Periode[],
	periode: Periode,
	utsettelse: Utsettelsesperiode
): Periode[] => {
	const { perioderFor, perioderEtter } = hentPerioderForOgEtterPeriode(
		perioder,
		periode
	);
	return [
		...perioderFor,
		...[utsettelse],
		...forskyvPerioder(
			[periode, ...perioderEtter],
			getForsteUttaksdagEtterDato(utsettelse.tidsperiode.sluttdato)
		)
	];
};

/**
 * Legger en utsettelse inn i en periode og forskyver påfølgende perioder
 * @param perioder
 * @param periode
 * @param utsettelse
 */
export const leggTilUtsettelseIPeriode = (
	perioder: Periode[],
	periode: Periode,
	utsettelse: Utsettelsesperiode
): Periode[] => {
	const { perioderFor, perioderEtter } = hentPerioderForOgEtterPeriode(
		perioder,
		periode
	);
	const periodeSplittetMedUtsettelse = leggUtsettelseInnIPeriode(
		periode,
		utsettelse
	);
	const sisteSplittetPeriode = periodeSplittetMedUtsettelse[2];
	return [
		...perioderFor,
		...periodeSplittetMedUtsettelse,
		...forskyvPerioder(
			perioderEtter,
			getForsteUttaksdagEtterDato(sisteSplittetPeriode.tidsperiode.sluttdato)
		)
	];
};

/**
 * Legger en utsettelse inn i en periode og forskyver sluttdatoen for perioden
 * tilsvarende utsettelsens varighet
 * @param periode
 * @param utsettelse
 */
export const leggUtsettelseInnIPeriode = (
	periode: Periode,
	utsettelse: Utsettelsesperiode
): Periode[] => {
	const dagerIPeriode = getAntallUttaksdagerITidsperiode(periode.tidsperiode);
	const dagerForsteDel = getAntallUttaksdagerITidsperiode({
		startdato: periode.tidsperiode.startdato,
		sluttdato: addDays(utsettelse.tidsperiode.startdato, -1)
	});
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
			startdato: getForsteUttaksdagPaEllerEtterDato(
				utsettelse.tidsperiode.startdato
			),
			sluttdato: getForsteUttaksdagPaEllerForDato(
				utsettelse.tidsperiode.sluttdato
			)
		}
	};
	const startSisteDel: Date = getForsteUttaksdagEtterDato(
		midt.tidsperiode.sluttdato
	);
	const siste: Stonadsperiode = {
		...(periode as Stonadsperiode),
		tidsperiode: {
			startdato: startSisteDel,
			sluttdato: leggUttaksdagerTilDato(startSisteDel, dagerSisteDel - 1)
		}
	};
	return [forste, midt, siste];
};
/**
 * Forskyver alle perioder ut fra ny startdato
 * @param perioder
 * @param startdato
 */
export const forskyvPerioder = (
	perioder: Periode[],
	startdato: Date
): Periode[] => {
	let forrigeDato = startdato;
	return perioder.map((periode) => {
		const tidsperiode = flyttTidsperiode(
			periode.tidsperiode,
			getForsteUttaksdagPaEllerEtterDato(addDays(forrigeDato, 1))
		);
		forrigeDato = tidsperiode.sluttdato;
		return {
			...periode,
			tidsperiode
		};
	});
};

/**
 * Flytter en tidsperiode til ny startdato
 * @param tidsperiode
 * @param startdato
 */
export const flyttTidsperiode = (
	tidsperiode: Tidsperiode,
	startdato: Date
): Tidsperiode => {
	const uttaksdager = getAntallUttaksdagerITidsperiode(tidsperiode);
	const sluttdato = leggUttaksdagerTilDato(startdato, uttaksdager - 1);
	return {
		startdato,
		sluttdato
	};
};

/**
 * Henter ut antall uttaksdager for en forelder fra perioder[]. Tar ikke
 * høyde for overlappende perioder
 */
export const getUttaksdagerForForelder = (
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
