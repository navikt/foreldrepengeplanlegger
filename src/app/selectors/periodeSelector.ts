import { createSelector } from 'reselect';
import { AppState, FormState } from 'app/redux/types';
import {
	Utsettelsesperiode,
	Periode,
	Stonadsperiode,
	UtsettelseArsakType
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
			form.permisjonsregler
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
export const getPerioderForTidslinje = createSelector(
	getStonadsperioder,
	utsettelseSelector,
	(
		perioder: Stonadsperiode[],
		utsettelser: Utsettelsesperiode[]
	): Periode[] => {
		return leggUtsettelserTilPerioder(perioder, utsettelser);
	}
);

export const getFerieutsettelser = createSelector(
	utsettelseSelector,
	(utsettelser: Utsettelsesperiode[]): Utsettelsesperiode[] => {
		return utsettelser.filter((u) => u.arsak === UtsettelseArsakType.Ferie);
	}
);
