import * as React from 'react';
import Dato from 'app/elements/dato/Dato';
import { Tidsperiode } from 'app/types';
import {
	getAntallUttaksdagerITidsperiode,
	getUkerOgDagerFromDager
} from 'app/utils/uttaksdagerUtils';
import IntlTekst from 'app/intl/IntlTekst';

import './tidsperiodeTekst.less';

export interface Props {
	tidsperiode: Tidsperiode;
	visVarighet?: boolean;
	visSluttdato?: boolean;
}

const TidsperiodeTekst: React.StatelessComponent<Props> = ({
	tidsperiode,
	visVarighet,
	visSluttdato
}) => {
	const ukerOgDager = getUkerOgDagerFromDager(
		getAntallUttaksdagerITidsperiode(tidsperiode)
	);
	return (
		<div className="tidsperiodeTekst">
			<span className="tidsperiodeTekst__periode">
				<Dato dato={tidsperiode.startdato} />
				{visSluttdato && (
					<span>
						{' '}
						- <Dato dato={tidsperiode.sluttdato} />
					</span>
				)}
			</span>
			{visVarighet && (
				<span className="tidsperiodeTekst__varighet">
					{ukerOgDager.uker > 0 ? (
						<IntlTekst id="ukerogdager" values={{ ...ukerOgDager }} />
					) : (
						<IntlTekst id="dager" values={{ ...ukerOgDager }} />
					)}
				</span>
			)}
		</div>
	);
};

export default TidsperiodeTekst;
