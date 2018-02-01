import { createSelector } from 'reselect';
import { AppState, FormState } from 'app/redux/types';
import { TidslinjeInnslag } from 'app/components/tidslinje/types';
import { Utsettelsesperiode, Periode, Periodetype, Stonadsperiode } from 'app/types';
import { getStonadsperioder, justerPerioderMedUtsettelser, leggInnUtsettelerIPerioder } from 'app/utils/periodeUtils';

const formSelector = (state: AppState) => state.form;
const utsettelseSelector = (state: AppState) => state.utsettelse.utsettelser;

/**
 * Henter ut alle perioder gitt formState og utsettelser
 */
export const periodeSelector = createSelector(
	formSelector,
	utsettelseSelector,
	(form: FormState, utsettelser: Utsettelsesperiode[]): Periode[] => {
		if (!form.termindato || !form.dekningsgrad) {
			return [];
		}
		const stonadsperioder: Stonadsperiode[] = getStonadsperioder(
			form.termindato || new Date(),
			form.dekningsgrad || '100%',
			form.grunnfordeling,
			form.ukerForelder1 || 0,
			form.ukerForelder2 || 0
		);

		const perioder = leggInnUtsettelerIPerioder(stonadsperioder, utsettelser);
		return perioder;
	}
);

/**
 * Oppretter tidslinjeInnslag ut fra perioder og utsettelser
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
		const justertePerioder: Periode[] = justerPerioderMedUtsettelser(perioder.sort(sorterPeriodeEtterStartdato));

		// Lag tidslinjeinnslag ut fra perioder
		justertePerioder.forEach((periode) => {
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
		const sistePeriode = justertePerioder[justertePerioder.length - 1];
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

const sorterPeriodeEtterStartdato = (p1: Periode, p2: Periode) =>
	p1.tidsperiode.startdato >= p2.tidsperiode.startdato ? 1 : -1;

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
