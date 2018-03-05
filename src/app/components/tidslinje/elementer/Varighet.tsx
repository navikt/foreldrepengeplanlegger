import * as React from 'react';
import IntlTekst from 'app/intl/IntlTekst';
import { getUkerOgDagerFromDager } from 'app/utils/uttaksdagerUtils';

export interface Props {
	dager: number;
}

const Varighet: React.StatelessComponent<Props> = (props) => {
	const ukerOgDager = getUkerOgDagerFromDager(props.dager);

	return ukerOgDager.uker > 0 ? (
		<IntlTekst id="ukerogdager" values={{ ...ukerOgDager }} />
	) : (
		<IntlTekst id="dager" values={{ ...ukerOgDager }} />
	);
};

export default Varighet;
