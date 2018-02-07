import { Tidsperiode } from 'app/types';
import { differenceInCalendarDays, addDays } from 'date-fns';
import { getAntallUttaksdagerITidsperiode, getForsteUttaksdagPaEllerEtterDato } from 'app/utils/uttaksdagerUtils';

export const getAntallDagerITidsperiode = (tidsperiode: Tidsperiode): number => {
	return differenceInCalendarDays(tidsperiode.sluttdato, tidsperiode.startdato);
};

export const forskyvTidsperiode = (tidsperiode: Tidsperiode, dager: number): Tidsperiode => {
	const periodedager = getAntallUttaksdagerITidsperiode(tidsperiode.startdato, tidsperiode.sluttdato);
	const startdato = getForsteUttaksdagPaEllerEtterDato(addDays(tidsperiode.startdato, dager));
	const sluttdato = getForsteUttaksdagPaEllerEtterDato(addDays(startdato, periodedager));
	return {
		startdato,
		sluttdato
	};
};
