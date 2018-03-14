import { InjectedIntl } from 'react-intl';
import { intlString } from 'app/intl/IntlTekst';
import { getUkerOgDagerFromDager } from 'app/utils/uttaksdagerUtils';
import { AppTekster } from 'app/intl/tekstnokler';

export const getVarighetString = (
	antallDager: number,
	intl: InjectedIntl
): string => {
	const { uker, dager } = getUkerOgDagerFromDager(antallDager);
	const dagerStr = intlString(intl, 'dager', {
		dager: dager
	});

	if (uker === 0) {
		return `${tallTilTekst(dager, intl)} ${dagerStr}`;
	}
	const ukerStr = intlString(intl, 'uker', { uker: uker });
	if (dager > 0) {
		return `${ukerStr} ${intlString(intl, 'og')} ${dagerStr}`;
	}
	return ukerStr;
};

export const pluralize = (count: number, single: string, other: string) =>
	count === 1 ? single : other;

export const tallTilTekst = (tall: number, intl: InjectedIntl): string => {
	if (tall > 10 || tall < 0) {
		return `${tall}`;
	} else {
		return intlString(intl, `tall-${tall}` as AppTekster);
	}
};
