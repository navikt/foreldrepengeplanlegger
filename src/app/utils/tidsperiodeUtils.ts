import { Tidsperiode } from 'app/types';
import { addDays } from 'date-fns';
import { getForsteUttaksdagPaEllerEtterDato } from './uttaksdagerUtils';
import { getAntallUttaksdagerITidsperiode } from '../utils';

export const forskyvTidsperiode = (tidsperiode: Tidsperiode, dager: number): Tidsperiode => {
	const periodedager = getAntallUttaksdagerITidsperiode(tidsperiode);
	const startdato = getForsteUttaksdagPaEllerEtterDato(addDays(tidsperiode.startdato, dager));
	const sluttdato = getForsteUttaksdagPaEllerEtterDato(addDays(startdato, periodedager - 1));
	return {
		startdato,
		sluttdato
	};
};
