import { createSelector } from 'reselect';
import { AppState, FormState } from 'app/redux/types';
import { TidslinjeInnslag } from 'app/components/tidslinje/types';
import { addWeeks, addDays } from 'date-fns';
import { Utsettelsesperiode, Periode, Periodetype } from 'app/types';
import {
	getStartdatoUtFraTermindato,
	getForsteUttaksdagEtterDato,
	getForsteUttaksdagPaEllerEtterDato,
	getPerioderUtenUtsettelser
} from 'app/utils/periodeUtils';
import { grunnfordeling } from 'app/data/grunnfordeling';

const formSelector = (state: AppState) => state.form;
const utsettelseSelector = (state: AppState) => state.utsettelse.utsettelser;

export const periodeSelector = createSelector(formSelector, (form: FormState): Periode[] => {
	if (!form.termindato || !form.dekningsgrad) {
		return [];
	}
	const perioder = getPerioderUtenUtsettelser(
		form.termindato || new Date(),
		form.dekningsgrad || '100%',
		form.grunnfordeling,
		form.ukerForelder1 || 0,
		form.ukerForelder2 || 0
	);
	return perioder;
});

export const tidslinjeFraPerioder = createSelector(
	periodeSelector,
	utsettelseSelector,
	formSelector,
	(perioder, utsettelser, form): TidslinjeInnslag[] => {
		const { dekningsgrad, termindato } = form;
		if (!termindato || !dekningsgrad) {
			return [];
		}
		const innslag: TidslinjeInnslag[] = [];
		perioder.forEach((periode) => {
			const i = periodeTilTidslinjeinnslag(periode);
			if (i) {
				innslag.push(i);
			}
		});

		utsettelser.forEach((utsettelse) => {
			innslag.push({
				dato: utsettelse.tidsperiode.startdato,
				forelder: utsettelse.forelder,
				tittel: 'Utsettelse',
				type: 'utsettelse'
			});
		});

		innslag.sort(sorterTidslinjeinnslagEtterStartdato);

		return innslag;
	}
);

const sorterTidslinjeinnslagEtterStartdato = (innslag1: TidslinjeInnslag, innslag2: TidslinjeInnslag) =>
	innslag1.dato >= innslag2.dato ? 1 : -1;

export const periodeTilTidslinjeinnslag = (periode: Periode): TidslinjeInnslag | undefined => {
	switch (periode.type) {
		case Periodetype.Stonadsperiode:
			return {
				dato: periode.tidsperiode.startdato,
				type: 'uttak',
				tittel: 'Søknadsperiode',
				forelder: periode.forelder
			};
		case Periodetype.Utsettelse:
			return {
				dato: periode.tidsperiode.startdato,
				type: 'utsettelse',
				tittel: 'Utsettelse',
				forelder: periode.forelder
			};
		default:
			return undefined;
	}
};

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
		return innslag;
	}
);
