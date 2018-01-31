import { createSelector } from 'reselect';
import { AppState, FormState } from 'app/redux/types';
import { TidslinjeInnslag } from 'app/components/tidslinje/types';
import { addWeeks, addDays } from 'date-fns';
import { Utsettelsesperiode, Stonadsperiode, StonadskontoType, Periodetype, Periode } from 'app/types';
import {
	getStartdatoUtFraTermindato,
	getForsteUttaksdagEtterDato,
	getForsteUttaksdagPaEllerEtterDato
} from 'app/utils/periodeUtils';
import { grunnfordeling } from 'app/data/grunnfordeling';

const formSelector = (state: AppState) => state.form;
const utsettelseSelector = (state: AppState) => state.utsettelse.utsettelser;

export const periodeSelector = createSelector(formSelector, (form: FormState): Periode[] => {
	if (!form.termindato) {
		return [];
	}
	const forTerminPeriode: Stonadsperiode = {
		type: Periodetype.Stonadsperiode,
		forelder: 'forelder1',
		konto: StonadskontoType.Modrekvote,
		tidsperiode: {
			startdato: getStartdatoUtFraTermindato(form.termindato, form.grunnfordeling.antallUkerForelder1ForFodsel),
			sluttdato: form.termindato
		}
	};
	return [forTerminPeriode];
});

export const tidslinjeSelector = createSelector(
	formSelector,
	utsettelseSelector,
	(form: FormState, utsettelser: Utsettelsesperiode[]): TidslinjeInnslag[] => {
		const { navnForelder1, navnForelder2, ukerForelder1, ukerForelder2, termindato /*, dekningsgrad*/ } = form;
		if (!termindato) {
			return [];
		}
		const startDato = getStartdatoUtFraTermindato(termindato, grunnfordeling.antallUkerForelder1ForFodsel);
		const forsteDagEtterTermin = getForsteUttaksdagEtterDato(termindato);
		const sluttModrekvote = addWeeks(forsteDagEtterTermin, 6 + (ukerForelder1 ? ukerForelder1 : 1));
		const startFedrekvote = getForsteUttaksdagPaEllerEtterDato(addDays(sluttModrekvote, 1));
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
