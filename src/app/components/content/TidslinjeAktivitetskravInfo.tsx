import * as React from 'react';
import IntlTekst from 'app/intl/IntlTekst';
import EksterneLenker from 'app/eksterneLenker';
import Lenke from 'nav-frontend-lenker';

export interface Props {
	navnForelder1: string;
	navnForelder2: string;
}

const TidslinjeAktivitetskravInfo: React.StatelessComponent<Props> = ({
	navnForelder1,
	navnForelder2
}) => (
	<div className="blokkPad-xs">
		<IntlTekst
			id="tidslinje.aktivitetskrav"
			values={{
				navnForelder1,
				navnForelder2
			}}
		/>
		<br />
		<Lenke href={EksterneLenker.nav_aktivitetskrav} target="_blank">
			<IntlTekst id="skjema.fordeling.veiledning.lenketekst" />
		</Lenke>
	</div>
);

export default TidslinjeAktivitetskravInfo;
