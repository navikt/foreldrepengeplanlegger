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

		const sistePeriode = perioder[perioder.length - 1];

		const alleInnslag: TidslinjeInnslag[] = [
			...perioder.map((periode) => periodeTilTidslinjeinnslag(periode)),
			{
				startdato: termindato,
				sluttdato: termindato,
				forelder: 'forelder1',
				type: 'termin',
				tittel: 'Termindato'
			},
			{
				startdato: sistePeriode.tidsperiode.sluttdato,
				sluttdato: sistePeriode.tidsperiode.sluttdato,
				forelder: sistePeriode.forelder,
				type: 'siste',
				tittel: 'Siste permisjonsdag'
			}
		];

		return alleInnslag.sort(sorterTidslinjeinnslagEtterStartdato).map((innslag, index) => {
			if (innslag.type !== 'uttak') {
				return innslag;
			}
			const justertInnslag: TidslinjeInnslag = {
				...innslag,
				fortsetter: fortsetterInnslag(alleInnslag, innslag, index),
				erFortsettelse: erInnslagFortsettelse(alleInnslag, innslag, index),
				erSlutt: erInnslagSisteIPeriode(alleInnslag, innslag, index)
			};
			return justertInnslag;
		});
	}
);

const fortsetterInnslag = (alleInnslag: TidslinjeInnslag[], innslag: TidslinjeInnslag, index: number): boolean => {
	if (index === alleInnslag.length - 1) {
		return false;
	}
	const nesteInnslag: TidslinjeInnslag = alleInnslag[index + 1];
	return (
		(nesteInnslag.type === 'uttak' || nesteInnslag.type === 'utsettelse') && nesteInnslag.forelder === innslag.forelder
	);
};

const erInnslagFortsettelse = (alleInnslag: TidslinjeInnslag[], innslag: TidslinjeInnslag, index: number): boolean => {
	if (index === 0) {
		return false;
	}
	const forrigeInnslag = alleInnslag[index - 1];
	return forrigeInnslag.type !== 'uttak' ? true : forrigeInnslag.forelder === innslag.forelder;
};
const erInnslagSisteIPeriode = (alleInnslag: TidslinjeInnslag[], innslag: TidslinjeInnslag, index: number): boolean => {
	if (index === alleInnslag.length - 1 || innslag.type !== 'uttak') {
		return false;
	}
	const nesteInnslag: TidslinjeInnslag = alleInnslag[index + 1];
	return (
		(nesteInnslag.type === 'uttak' && nesteInnslag.forelder !== innslag.forelder) ||
		nesteInnslag.forelder !== innslag.forelder
	);
};

const sorterTidslinjeinnslagEtterStartdato = (innslag1: TidslinjeInnslag, innslag2: TidslinjeInnslag) => {
	if (innslag1.startdato === innslag2.startdato) {
		return innslag1.type === 'termin' ? -1 : 1;
	}
	return innslag1.startdato >= innslag2.startdato ? 1 : -1;
};

export const periodeTilTidslinjeinnslag = (periode: Periode): TidslinjeInnslag => {
	switch (periode.type) {
		case Periodetype.Utsettelse:
			return {
				startdato: periode.tidsperiode.startdato,
				sluttdato: periode.tidsperiode.sluttdato,
				type: 'utsettelse',
				tittel: `Utsettelse (${periode.arsak})`,
				forelder: periode.forelder
			};
		default:
			return {
				startdato: periode.tidsperiode.startdato,
				sluttdato: periode.tidsperiode.sluttdato,
				type: 'uttak',
				tittel: `Søknadsperiode (${periode.konto})`,
				forelder: periode.forelder,
				fastPeriode: periode.fastPeriode
			};
	}
};
