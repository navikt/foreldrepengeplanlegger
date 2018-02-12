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
import { grunnfordeling } from 'app/data/grunnfordeling';
import { CalloutBorderColor } from 'app/components/callout/Callout';
import { getAntallUttaksdagerITidsperiode } from 'app/utils/uttaksdagerUtils';

/**
 * Oppsummerer et periodeinnslag
 * @param innslag
 */
export const oppsummeringMor = (
	innslag: Periodeinnslag
): {
	dagerTotalt: number;
	tidsperiode: Tidsperiode;
	ukerTotalt: number;
	ukerModrekvote: number;
	ukerFellespermisjon: number;
} => {
	const tidsperiode = {
		startdato: innslag.perioderekke[0].tidsperiode.sluttdato,
		sluttdato:
			innslag.perioderekke[innslag.perioderekke.length - 1].tidsperiode
				.sluttdato
	};

	const dagerTotalt = getAntallUttaksdagerIPerioder(innslag.perioderekke);
	const ukerTotalt = dagerTotalt / 5;
	const ukerFellespermisjon = Math.min(
		ukerTotalt -
			grunnfordeling.antallUkerModrekvote -
			grunnfordeling.antallUkerForelder1ForFodsel
	);
	const ukerModrekvote = ukerTotalt - ukerFellespermisjon;
	return {
		tidsperiode,
		dagerTotalt,
		ukerTotalt,
		ukerModrekvote,
		ukerFellespermisjon
	};
};

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
	const dagerTotalt = getAntallUttaksdagerIPerioder(innslag.perioderekke);
	const ukerTotalt = dagerTotalt / 5;
	/** Hent ut alle støndasperioder i perioderekken */
	const { stonadsperioder } = splittPerioderEtterType(innslag.perioderekke);
	/** Gå gjennom og summer opp antall dager på de ulike kontoene som er brukt */
	const perioder: Periodeoppsummering = new Map();
	stonadsperioder.forEach((p) => {
		if (p.type === Periodetype.Stonadsperiode) {
			const eksisterendeDager = perioder.get(p.konto) || 0;
			const nyeDager = getAntallUttaksdagerITidsperiode(p.tidsperiode);
			perioder.set(p.konto, eksisterendeDager + nyeDager);
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
export const erFortsettelse = (innslag: Periodeinnslag): boolean =>
	(innslag.periode.type !== Periodetype.Utsettelse &&
		innslag.forrigePeriode &&
		innslag.forrigePeriode.forelder === innslag.periode.forelder) ||
	false;

export const getForelderNavn = (
	forelder: Forelder,
	navnForelder1: string,
	navnForelder2: string
): string => (forelder === 'forelder1' ? navnForelder1 : navnForelder2);
