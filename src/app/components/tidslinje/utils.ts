import { TidslinjeInnslag, Forelder } from './types';
import { InnslagStrekProps } from './Tidslinje';

export const hentNesteInnslag = (idx: number, innslag: TidslinjeInnslag[]): TidslinjeInnslag | undefined => {
	if (idx < innslag.length - 1) {
		return innslag[idx + 1];
	}
	return undefined;
};

export const getHendelseStrekProps = (
	forelder: Forelder,
	innslag: TidslinjeInnslag,
	nesteInnslag?: TidslinjeInnslag
): InnslagStrekProps | undefined => {
	const hendelse = innslag.hendelser.find((h) => h.forelder === forelder);
	if (!hendelse) {
		return undefined;
	}
	const hendelseFortsetter = nesteInnslag
		? nesteInnslag.hendelser.findIndex((h) => h.forelder === forelder) >= 0
		: false;
	return {
		forelder,
		hendelse,
		hendelseFortsetter,
		type: innslag.type
	};
};
