import { createSelector } from 'reselect';
import { AppState, FormState } from 'app/redux/types';
import { Utsettelsesperiode, Periode, Stonadsperiode } from 'app/types';
import {
	getStonadsperioder,
	sorterPerioder,
	finnPeriodeMedDato,
	hentPerioderForOgEtterPeriode,
	leggUtsettelseInnIPeriode
} from 'app/utils/periodeUtils';

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
		// TODO - fh: krever at utsettelse.startdato treffer en periode
		return perioder;
	}
	const { perioderFor, perioderEtter } = hentPerioderForOgEtterPeriode(perioder, periode);
	return [...perioderFor, ...leggUtsettelseInnIPeriode(periode, utsettelse), ...perioderEtter];
};
