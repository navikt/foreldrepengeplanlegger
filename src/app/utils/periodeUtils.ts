import { addWeeks, addDays, getISODay, differenceInCalendarDays, isWithinRange } from 'date-fns';

import {
	Tidsperiode,
	StonadskontoType,
	Periodetype,
	Grunnfordeling,
	Dekningsgrad,
	Periode,
	Stonadsperiode,
	Utsettelsesperiode
} from 'app/types';
import Periodeberegner from 'app/utils/Periodeberegner';

/**
 * Setter opp basisoppsett for perioder uten utsettelser hvor
 * mor tar første del av permisjonen og fedrekvote er etter
 * fellesperiode
 * @param termindato
 * @param dekningsgrad
 * @param grunnfordeling
 * @param fellesukerForelder1
 * @param fellesukerForelder2
 */
export const getStonadsperioder = (
	termindato: Date,
	dekningsgrad: Dekningsgrad,
	grunnfordeling: Grunnfordeling,
	fellesukerForelder1: number,
	fellesukerForelder2: number
): Stonadsperiode[] => {
	const periodeberegner = Periodeberegner(
		{
			termindato,
			dekningsgrad,
			fellesukerForelder1,
			fellesukerForelder2
		},
		grunnfordeling
	);
	const perioder: Stonadsperiode[] = [
		{
			type: Periodetype.Stonadsperiode,
			forelder: 'forelder1',
			konto: StonadskontoType.Modrekvote,
			tidsperiode: periodeberegner.getModrekvotePreTermin(),
			fastPeriode: true
		},
		{
			type: Periodetype.Stonadsperiode,
			forelder: 'forelder1',
			konto: StonadskontoType.Modrekvote,
			tidsperiode: periodeberegner.getModrekvotePostTermin(),
			fastPeriode: true
		},
		{
			type: Periodetype.Stonadsperiode,
			forelder: 'forelder2',
			konto: StonadskontoType.Fedrekvote,
			tidsperiode: periodeberegner.getFedrekvote()
		}
	];
	if (fellesukerForelder1 > 0) {
		perioder.push({
			type: Periodetype.Stonadsperiode,
			forelder: 'forelder1',
			konto: StonadskontoType.Fellesperiode,
			tidsperiode: periodeberegner.getFellesperiodeForelder1()
		});
	}
	if (fellesukerForelder2 > 0) {
		perioder.push({
			type: Periodetype.Stonadsperiode,
			forelder: 'forelder2',
			konto: StonadskontoType.Fellesperiode,
			tidsperiode: periodeberegner.getFellesperiodeForelder2()
		});
	}
	return perioder;
};

/**
 * Legger inn utsettelser i periodene, og splitter perioden hvor
 * utsettelsen skal være
 * @param perioder
 * @param alleUtsettelser
 */
export const leggInnUtsettelerIPerioder = (
	perioder: Stonadsperiode[],
	alleUtsettelser: Utsettelsesperiode[]
): Periode[] => {
	const p: Periode[] = [];
	perioder.forEach((periode) => {
		const utsettelserIPeriode = finnUtsettelserIPeriode(periode, alleUtsettelser);
		if (utsettelserIPeriode.length === 0) {
			p.push(periode);
			return;
		}
		utsettelserIPeriode.forEach((u) => {
			const dagerIPeriode = differenceInCalendarDays(periode.tidsperiode.sluttdato, periode.tidsperiode.startdato);
			const dagerForsteDel = differenceInCalendarDays(periode.tidsperiode.sluttdato, u.tidsperiode.startdato);
			const dagerSisteDel = dagerIPeriode - dagerForsteDel;
			p.push({
				...(periode as Stonadsperiode),
				tidsperiode: {
					startdato: periode.tidsperiode.startdato,
					sluttdato: getForsteUttaksdagForDato(u.tidsperiode.startdato)
				}
			});
			const utsettelse = {
				...(u as Utsettelsesperiode),
				tidsperiode: {
					startdato: getForsteUttaksdagForDato(u.tidsperiode.startdato),
					sluttdato: getForsteUttaksdagPaEllerForDato(u.tidsperiode.sluttdato)
				}
			};
			console.log(utsettelse);
			p.push(utsettelse);
			p.push({
				...(periode as Stonadsperiode),
				tidsperiode: {
					startdato: getForsteUttaksdagEtterDato(u.tidsperiode.sluttdato),
					sluttdato: getForsteUttaksdagPaEllerForDato(addDays(u.tidsperiode.sluttdato, dagerSisteDel))
				}
			});
		});
	});
	return p;
};

