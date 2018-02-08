import { createSelector } from 'reselect';
import { AppState, FormState } from 'app/redux/types';
import { Utsettelsesperiode, Periode, Stonadsperiode, Periodetype, SammenslattPeriode } from 'app/types';
import { leggUtsettelserTilPerioder } from 'app/utils/periodeUtils';
import Periodeberegner from 'app/utils/Periodeberegner';

const formSelector = (state: AppState) => state.form;
const utsettelseSelector = (state: AppState) => state.utsettelse.utsettelser;

/**
 * Henter ut sortert liste med alle stønadsperioder basert på formState
 */
export const getStonadsperioder = createSelector(formSelector, (form: FormState): Stonadsperiode[] => {
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
});

/**
 * Henter ut alle perioder gitt formState og utsettelser
 */
export const getPerioderMedUtsettelser = createSelector(
	getStonadsperioder,
	utsettelseSelector,
	(stonadsperioder: Stonadsperiode[], utsettelser: Utsettelsesperiode[]): Periode[] => {
		return leggUtsettelserTilPerioder(stonadsperioder, utsettelser);
	}
);

/**
 * Returnerer liste hvor påfølgende perioder med samme forelder er slått sammen til en periode
 * Perioder før termin vil ikke blir slått sammen
 */
export const getPerioderForTidslinje = createSelector(
	getStonadsperioder,
	utsettelseSelector,
	(perioder: Stonadsperiode[], utsettelser: Utsettelsesperiode[]): Periode[] => {
		const liste: (Stonadsperiode | SammenslattPeriode)[] = [];
		let stonadsperioderSammeForelder: Stonadsperiode[] = [];
		perioder.forEach((p, index) => {
			const forrige = stonadsperioderSammeForelder[stonadsperioderSammeForelder.length - 1];
			if (!forrige || p.forelder === forrige.forelder) {
				stonadsperioderSammeForelder.push(p);
			} else {
				if (stonadsperioderSammeForelder.length === 1) {
					liste.push(forrige);
				} else {
					liste.push(lagSammenslattPeriode(stonadsperioderSammeForelder));
				}
				stonadsperioderSammeForelder = [p];
			}
		});
		if (stonadsperioderSammeForelder.length === 1) {
			liste.push(stonadsperioderSammeForelder[0]);
		} else if (stonadsperioderSammeForelder.length > 1) {
			liste.push(lagSammenslattPeriode(stonadsperioderSammeForelder));
		}
		return leggUtsettelserTilPerioder(liste, utsettelser);
	}
);

const lagSammenslattPeriode = (perioder: Stonadsperiode[]): SammenslattPeriode => ({
	type: Periodetype.SammenslattPeriode,
	forelder: perioder[0].forelder,
	tidsperiode: {
		startdato: perioder[0].tidsperiode.startdato,
		sluttdato: perioder[perioder.length - 1].tidsperiode.sluttdato
	},
	perioder: perioder.map((sp) => sp)
});
