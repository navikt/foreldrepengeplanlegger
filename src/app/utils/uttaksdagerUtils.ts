import { addDays, getISODay } from 'date-fns';

export const getUkedag = (dato: Date) => getISODay(dato);

export const erUttaksdag = (dato: Date): boolean => getISODay(dato) !== 6 && getISODay(dato) !== 7;

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
 * Første gyldige uttaksdag etter termin
 * @param termin
 */
export const getForsteUttaksdagEtterDato = (termin: Date): Date =>
	getForsteUttaksdagPaEllerEtterDato(addDays(termin, 1));

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
 * Finner antall dager i tidsperioden som er uttaksdager
 * @param startdato
 * @param sluttdato
 */
export function getAntallUttaksdagerITidsperiode(startdato: Date, sluttdato: Date): number {
	if (startdato > sluttdato) {
		return -1;
	}
	let startDato = new Date(startdato.getTime());
	let sluttDato = new Date(sluttdato.getTime());
	let antall = 0;
	while (startDato <= sluttDato) {
		if (erUttaksdag(startDato)) {
			antall++;
		}
		startDato.setDate(startDato.getDate() + 1);
	}
	return antall;
}
