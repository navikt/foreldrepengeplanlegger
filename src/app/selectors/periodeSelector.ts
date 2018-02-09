import { createSelector } from 'reselect';
import { AppState, FormState } from 'app/redux/types';
import {
	Utsettelsesperiode,
	Periode,
	Stonadsperiode,
	Periodetype,
	SammenslattPeriode
} from 'app/types';
import { leggUtsettelserTilPerioder } from 'app/utils/periodeUtils';
import Periodeberegner from 'app/utils/Periodeberegner';

const formSelector = (state: AppState) => state.form;
const utsettelseSelector = (state: AppState) => state.utsettelse.utsettelser;

/**
 * Henter ut sortert liste med alle stønadsperioder basert på formState
 */
export const getStonadsperioder = createSelector(
	formSelector,
	(form: FormState): Stonadsperiode[] => {
		if (!form.termindato || !form.dekningsgrad) {
			return [];
		}
		return Periodeberegner(
			form.termindato,
			form.dekningsgrad,
			form.fellesperiodeukerForelder1 || 0,
			form.fellesperiodeukerForelder2 || 0,
			form.grunnfordeling
		).opprettStonadsperioder();
	}
);

/**
 * Henter ut alle perioder gitt formState og utsettelser
 */
export const getPerioderMedUtsettelser = createSelector(
	getStonadsperioder,
	utsettelseSelector,
	(
		stonadsperioder: Stonadsperiode[],
		utsettelser: Utsettelsesperiode[]
	): Periode[] => {
		return leggUtsettelserTilPerioder(stonadsperioder, utsettelser);
	}
);

/**
 * Returnerer liste hvor påfølgende perioder med samme forelder er slått sammen til en periode
 * Perioder før termin vil ikke blir slått sammen
 */
export const getSammenslattePerioder = createSelector(
	getStonadsperioder,
	(perioder: Stonadsperiode[]): Periode[] => {
		const liste: (Stonadsperiode | SammenslattPeriode)[] = [];
		let stonadsperioderSammeForelder: Stonadsperiode[] = [];
		perioder.forEach((p, index) => {
			if (index === 0) {
				liste.push(p);
				return;
			}
			const forrige =
				stonadsperioderSammeForelder[stonadsperioderSammeForelder.length - 1];
			if (!forrige || p.forelder === forrige.forelder) {
				stonadsperioderSammeForelder.push(p);
			} else {
				if (stonadsperioderSammeForelder.length === 1) {
					liste.push(forrige);
				} else {
					liste.push(slaSammenPerioder(stonadsperioderSammeForelder));
				}
				stonadsperioderSammeForelder = [p];
			}
		});
		if (stonadsperioderSammeForelder.length === 1) {
			liste.push(stonadsperioderSammeForelder[0]);
		} else if (stonadsperioderSammeForelder.length > 1) {
			liste.push(slaSammenPerioder(stonadsperioderSammeForelder));
		}
		return liste;
	}
);

/**
 * Returnerer liste hvor påfølgende perioder med samme forelder er slått sammen til en periode
 * Perioder før termin vil ikke blir slått sammen
 */
export const getPerioderForTidslinje = createSelector(
	getSammenslattePerioder,
	utsettelseSelector,
	(
		perioder: Stonadsperiode[],
		utsettelser: Utsettelsesperiode[]
	): Periode[] => {
		return leggUtsettelserTilPerioder(perioder, utsettelser);
	}
);

/**
 * Slår sammen perioder til en periode
 * @param perioder
 */
export const slaSammenPerioder = (
	perioder: Stonadsperiode[]
): SammenslattPeriode => ({
	type: Periodetype.SammenslattPeriode,
	forelder: perioder[0].forelder,
	tidsperiode: {
		startdato: perioder[0].tidsperiode.startdato,
		sluttdato: perioder[perioder.length - 1].tidsperiode.sluttdato
	},
	perioder: perioder.map((sp) => sp)
});
