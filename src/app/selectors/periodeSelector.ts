import { createSelector } from 'reselect';
import { AppState, FormState } from 'app/redux/types';
import { Utsettelsesperiode, Periode, Stonadsperiode } from 'app/types';
import { leggUtsettelserTilPerioder } from 'app/utils/periodeUtils';
import { opprettStønadsperioder } from 'app/utils/permisjonUtils';

const formSelector = (state: AppState) => state.form;
const utsettelseSelector = (state: AppState) => state.utsettelse.utsettelser;

/**
 * Henter ut sortert liste med alle stønadsperioder fra state
 */
export const getStonadsperioder = createSelector(
	formSelector,
	(form: FormState): Stonadsperiode[] => {
		if (!form.termindato || !form.dekningsgrad) {
			return [];
		}
		return opprettStønadsperioder(
			form.termindato,
			form.dekningsgrad,
			form.fellesperiodeukerForelder1 || 0,
			form.fellesperiodeukerForelder2 || 0,
			form.permisjonsregler
		);
	}
);

/**
 * Henter ut perioder og utsettelser fra state
 */
export const getStonadsperioderOgUtsettelser = createSelector(
	getStonadsperioder,
	utsettelseSelector,
	(
		stonadsperioder: Stonadsperiode[],
		utsettelser: Utsettelsesperiode[]
	): Periode[] => {
		return leggUtsettelserTilPerioder(stonadsperioder, utsettelser);
	}
);

export const getSisteRegistrertePermisjonsdag = createSelector(
	getStonadsperioderOgUtsettelser,
	(periode: Periode[]): Date | undefined => {
		return periode.length > 0
			? periode[periode.length - 1].tidsperiode.sluttdato
			: undefined;
	}
);
