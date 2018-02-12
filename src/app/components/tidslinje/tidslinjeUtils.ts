import { Periodeinnslag } from 'app/components/tidslinje/types';
import {
	Tidsperiode,
	Periodetype,
	Forelder,
	StonadskontoType
} from 'app/types';
import {
	getAntallUttaksdagerIPerioder,
	splittPerioderEtterType
} from 'app/utils/periodeUtils';
import { CalloutBorderColor } from 'app/components/callout/Callout';
import { getAntallUttaksdagerITidsperiode } from 'app/utils/uttaksdagerUtils';

/**
 * Oppsummerer et periodeinnslag
 * @param innslag
 */

export interface SammenslattPeriodeOppsummering {
	ukerTotalt: number;
	tidsperiode: Tidsperiode;
	perioder: Periodeoppsummering;
}

export type Periodeoppsummering = Map<StonadskontoType, number>;

export const normaliserKontotype = (
	konto: StonadskontoType
): StonadskontoType =>
	konto === StonadskontoType.Modrekvote ||
	konto === StonadskontoType.ForeldrepengerForFodsel
		? StonadskontoType.Modrekvote
		: konto;
/**
 * Går gjennom alle perioder i en perioderekke og summerer opp antall
 * dager som er brukt per StonadskontoType
 * @param innslag
 */
export const oppsummeringPerioder = (
	innslag: Periodeinnslag
): SammenslattPeriodeOppsummering => {
	const tidsperiode = {
		startdato: innslag.perioderekke[0].tidsperiode.sluttdato,
		sluttdato:
			innslag.perioderekke[innslag.perioderekke.length - 1].tidsperiode
				.sluttdato
	};
	const ukerTotalt = getAntallUttaksdagerIPerioder(innslag.perioderekke) / 5;
	const { stonadsperioder } = splittPerioderEtterType(innslag.perioderekke);
	const perioder: Periodeoppsummering = new Map();
	stonadsperioder.forEach((p) => {
		if (p.type === Periodetype.Stonadsperiode) {
			const konto = normaliserKontotype(p.konto);
			const eksisterendeDager = perioder.get(konto) || 0;
			const nyeDager = getAntallUttaksdagerITidsperiode(p.tidsperiode);
			perioder.set(konto, eksisterendeDager + nyeDager);
		}
	});
	perioder.forEach((value, key) => perioder.set(key, value / 5));
	return {
		ukerTotalt,
		perioder,
		tidsperiode
	};
};

/**
 * Finner riktig farge gitt periodetype
 * @param innslag
 */
export const getInnslagfarge = (
	innslag: Periodeinnslag
): CalloutBorderColor => {
	if (innslag.periode.type === Periodetype.Utsettelse) {
		return 'green';
	}
	if (innslag.periode.forelder === 'forelder1') {
		return 'purple';
	}
	return 'blue';
};

/**
 * Sjekker om forrige innslag har samme forelder
 * @param innslag
 */
export const innslagErFortsettelse = (innslag: Periodeinnslag): boolean =>
	innslag.perioderekke.length > 1 &&
	innslag.perioderekke.findIndex((p) => p === innslag.periode) > 0;

export const innslagFortsetter = (innslag: Periodeinnslag): boolean =>
	innslag.perioderekke.length > 1 &&
	innslag.perioderekke.findIndex((p) => p === innslag.periode) <
		innslag.perioderekke.length - 1;

export const getForelderNavn = (
	forelder: Forelder,
	navnForelder1: string,
	navnForelder2: string
): string => (forelder === 'forelder1' ? navnForelder1 : navnForelder2);