export const finnUtsettelserIPeriode = (periode: Periode, utsettelser: Utsettelsesperiode[]): Utsettelsesperiode[] =>
	utsettelser.filter((u) =>
		isWithinRange(u.tidsperiode.startdato, periode.tidsperiode.startdato, periode.tidsperiode.sluttdato)
	);
/**
 * Justerer datoer på perioder ut fra om det er låst eller ikke
 * @param perioder
 */
export const justerPerioderMedUtsettelser = (perioder: Periode[]): Periode[] => {
	const justertePerioder: Periode[] = [];
	let sluttdatoForrigePeriode: Date;
	perioder.forEach((periode) => {
		if (periode.fastPeriode) {
			justertePerioder.push(periode);
			sluttdatoForrigePeriode = periode.tidsperiode.sluttdato;
		} else {
			const dagerIPeriode = differenceInCalendarDays(periode.tidsperiode.sluttdato, periode.tidsperiode.startdato);
			const startdato = getForsteUttaksdagEtterDato(sluttdatoForrigePeriode);
			const sluttdato = getForsteUttaksdagEtterDato(addDays(startdato, dagerIPeriode));
			// let sluttdato;
			// if (periode.type === Periodetype.Utsettelse) {
			// 	sluttdato = getForsteUttaksdagPaEllerForDato(addDays(startdato, dagerIPeriode));
			// } else {
			// 	sluttdato = getForsteUttaksdagEtterDato(addDays(startdato, dagerIPeriode));
			// }
			// console.log(sluttdato);
			justertePerioder.push({
				...periode,
				tidsperiode: {
					startdato,
					sluttdato
				}
			});
			sluttdatoForrigePeriode = periode.tidsperiode.sluttdato;
		}
	});
	return justertePerioder;
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

export const getForsteUttaksdagForDato = (dato: Date): Date => {
	return getForsteUttaksdagPaEllerForDato(addDays(dato, -1));
};

export const getAntallUkerFellesperiode = (grunnfordeling: Grunnfordeling, dekningsgrad?: Dekningsgrad) => {
	const totaltAntallUker =
		dekningsgrad === '80%' ? grunnfordeling.antallUkerTotalt80 : grunnfordeling.antallUkerTotalt100;
	return totaltAntallUker - grunnfordeling.antallUkerForelder1Totalt - grunnfordeling.antallUkerForelder2Totalt;
};

export const getUkedag = (dato: Date) => getISODay(dato);

export const erUttaksdag = (dato: Date): boolean => getISODay(dato) !== 6 && getISODay(dato) !== 7;

/**
 * Finner gyldig sluttdato for en periode ut fra antall uker den skal være og startdato
 * @param startdato
 * @param uker
 */
export const getPeriodesluttDato = (startdato: Date, uker: number): Date => {
	let sluttdato = addDays(addWeeks(startdato, uker), -1);
	return getForsteUttaksdagPaEllerForDato(sluttdato);
};

export function kalkulerUttaksdagerIPeriode(start: Date, slutt: Date): number {
	if (start > slutt) {
		return -1;
	}
	let startDato = new Date(start.getTime());
	let sluttDato = new Date(slutt.getTime());
	let antall = 0;
	while (startDato < sluttDato) {
		if (erUttaksdag(startDato)) {
			antall++;
		}
		startDato.setDate(startDato.getDate() + 1);
	}
	return antall;
}
