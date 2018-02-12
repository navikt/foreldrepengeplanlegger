import {
	Tidslinjeinnslag,
	TidslinjeinnslagType,
	InnslagHendelsetype,
	InnslagPeriodetype
} from 'app/components/tidslinje/types';

const getHendelseinnslagTekst = (
	innslag: InnslagHendelsetype,
	navnForelder1: string,
	navnForelder2: string
) => {
	return innslag.hendelse;
};

const getPeriodeinnslagTekst = (
	innslag: InnslagPeriodetype,
	navnForelder1: string,
	navnForelder2: string
) => {
	return innslag.type;
};

export const getTidslinjeinnslagTekst = (
	innslag: Tidslinjeinnslag,
	navnForelder1: string,
	navnForelder2: string
) =>
	innslag.type === TidslinjeinnslagType.hendelse
		? getHendelseinnslagTekst(innslag, navnForelder1, navnForelder2)
		: getPeriodeinnslagTekst(innslag, navnForelder1, navnForelder2);
