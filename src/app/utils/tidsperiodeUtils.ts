import { Tidsperiode } from 'app/types';
import { getAntallUttaksdagerITidsperiode, leggUttaksdagerTilDato } from '../utils';

export const flyttTidsperiode = (tidsperiode: Tidsperiode, startdato: Date): Tidsperiode => {
	const uttaksdager = getAntallUttaksdagerITidsperiode(tidsperiode);
	const sluttdato = leggUttaksdagerTilDato(startdato, uttaksdager - 1);
	return {
		startdato,
		sluttdato
	};
};
