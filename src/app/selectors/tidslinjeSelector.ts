import { createSelector } from 'reselect';
import { AppState } from 'app/redux/types';
import { TidslinjeInnslag } from 'app/components/tidslinje/types';
import { Periode, Periodetype } from 'app/types';
import { periodeSelector } from './periodeSelector';
const formSelector = (state: AppState) => state.form;
const utsettelseSelector = (state: AppState) => state.utsettelse.utsettelser;

/**
 * Oppretter tidslinjeInnslag ut fra perioder
 */
export const tidslinjeFraPerioder = createSelector(
	periodeSelector,
	utsettelseSelector,
	formSelector,
	(perioder, utsettelser, form): TidslinjeInnslag[] => {
		const { dekningsgrad, termindato } = form;
		if (!termindato || !dekningsgrad) {
			return [];
		}
		const alleInnslag: TidslinjeInnslag[] = [];
		// Lag tidslinjeinnslag ut fra perioder
		perioder.forEach((periode) => {
			const i = periodeTilTidslinjeinnslag(periode);
			if (i) {
				alleInnslag.push(i);
			}
		});

		// Legg til punkt for termindato
		alleInnslag.push({
			startdato: termindato,
			forelder: 'forelder1',
			type: 'termin',
			tittel: 'Termindato'
		});

		// Legg til punkt for permisjonsslutt
		const sistePeriode = perioder[perioder.length - 1];
		alleInnslag.push({
			startdato: sistePeriode.tidsperiode.sluttdato,
			forelder: sistePeriode.forelder,
			type: 'siste',
			tittel: 'Siste permisjonsdag'
		});

		alleInnslag.sort(sorterTidslinjeinnslagEtterStartdato);

		return alleInnslag;
	}
);

const sorterTidslinjeinnslagEtterStartdato = (innslag1: TidslinjeInnslag, innslag2: TidslinjeInnslag) => {
	if (innslag1.startdato === innslag2.startdato) {
		return innslag1.type === 'termin' ? -1 : 1;
	}
	return innslag1.startdato >= innslag2.startdato ? 1 : -1;
};

export const periodeTilTidslinjeinnslag = (periode: Periode): TidslinjeInnslag | undefined => {
	switch (periode.type) {
		case Periodetype.Stonadsperiode:
			return {
				startdato: periode.tidsperiode.startdato,
				sluttdato: periode.tidsperiode.sluttdato,
				type: 'uttak',
				tittel: `Søknadsperiode (${periode.konto})`,
				forelder: periode.forelder,
				fastPeriode: periode.fastPeriode
			};
		case Periodetype.Utsettelse:
			return {
				startdato: periode.tidsperiode.startdato,
				sluttdato: periode.tidsperiode.sluttdato,
				type: 'utsettelse',
				tittel: `Utsettelse (${periode.arsak})`,
				forelder: periode.forelder
			};
		default:
			return undefined;
	}
};
