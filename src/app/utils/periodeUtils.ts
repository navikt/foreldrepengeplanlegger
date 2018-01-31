import { addWeeks, addDays, getISODay } from 'date-fns';

import {
	Tidsperiode,
	Stonadsperiode,
	StonadskontoType,
	Periodetype,
	Grunnfordeling,
	Dekningsgrad,
	Periode,
	Stonadskontoer
} from 'app/types';
import { Forelder } from 'app/redux/types';
import Periodeberegner from 'app/utils/Periodeberegner';

export const getPeriodedetaljer = (periode: Periode): string => {
	const tidsperiode = `
	${periode.tidsperiode.startdato.toDateString()} -> ${periode.tidsperiode.sluttdato.toDateString()}`;

	switch (periode.type) {
		case Periodetype.Stonadsperiode:
			const konto = `Stønadsperiode. ${periode.konto}`;
			let forelder;
			switch (periode.konto) {
				case StonadskontoType.Fedrekvote:
				case StonadskontoType.Modrekvote:
					forelder = periode.forelder;
					break;
				default:
					forelder = undefined;
			}
			return `${konto}. ${forelder ? `${forelder}. ` : ''} ${tidsperiode}`;
		case Periodetype.Utsettelse:
			const arsak = `Stønadsperiode. ${periode.arsak}`;
			return `Utsettelse. ${arsak}. ${forelder}. ${tidsperiode}`;
		default:
			return `Ukjent type: ${periode}`;
	}
};

export const getPerioderUtenUtsettelser = (
	termindato: Date,
	dekningsgrad: Dekningsgrad,
	grunnfordeling: Grunnfordeling,
	fellesukerForelder1: number,
	fellesukerForelder2: number
): Periode[] => {
	const periodeberegner = Periodeberegner(
		{
			termindato,
			dekningsgrad,
			fellesukerForelder1,
			fellesukerForelder2
		},
		grunnfordeling
	);

	const perioder: Periode[] = [
		{
			type: Periodetype.Stonadsperiode,
			forelder: 'forelder1',
			konto: StonadskontoType.Modrekvote,
			tidsperiode: periodeberegner.getModrekvotePreTermin()
		},
		{
			type: Periodetype.Stonadsperiode,
			forelder: 'forelder1',
			konto: StonadskontoType.Modrekvote,
			tidsperiode: periodeberegner.getModrekvotePostTermin()
		},
		{
			type: Periodetype.Stonadsperiode,
			forelder: 'forelder1',
			konto: StonadskontoType.Fellesperiode,
			tidsperiode: periodeberegner.getFellesperiodeForelder1()
		},
		{
			type: Periodetype.Stonadsperiode,
			forelder: 'forelder2',
			konto: StonadskontoType.Fellesperiode,
			tidsperiode: periodeberegner.getFellesperiodeForelder2()
		},
		{
			type: Periodetype.Stonadsperiode,
			forelder: 'forelder2',
			konto: StonadskontoType.Fedrekvote,
			tidsperiode: periodeberegner.getFedrekvote()
		}
	];

	return perioder;

	// const periodePostTermin = getPeriodePostTermin(termindato, grunnfordeling.antallUkerForelder1Totalt);
	// const morFellesperiode = getStonadsperiode(
	// 	getForsteUttaksdagEtterDato(periodePostTermin.tidsperiode.sluttdato),
	// 	fellesukerForelder1,
	// 	'forelder1',
	// 	StonadskontoType.Fellesperiode
	// );
	// const farFellesperiode = getStonadsperiode(
	// 	getForsteUttaksdagEtterDato(morFellesperiode.tidsperiode.sluttdato),
	// 	fellesukerForelder2,
	// 	'forelder2',
	// 	StonadskontoType.Fellesperiode
	// );
	// const farFedrekvote = getStonadsperiode(
	// 	getForsteUttaksdagEtterDato(farFellesperiode.tidsperiode.sluttdato),
	// 	grunnfordeling.antallUkerForelder2Totalt,
	// 	'forelder2',
	// 	StonadskontoType.Fedrekvote
	// );

	// return [periodePreTermin, periodePostTermin, morFellesperiode, farFellesperiode, farFedrekvote];
};

