import { Tidsperiode } from 'app/types';
import { Range } from 'shared/components/dateInput/DateInput';
import { isWithinRange } from 'date-fns';

/**
 * Fjerner klokkeslett på dato
 */
export const normaliserDato = (dato: Date): Date =>
	new Date(dato.getFullYear(), dato.getMonth(), dato.getDate());

export const separerTekstArray = (tekster: string[]): string => {
	const arr = [...tekster];
	const siste = arr.pop();
	return `${arr.join(', ')} og ${siste}`;
};

export const erGyldigDato = (
	dato: Date,
	tidsrom: Tidsperiode,
	ugyldigePerioder: Range[] = []
): boolean => {
	if (!isWithinRange(dato, tidsrom.startdato, tidsrom.sluttdato)) {
		return false;
	}
	let gyldig = true;
	ugyldigePerioder.forEach((p) => {
		if (gyldig && isWithinRange(dato, p.from, p.to)) {
			gyldig = false;
		}
	});
	return gyldig;
};
