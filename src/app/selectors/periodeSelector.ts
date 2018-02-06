import { createSelector } from 'reselect';
import { AppState, FormState } from 'app/redux/types';
import { Utsettelsesperiode, Periode, Stonadsperiode, Tidsperiode } from 'app/types';
import {
	getStonadsperioder,
	sorterPerioder,
	finnPeriodeMedDato,
	hentPerioderForOgEtterPeriode,
	leggUtsettelseInnIPeriode,
	getForsteUttaksdagEtterDato,
	getForsteUttaksdagPaEllerEtterDato,
	kalkulerUttaksdagerIPeriode
} from 'app/utils/periodeUtils';
import { differenceInCalendarDays, addDays, isSameDay } from 'date-fns';

const formSelector = (state: AppState) => state.form;
const utsettelseSelector = (state: AppState) => state.utsettelse.utsettelser;

/**
 * Henter ut alle perioder gitt formState og utsettelser
 */
export const periodeSelector = createSelector(
	formSelector,
	utsettelseSelector,
	(form: FormState, utsettelser: Utsettelsesperiode[]): Periode[] => {
		if (!form.termindato || !form.dekningsgrad) {
			return [];
		}
		const stonadsperioder: Stonadsperiode[] = getStonadsperioder(
			form.termindato,
			form.dekningsgrad,
			form.grunnfordeling,
			form.ukerForelder1 || 0,
			form.ukerForelder2 || 0
		).sort(sorterPerioder);
		return settInnUtsettelser(stonadsperioder, utsettelser);
	}
);

/**
 * Legger utsettelser inn i periodene og flytter perioder som er etter utsettelsene
 *
 * @param stonadsperioder
 * @param utsettelser
 * @returns periodeliste
 */
const settInnUtsettelser = (stonadsperioder: Stonadsperiode[], utsettelser: Utsettelsesperiode[]): Periode[] => {
	if (utsettelser.length === 0) {
		return stonadsperioder;
	}
	let perioder: Periode[] = ([] as Periode[]).concat(stonadsperioder);
	utsettelser.forEach((utsettelse) => {
		perioder = settInnUtsettelse(perioder, utsettelse);
	});
	return perioder;
};

/**
 * Finner periode som er berørt av utsettelse, splitter den i to og
 * legger inn utsettelse i mellom. Flytter dato for påfølgende perioder
 * @param perioder
 * @param utsettelse
 */
const settInnUtsettelse = (perioder: Periode[], utsettelse: Utsettelsesperiode): Periode[] => {
	const periode = finnPeriodeMedDato(perioder, utsettelse.tidsperiode.startdato);
	if (!periode) {
		throw 'Ingen periode funnet som passer til utsettelse';
	}

	// Finn periode som skal forskyves
	if (isSameDay(periode.tidsperiode.startdato, utsettelse.tidsperiode.startdato)) {
		const { perioderFor, perioderEtter } = hentPerioderForOgEtterPeriode(perioder, periode);
		return [
			...perioderFor,
			...[utsettelse],
			...flyttPerioderUtFraDato(
				[periode, ...perioderEtter],
				getForsteUttaksdagEtterDato(utsettelse.tidsperiode.sluttdato)
			)
		];
	} else {
		return settInnUtsettelseIPeriode(perioder, periode, utsettelse);
	}
};

const settInnUtsettelseIPeriode = (
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
		...flyttPerioderUtFraDato(perioderEtter, getForsteUttaksdagEtterDato(sisteSplittetPeriode.tidsperiode.sluttdato))
	];
};

const flyttPerioderUtFraDato = (perioder: Periode[], dato: Date): Periode[] => {
	let forrigeDato = dato;
	return perioder.map((periode) => {
		const dager = differenceInCalendarDays(forrigeDato, periode.tidsperiode.startdato);
		const tidsperiode = flyttTidsperiodeDager(periode.tidsperiode, dager);
		forrigeDato = tidsperiode.sluttdato;
		return {
			...periode,
			tidsperiode
		};
	});
};

const flyttTidsperiodeDager = (tidsperiode: Tidsperiode, dager: number): Tidsperiode => {
	const periodedager = kalkulerUttaksdagerIPeriode(tidsperiode.startdato, tidsperiode.sluttdato);
	const startdato = getForsteUttaksdagPaEllerEtterDato(addDays(tidsperiode.startdato, dager));
	const sluttdato = getForsteUttaksdagPaEllerEtterDato(addDays(startdato, periodedager));
	return {
		startdato,
		sluttdato
	};
};
