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
		termindato,
		dekningsgrad,
		fellesukerForelder1,
		fellesukerForelder2,
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

export const sorterPerioder = (p1: Periode, p2: Periode) => {
	return p1.tidsperiode.startdato >= p2.tidsperiode.startdato ? 1 : -1;
};

export const leggUtsettelseInnIPeriode = (periode: Periode, utsettelse: Utsettelsesperiode): Periode[] => {
	const dagerIPeriode = differenceInCalendarDays(periode.tidsperiode.sluttdato, periode.tidsperiode.startdato);
	const dagerForsteDel = differenceInCalendarDays(periode.tidsperiode.startdato, utsettelse.tidsperiode.startdato);
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

export const finnUtsettelserIPeriode = (periode: Periode, utsettelser: Utsettelsesperiode[]): Utsettelsesperiode[] =>
	utsettelser.filter((u) =>
		isWithinRange(u.tidsperiode.startdato, periode.tidsperiode.startdato, periode.tidsperiode.sluttdato)
	);

export const finnPeriodeMedDato = (perioder: Periode[], dato: Date): Periode | undefined => {
	return perioder.find((periode) => {
		return isWithinRange(dato, periode.tidsperiode.startdato, periode.tidsperiode.sluttdato);
	});
};

export const getAntallDagerITidsperiode = (tidsperiode: Tidsperiode): number => {
	return differenceInCalendarDays(tidsperiode.sluttdato, tidsperiode.startdato);
};

export const flyttTidsperiode = (tidsperiode: Tidsperiode, startdato: Date): Tidsperiode => {
	return {
		startdato,
		sluttdato: addDays(startdato, getAntallDagerITidsperiode(tidsperiode))
	};
};

interface Periodesplitt {
	perioderFor: Periode[];
	perioderEtter: Periode[];
}
export const hentPerioderForOgEtterPeriode = (perioder: Periode[], periode: Periode): Periodesplitt => {
	const index = perioder.findIndex((p) => p === periode);
	const perioderEtter = perioder.splice(index + 1);
	const perioderFor: Periode[] = [...perioder.slice(0, index)];
	return {
		perioderFor,
		perioderEtter
	};
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
	while (startDato <= sluttDato) {
		if (erUttaksdag(startDato)) {
			antall++;
		}
		startDato.setDate(startDato.getDate() + 1);
	}
	return antall;
}

/**
 * Fjerner klokkeslett på dato
 */
export const normaliserDato = (dato: Date): Date => new Date(dato.getFullYear(), dato.getMonth(), dato.getDate());
