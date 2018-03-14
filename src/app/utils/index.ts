import { Tidsperiode } from 'app/types';
import { Range } from 'shared/components/dateInput/DateInput';
import { isWithinRange } from 'date-fns';
import { erUttaksdag } from 'app/utils/uttaksdagerUtils';

export type DatoValideringsfeil =
	| 'ikkeUttaksdag'
	| 'utenforPerioder'
	| 'ugyldigDato'
	| 'innenforUlovligPeriode'
	| 'innenforForsteSeksUker'
	| undefined;

/**
 * Fjerner klokkeslett på dato
 */
export const normaliserDato = (dato: Date): Date =>
	new Date(dato.getFullYear(), dato.getMonth(), dato.getDate());

export const nyDato = (datostring?: string): Date =>
	normaliserDato(datostring ? new Date(datostring) : new Date());

export const separerTekstArray = (tekster: string[]): string => {
	const arr = [...tekster];
	const siste = arr.pop();
	return `${arr.join(', ')} og ${siste}`;
};

export const validerDato = (
	dato: Date,
	tidsrom: Tidsperiode,
	ugyldigePerioder: Range[] = [],
	termindato?: Date
): DatoValideringsfeil => {
	if (!dato) {
		return 'ugyldigDato';
	}
	if (
		!isWithinRange(
			normaliserDato(dato),
			normaliserDato(tidsrom.startdato),
			normaliserDato(tidsrom.sluttdato)
		)
	) {
		return 'innenforForsteSeksUker';
	}
	if (
		termindato &&
		!isWithinRange(
			normaliserDato(dato),
			normaliserDato(termindato),
			normaliserDato(tidsrom.startdato)
		)
	) {
		return 'utenforPerioder';
	}
	if (!erUttaksdag(dato)) {
		return 'ikkeUttaksdag';
	}
	let gyldig: DatoValideringsfeil = undefined;
	ugyldigePerioder.forEach((p) => {
		if (gyldig && isWithinRange(dato, p.from, p.to)) {
			gyldig = 'innenforUlovligPeriode';
		}
	});
	return gyldig;
};
