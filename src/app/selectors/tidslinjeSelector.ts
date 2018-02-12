import { createSelector } from 'reselect';
import { AppState } from 'app/redux/types';
import {
	Tidslinjeinnslag,
	TidslinjeinnslagType
} from 'app/components/tidslinje/types';
import { getPerioderForTidslinje } from './periodeSelector';
import { isSameDay } from 'date-fns';

const formSelector = (state: AppState) => state.form;
const utsettelseSelector = (state: AppState) => state.utsettelse.utsettelser;

export const tidslinjeFraPerioder = createSelector(
	getPerioderForTidslinje,
	utsettelseSelector,
	formSelector,
	(perioder, utsettelser, form): Tidslinjeinnslag[] => {
		const { dekningsgrad, termindato } = form;
		if (!termindato || !dekningsgrad) {
			return [];
		}
		const antallPerioder = perioder.length;

		const alleInnslag: Tidslinjeinnslag[] = [
			...perioder.map(
				(periode, index) =>
					({
						type: TidslinjeinnslagType.periode,
						periode,
						nestePeriode:
							antallPerioder > index ? perioder[index + 1] : undefined,
						forrigePeriode: index > 0 ? perioder[index - 1] : undefined
					} as Tidslinjeinnslag)
			),
			{
				type: TidslinjeinnslagType.hendelse,
				hendelse: 'termin',
				dato: termindato
			},
			{
				type: TidslinjeinnslagType.hendelse,
				hendelse: 'permisjonsslutt',
				dato: perioder[antallPerioder - 1].tidsperiode.sluttdato
			}
		];

		return alleInnslag.sort(sorterTidslinjeinnslagEtterStartdato);
	}
);

const sorterTidslinjeinnslagEtterStartdato = (
	innslag1: Tidslinjeinnslag,
	innslag2: Tidslinjeinnslag
) => {
	const startdato1 = getStartdato(innslag1);
	const startdato2 = getStartdato(innslag2);

	if (isSameDay(startdato1, startdato2)) {
		return erTerminHendelse(innslag1) ? -1 : 1;
	}
	return startdato1 >= startdato2 ? 1 : -1;
};

export const getStartdato = (innslag: Tidslinjeinnslag): Date =>
	innslag.type === TidslinjeinnslagType.hendelse
		? innslag.dato
		: innslag.periode.tidsperiode.startdato;

export const erTerminHendelse = (innslag: Tidslinjeinnslag): boolean =>
	innslag.type === TidslinjeinnslagType.hendelse &&
	innslag.hendelse === 'termin';
