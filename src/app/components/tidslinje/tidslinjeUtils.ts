import { Periodeinnslag } from 'app/components/tidslinje/types';
import { Tidsperiode, Periodetype, Forelder } from 'app/types';
import { getAntallUttaksdagerIPerioder } from 'app/utils/periodeUtils';
import { grunnfordeling } from 'app/data/grunnfordeling';
import { CalloutBorderColor } from 'app/components/callout/Callout';

/**
 * Oppsummerer et periodeinnslag
 * @param innslag
 */
export const oppsummerPeriodeinnslag = (
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
