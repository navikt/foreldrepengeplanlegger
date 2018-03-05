import { addDays, getISODay } from 'date-fns';
import { Tidsperiode, Periodetype, Periode } from 'app/types';

export const getUkedag = (dato: Date) => getISODay(dato);

export const erUttaksdag = (dato: Date): boolean =>
	getUkedag(dato) !== 6 && getUkedag(dato) !== 7;

/**
 * Finner første uttaksdag før dato
 * @param dato
 */
export const getForsteUttaksdagForDato = (dato: Date): Date => {
	return getForsteUttaksdagPaEllerForDato(addDays(dato, -1));
};

/**
 * Sjekker om dato er en ukedag, dersom ikke finner den foregående fredag
 * @param dato
 */
export const getForsteUttaksdagPaEllerForDato = (dato: Date): Date => {
	switch (getUkedag(dato)) {
		case 6:
			return addDays(dato, -1);
		case 7:
			return addDays(dato, -2);
		default:
			return dato;
	}
};

/**
 * Første gyldige uttaksdag etter dato
 * @param termin
 */
export const getForsteUttaksdagEtterDato = (dato: Date): Date =>
	getForsteUttaksdagPaEllerEtterDato(addDays(dato, 1));

/**
 * Sjekker om dato er en ukedag, dersom ikke finner den nærmeste påfølgende mandag
 * @param dato
 */
export const getForsteUttaksdagPaEllerEtterDato = (dato: Date): Date => {
	switch (getUkedag(dato)) {
		case 6:
			return addDays(dato, 2);
		case 7:
			return addDays(dato, 1);
		default:
			return dato;
	}
};

/**
 * Summerer antall uttaksdager som er i periodene
 * @param perioder
 */
export const getAntallUttaksdagerIPerioder = (perioder: Periode[]): number => {
	return perioder.reduce((dager: number, periode: Periode) => {
		if (periode.type !== Periodetype.Utsettelse) {
			return dager + getAntallUttaksdagerITidsperiode(periode.tidsperiode);
		}
		return dager;
	}, 0);
};

/**
 * Summerer antall uttaksdager i angitt tidsperiode
 */
export const getAntallUttaksdagerITidsperiode = (
	tidsperiode: Tidsperiode
): number => {
	if (tidsperiode.startdato > tidsperiode.sluttdato) {
		return -1;
	}
	let startDato = new Date(tidsperiode.startdato.getTime());
	let sluttDato = new Date(tidsperiode.sluttdato.getTime());
	let antall = 0;
	while (startDato <= sluttDato) {
		if (erUttaksdag(startDato)) {
			antall++;
		}
		startDato.setDate(startDato.getDate() + 1);
	}
	return antall;
};

export interface UkerOgDager {
	dager: number;
	uker: number;
}
export const getUkerOgDagerFromDager = (
	dager: number
): { uker: number; dager: number } => {
	const uker = Math.floor(dager / 5);
	return {
		dager: dager - uker * 5,
		uker
	};
};

/**
 * Legger til dager til en dato og returnerer ny dato
 * @param dato
 * @param uttaksdager
 */
export const leggUttaksdagerTilDato = (
	dato: Date,
	uttaksdager: number
): Date => {
	let nyDato = dato;
	let dagteller = 0;
	let uttaksdageteller = 0;
	while (uttaksdageteller <= uttaksdager) {
		const tellerdato = addDays(dato, dagteller++);
		if (erUttaksdag(tellerdato)) {
			nyDato = tellerdato;
			uttaksdageteller++;
		}
	}
	return nyDato;
};

/**
 * Legger til dager til en dato og returnerer ny dato
 * @param dato
 * @param uttaksdager
 */
export const utsettDatoUttaksdager = (
	dato: Date,
	uttaksdager: number
): Date => {
	let nyDato = dato;
	let dagteller = 0;
	let uttaksdageteller = 0;
	while (uttaksdageteller < uttaksdager) {
		const tellerdato = addDays(dato, dagteller++);
		if (erUttaksdag(tellerdato)) {
			nyDato = tellerdato;
			uttaksdageteller++;
		}
	}
	return nyDato;
};

/**
 * Trekker uttaksdager fra en dato og returnerer ny dato
 * @param dato
 * @param uttaksdager
 */
export const trekkUttaksdagerFraDato = (
	dato: Date,
	uttaksdager: number
): Date => {
	let nyDato = dato;
	let dagteller = 0;
	let uttaksdageteller = 0;
	while (uttaksdageteller < Math.abs(uttaksdager)) {
		const tellerdato = addDays(dato, --dagteller);
		if (erUttaksdag(tellerdato)) {
			nyDato = tellerdato;
			uttaksdageteller++;
		}
	}
	return nyDato;
};