// export const getPeriodePreTermin = (termindato: Date, uker: number): Stonadsperiode => ({
// 	type: Periodetype.Stonadsperiode,
// 	konto: StonadskontoType.Modrekvote,
// 	forelder: 'forelder1',
// 	tidsperiode: getTidsperiodePreTermin(termindato, uker)
// });

// export const getPeriodePostTermin = (termindato: Date, uker: number): Stonadsperiode => ({
// 	type: Periodetype.Stonadsperiode,
// 	konto: StonadskontoType.Modrekvote,
// 	forelder: 'forelder1',
// 	tidsperiode: getTidsperiodePostTermin(termindato, uker)
// });

export const getStonadsperiode = (
	startdato: Date,
	uker: number,
	forelder: Forelder,
	konto: Stonadskontoer
): Stonadsperiode => {
	return {
		type: Periodetype.Stonadsperiode,
		konto,
		forelder,
		tidsperiode: {
			startdato,
			sluttdato: getPeriodesluttDato(startdato, uker)
		}
	};
};

/**
 * Finner tidsperiode for mors permisjon før termin
 * @param termindato
 */
export const getTidsperiodePreTermin = (termindato: Date, uker: number): Tidsperiode => {
	const startdato = getStartdatoUtFraTermindato(termindato, uker);
	return {
		startdato,
		sluttdato: getPeriodesluttDato(startdato, uker)
	};
};

/**
 * Finner tidsperiode for mors permisjon etter fødsel
 *
 * @param termindato
 */
export const getTidsperiodePostTermin = (termindato: Date, uker: number): Tidsperiode => {
	return {
		startdato: termindato,
		sluttdato: getPeriodesluttDato(termindato, uker)
	};
};

/**
 * Finner startdato for permisjonsperiode
 *
 * @param termin
 * @param uker antall uker som er forbeholdt denne perioden
 */
export const getStartdatoUtFraTermindato = (termin: Date, uker: number): Date => {
	return getForsteUttaksdagPaEllerEtterDato(addWeeks(termin, -1 * uker));
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
 * Sjekker om dato er en ukedag, dersom ikke finner den foregående fredag
 * @param dato
 */
export const getForsteUkedagPaEllerForDato = (dato: Date): Date => {
	switch (getUkedag(dato)) {
		case 6:
			return addDays(dato, -1);
		case 7:
			return addDays(dato, -2);
		default:
			return dato;
	}
};

export const getAntallUkerFellesperiode = (grunnfordeling: Grunnfordeling, dekningsgrad?: Dekningsgrad) => {
	const totaltAntallUker =
		dekningsgrad === '80%' ? grunnfordeling.antallUkerTotalt80 : grunnfordeling.antallUkerTotalt100;
	return totaltAntallUker - grunnfordeling.antallUkerForelder1Totalt - grunnfordeling.antallUkerForelder2Totalt;
};

export const getUkedag = (dato: Date) => getISODay(dato);

/**
 * Finner gyldig sluttdato for en periode ut fra antall uker den skal være og startdato
 * @param startdato
 * @param uker
 */
export const getPeriodesluttDato = (startdato: Date, uker: number): Date => {
	let sluttdato = addDays(addWeeks(startdato, uker), -1);
	// return erUttaksdag(sluttdato)
	// if (erUttaksdag(sluttdato)) {
	// 	return sluttdato;
	// }
	return getForsteUkedagPaEllerForDato(sluttdato);
};

export const erUttaksdag = (dato: Date): boolean => getISODay(dato) !== 6 && getISODay(dato) !== 7;

export function kalkulerUttaksdagerIPeriode(start: Date, slutt: Date): number {
	if (start > slutt) {
		return -1;
	}
	let startDato = new Date(start.getTime());
	let sluttDato = new Date(slutt.getTime());
	let antall = 0;
	while (startDato <= sluttDato) {
		if (start.getDay() !== 0 && start.getDay() !== 6) {
			antall++;
		}
		startDato.setDate(startDato.getDate() + 1);
	}
	return antall;
}
