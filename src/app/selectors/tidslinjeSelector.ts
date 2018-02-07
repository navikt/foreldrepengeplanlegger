import { createSelector } from 'reselect';
import { AppState } from 'app/redux/types';
import { TidslinjeInnslag } from 'app/components/tidslinje/types';
import { Periode, Periodetype } from 'app/types';
import { periodeSelector } from './periodeSelector';
import { isSameDay } from 'date-fns';

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
				tidsperiode: {
					startdato: termindato,
					sluttdato: termindato
				},
				forelder: 'forelder1',
				type: 'termin',
				tittel: 'Termindato'
			},
			{
				tidsperiode: {
					startdato: sistePeriode.tidsperiode.sluttdato,
					sluttdato: sistePeriode.tidsperiode.sluttdato
				},
				forelder: sistePeriode.forelder,
				type: 'sistePermisjonsdag',
				tittel: 'Siste permisjonsdag'
			}
		];

		return alleInnslag.sort(sorterTidslinjeinnslagEtterStartdato).map((innslag, index) => {
			if (innslag.type !== 'uttak' && innslag.type !== 'utsettelse') {
				return innslag;
			}
			const justertInnslag: TidslinjeInnslag = {
				...innslag,
				fortsetter: fortsetterInnslag(alleInnslag, innslag, index),
				fortsettelse: erInnslagFortsettelse(alleInnslag, innslag, index),
				slutter: erInnslagSisteIPeriode(alleInnslag, innslag, index)
			};
			return justertInnslag;
		});
	}
);

/**
 * Sjekker om perioden skal vis at den fortsetter inn i neste periode
 * @param alleInnslag
 * @param innslag
 * @param index
 */
const fortsetterInnslag = (alleInnslag: TidslinjeInnslag[], innslag: TidslinjeInnslag, index: number): boolean => {
	if (index === alleInnslag.length - 1) {
		return false;
	}
	const nesteInnslag: TidslinjeInnslag = alleInnslag[index + 1];
	return erUtsettelse(innslag) || (erUttakEllerUtsettelse(nesteInnslag) && nesteInnslag.forelder === innslag.forelder);
};

/**
 * Sjekker om perioden er en fortsettelse av forrige periode
 * @param alleInnslag
 * @param innslag
 * @param index
 */
const erInnslagFortsettelse = (alleInnslag: TidslinjeInnslag[], innslag: TidslinjeInnslag, index: number): boolean => {
	if (index === 0) {
		return false;
	}
	const forrigeInnslag = alleInnslag[index - 1];
	if (erUtsettelse(innslag) || erUtsettelse(forrigeInnslag)) {
		return false;
	}
	return !erUttak(forrigeInnslag) ? true : forrigeInnslag.forelder === innslag.forelder;
};
/**
 * Sjekker om perioden er den siste for forelder
 * @param alleInnslag
 * @param innslag
 * @param index
 */
const erInnslagSisteIPeriode = (alleInnslag: TidslinjeInnslag[], innslag: TidslinjeInnslag, index: number): boolean => {
	if (index === alleInnslag.length - 1) {
		return false;
	}
	const nesteInnslag: TidslinjeInnslag = alleInnslag[index + 1];
	if (erUttak(innslag) && erUtsettelse(nesteInnslag)) {
		return true;
	}
	return nesteInnslag.forelder !== innslag.forelder;
};

export const erUttak = (innslag: TidslinjeInnslag): boolean => innslag.type === 'uttak';
export const erUtsettelse = (innslag: TidslinjeInnslag): boolean => innslag.type === 'utsettelse';
export const erUttakEllerUtsettelse = (innslag: TidslinjeInnslag): boolean => erUttak(innslag) || erUtsettelse(innslag);

const sorterTidslinjeinnslagEtterStartdato = (innslag1: TidslinjeInnslag, innslag2: TidslinjeInnslag) => {
	if (isSameDay(innslag1.tidsperiode.startdato, innslag2.tidsperiode.startdato)) {
		return innslag1.type === 'termin' ? -1 : 1;
	}
	return innslag1.tidsperiode.startdato >= innslag2.tidsperiode.startdato ? 1 : -1;
};

/**
 * Oppretter et tidslinjeinnslag ut fra periode
 * @param periode
 */
export const periodeTilTidslinjeinnslag = (periode: Periode): TidslinjeInnslag => {
	switch (periode.type) {
		case Periodetype.Utsettelse:
			return {
				tidsperiode: {
					startdato: periode.tidsperiode.startdato,
					sluttdato: periode.tidsperiode.sluttdato
				},
				type: 'utsettelse',
				tittel: `Utsettelse (${periode.arsak})`,
				forelder: periode.forelder
			};
		default:
			return {
				tidsperiode: {
					startdato: periode.tidsperiode.startdato,
					sluttdato: periode.tidsperiode.sluttdato
				},
				type: 'uttak',
				tittel: `Søknadsperiode (${periode.konto})`,
				forelder: periode.forelder,
				fastPeriode: periode.fastPeriode
			};
	}
};
