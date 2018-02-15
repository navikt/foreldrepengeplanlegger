import { createSelector } from 'reselect';
import { AppState } from 'app/redux/types';
import {
	Tidslinjeinnslag,
	TidslinjeinnslagType
} from 'app/components/tidslinje/types';
import { getPerioderForTidslinje } from './periodeSelector';
import { isSameDay } from 'date-fns';
import { Periode, Periodetype } from 'app/types';
import { getSammenhengendePerioder } from 'app/utils/periodeUtils';

const formSelector = (state: AppState) => state.form;

const mapPeriodeTilTidslinjeinnslag = (
	periode: Periode,
	index: number,
	perioder: Periode[],
	antallPerioder: number
): Tidslinjeinnslag => {
	return {
		type: TidslinjeinnslagType.periode,
		periode,
		perioderekke: getSammenhengendePerioder(periode, perioder)
	};
};

export const tidslinjeFraPerioder = createSelector(
	getPerioderForTidslinje,
	formSelector,
	(perioder, form): Tidslinjeinnslag[] => {
		const { dekningsgrad, termindato } = form;
		if (!termindato || !dekningsgrad) {
			return [];
		}
		const antallPerioder = perioder.length;
		const alleInnslag: Tidslinjeinnslag[] = [
			...perioder.map((periode: Periode, index: number) =>
				mapPeriodeTilTidslinjeinnslag(periode, index, perioder, antallPerioder)
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
		return alleInnslag
			.sort(sorterTidslinjeinnslagEtterStartdato)
			.filter(filtrerOmInnslagSkalVises);
	}
);

const filtrerOmInnslagSkalVises = (
	innslag: Tidslinjeinnslag,
	index: number,
	alleInnslag: Tidslinjeinnslag[]
) => {
	if (
		index === 0 ||
		innslag.type === TidslinjeinnslagType.hendelse ||
		innslag.periode.type === Periodetype.Utsettelse
	) {
		return true;
	}
	const forrigeInnslag = alleInnslag[index - 1];
	if (forrigeInnslag.type !== innslag.type) {
		return true;
	}
	if (
		forrigeInnslag.type === TidslinjeinnslagType.periode &&
		forrigeInnslag.type === innslag.type &&
		(forrigeInnslag.periode.forelder !== innslag.periode.forelder ||
			forrigeInnslag.periode.type !== innslag.periode.type)
	) {
		return true;
	}
	return false;
};

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
