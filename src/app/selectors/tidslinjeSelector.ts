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

		const antallPerioder = perioder.length;
		let forrigePeriode: Periode;
		const alleInnslag: TidslinjeInnslag[] = perioder.map((periode, index) => {
			const nestePeriode = index < antallPerioder - 1 ? perioder[index + 1] : undefined;
			const innslag = periodeTilTidslinjeinnslag(periode, forrigePeriode, nestePeriode) || {};
			forrigePeriode = periode;
			return innslag;
		});

		// Legg til punkt for termindato
		alleInnslag.push({
			startdato: termindato,
			sluttdato: termindato,
			forelder: 'forelder1',
			type: 'termin',
			tittel: 'Termindato'
		});

		// Legg til punkt for permisjonsslutt
		const sistePeriode = perioder[perioder.length - 1];
		alleInnslag.push({
			startdato: sistePeriode.tidsperiode.sluttdato,
			sluttdato: sistePeriode.tidsperiode.sluttdato,
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

export const periodeTilTidslinjeinnslag = (
	periode: Periode,
	forrigePeriode: Periode,
	nestePeriode?: Periode
): TidslinjeInnslag => {
	const fortsetter = nestePeriode && nestePeriode.forelder === periode.forelder;
	const erFortsettelse = forrigePeriode && forrigePeriode.forelder === periode.forelder;
	switch (periode.type) {
		case Periodetype.Utsettelse:
			return {
				startdato: periode.tidsperiode.startdato,
				sluttdato: periode.tidsperiode.sluttdato,
				type: 'utsettelse',
				tittel: `Utsettelse (${periode.arsak})`,
				forelder: periode.forelder,
				fortsetter,
				erFortsettelse
			};
		default:
			return {
				startdato: periode.tidsperiode.startdato,
				sluttdato: periode.tidsperiode.sluttdato,
				type: 'uttak',
				tittel: `Søknadsperiode (${periode.konto})`,
				forelder: periode.forelder,
				fastPeriode: periode.fastPeriode,
				fortsetter
			};
	}
};
