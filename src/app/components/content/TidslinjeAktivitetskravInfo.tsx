import * as React from 'react';
import IntlTekst, { intlString } from 'app/intl/IntlTekst';
import EksterneLenker from 'app/eksterneLenker';
import Lenke from 'nav-frontend-lenker';
import { injectIntl, InjectedIntlProps } from 'react-intl';

export interface Props {
	navnForelder1?: string;
	navnForelder2?: string;
}

const TidslinjeAktivitetskravInfo: React.StatelessComponent<
	Props & InjectedIntlProps
> = ({ navnForelder1, navnForelder2, intl }) => (
	<div className="blokkPad-xs">
		<div className="blokkPad-xxs">
			<IntlTekst
				id="tidslinje.aktivitetskrav"
				values={{
					navnForelder1: navnForelder1 || intlString(intl, 'forelder1'),
					navnForelder2: navnForelder2 || intlString(intl, 'forelder2')
				}}
			/>
		</div>
		<Lenke href={EksterneLenker.nav_aktivitetskrav} target="_blank">
			<IntlTekst id="skjema.fordeling.veiledning.lenketekst" />
		</Lenke>
	</div>
);

export default injectIntl(TidslinjeAktivitetskravInfo);
