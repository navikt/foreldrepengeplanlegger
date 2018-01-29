import { createSelector } from 'reselect';
import { AppState, FormState } from 'app/redux/types';
import { TidslinjeInnslag } from 'app/components/tidslinje/types';
import { addWeeks, addDays, getISODay } from 'date-fns';
import { Utsettelse } from 'app/types';

const formSelector = (state: AppState) => state.form;
const utsettelseSelector = (state: AppState) => state.utsettelse.utsettelser;

export const tidslinjeSelector = createSelector(
	formSelector,
	utsettelseSelector,
	(form: FormState, utsettelser: Utsettelse[]): TidslinjeInnslag[] => {
		const { navnForelder1, navnForelder2, ukerForelder1, ukerForelder2, termindato /*, dekningsgrad*/ } = form;
		if (!termindato) {
			return [];
		}
		const startDato = getStartdatoUtFraTermin(termindato);
		const forsteDagEtterTermin = getForsteDagEtterTermin(termindato);
		const sluttModrekvote = addWeeks(forsteDagEtterTermin, 6 + (ukerForelder1 ? ukerForelder1 : 1));
		const startFedrekvote = getForsteArbeidsdagEtterDato(addDays(sluttModrekvote, 1));
		const sluttFedrekvote = addWeeks(sluttModrekvote, ukerForelder2 ? ukerForelder2 : 0);

		const innslag: TidslinjeInnslag[] = [
			{
				dato: startDato,
				tittel: `${navnForelder1 || 'Mor'} starter sin permisjon`,
				forelder: 'forelder1',
				type: 'uttak'
			},
			{
				dato: termindato,
				tittel: 'Termindato',
				forelder: 'forelder1',
				type: 'termin'
			},
			{
				dato: sluttModrekvote,
				tittel: `${navnForelder1 || 'Mor'} avslutter sin permisjon`,
				forelder: 'forelder1',
				type: 'slutt'
			},
			{
				dato: startFedrekvote,
				tittel: `${navnForelder2 || 'Medforelder'} starter sin permisjon`,
				forelder: 'forelder2',
				type: 'uttak'
			},
			{
				dato: sluttFedrekvote,
				tittel: `${navnForelder2 || 'Medforelder'} slutter sin permisjon`,
				forelder: 'forelder2',
				type: 'siste'
			}
		];
		/**
		 *
		 * Gitt termindato
		 * - mor 3 + 6 (+1)
		 * - far 10
		 * - kan ikke utsette en helligdag - det er en permisjonsdag
		 *
		 */

		return innslag;
	}
);

const getStartdatoUtFraTermin = (termin: Date): Date => {
	let date = getForsteArbeidsdagEtterDato(addWeeks(termin, -3));
	return date;
};

export const getForsteDagEtterTermin = (termin: Date): Date => {
	return getForsteArbeidsdagEtterDato(addDays(termin, 1));
};

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

export const getUkedag = (dato: Date) => getISODay(dato);
