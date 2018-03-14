import { InjectedIntl } from 'react-intl';
import { intlString } from 'app/intl/IntlTekst';
import { getUkerOgDagerFromDager } from 'app/utils/uttaksdagerUtils';

export const getVarighetString = (
	dager: number,
	intl: InjectedIntl
): string => {
	const ukerOgDager = getUkerOgDagerFromDager(dager);
	return ukerOgDager.uker > 0
		? intlString(intl, 'ukerogdager', { ...ukerOgDager })
		: intlString(intl, 'dager', { ...ukerOgDager });
};
