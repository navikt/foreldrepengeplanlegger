import { addWeeks, addDays, getISODay } from 'date-fns';

import {
	Tidsperiode,
	Stonadsperiode,
	StonadskontoType,
	Periodetype,
	Fellesperiode,
	Grunndata,
	Dekningsgrad,
	Utsettelsesperiode,
	Periode
} from 'app/types';

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
			return `${konto}. ${forelder}. ${tidsperiode}`;
		case Periodetype.Utsettelse:
			const arsak = `Stønadsperiode. ${periode.arsak}`;
			return `Utsettelse. ${arsak}. ${forelder}. ${tidsperiode}`;
		default:
			return `Ukjent type: ${periode}`;
	}
};

export const getPerioderMedUtsettelser = (
	termindato: Date,
	dekningsgrad: Dekningsgrad,
	utsettelser: Utsettelsesperiode[],
	grunndata: Grunndata
): Periode[] => {
	const perioder = getFastePerioder(termindato, dekningsgrad, grunndata);
	return perioder;
};

export const getFastePerioder = (termindato: Date, dekningsgrad: Dekningsgrad, grunndata: Grunndata): Periode[] => {
	const perioder: Periode[] = [];
	perioder.push(getPeriodeForTermin(termindato, grunndata.antallUkerForelder1ForFodsel));
	perioder.push(getPeriodeEtterTermin(termindato, grunndata.antallUkerForelder1EtterFodsel));
	return perioder;
};

export const getPeriodeForTermin = (termindato: Date, uker: number): Stonadsperiode => ({
	type: Periodetype.Stonadsperiode,
	konto: StonadskontoType.Modrekvote,
	forelder: 'forelder1',
	tidsperiode: getTidsperiodeForTermin(termindato, uker)
});

export const getPeriodeEtterTermin = (termindato: Date, uker: number): Stonadsperiode => ({
	type: Periodetype.Stonadsperiode,
	konto: StonadskontoType.Modrekvote,
	forelder: 'forelder1',
	tidsperiode: getTidsperiodeEtterTermin(termindato, uker)
});

export const getFellesperiode = (termindato: Date, uker: number): Fellesperiode => ({
	type: Periodetype.Stonadsperiode,
	konto: StonadskontoType.Fellesperiode,
	tidsperiode: getTidsperiodeFellesperiode(termindato, uker)
});

// export const getPeriodeEtterFellesperiode = (termindato: Date, uker: number): Uttaksperiode => ({
// 	type: Periodetype.Stonadsperiode,
// 	konto: StonadskontoType.Fedrekvote,
// 	forelder: 'forelder2',
// 	tidsperiode: getTidsperiodeEtterFellesperiode
// })
/**
 * Finner tidsperiode for mors permisjon før termin
 * @param termindato
 */
export const getTidsperiodeForTermin = (termindato: Date, uker: number): Tidsperiode => {
	const startdato = getStartdatoUtFraTermindato(termindato, uker);
	return {
		startdato,
		sluttdato: termindato
	};
};

/**
 * Finner tidsperiode for mors permisjon etter fødsel
 *
 * @param termindato
 */
export const getTidsperiodeEtterTermin = (termindato: Date, uker: number): Tidsperiode => {
	const startdato = getForsteArbeidsdagEtterTermin(termindato);
	return {
		startdato,
		sluttdato: addWeeks(startdato, uker)
	};
};

/**
 * Finner tidsperiode for medforelders permisjon på slutten av permisjonperioden
 *
 * @param termindato
 * @param uker Antall uker fellesperioden varer
 */
export const getTidsperiodeFellesperiode = (termindato: Date, uker: number): Tidsperiode => {
	const startdato = getForsteArbeidsdagEtterDato(getTidsperiodeEtterTermin(termindato, uker).sluttdato);
	return {
		startdato,
		sluttdato: addWeeks(startdato, uker)
	};
};

export const getStartdatoUtFraTermindato = (termin: Date, uker: number): Date => {
	let date = getForsteArbeidsdagEtterDato(addWeeks(termin, -1 * uker));
	return date;
};

export const getForsteDagEtterTermin = (termin: Date): Date => {
	return getForsteArbeidsdagEtterDato(addDays(termin, 1));
};

export const getForsteArbeidsdagEtterTermin = (termin: Date): Date =>
	getForsteArbeidsdagEtterDato(getForsteDagEtterTermin(termin));

export const getForsteArbeidsdagEtterDato = (dato: Date): Date => {
	switch (getUkedag(dato)) {
		case 6:
			return addDays(dato, 2);
		case 7:
			return addDays(dato, 1);
		default:
			return dato;
	}
};

export const getUkerFellesperiode = (grunndata: Grunndata, dekningsgrad?: Dekningsgrad) => {
	const totaltAntallUker = dekningsgrad === '80%' ? grunndata.antallUkerTotalt80 : grunndata.antallUkerTotalt100;
	return totaltAntallUker - grunndata.antallUkerForelder1Totalt - grunndata.antallUkerForelder2Totalt;
};

export const getUkedag = (dato: Date) => getISODay(dato);

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
