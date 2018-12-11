import * as React from 'react';
import Lenke from 'nav-frontend-lenker';
import VeilederinfoContainer from 'app/connectedComponents/VeilederinfoContainer';
import EksterneLenker from 'app/eksterneLenker';
import { Infotekster } from 'app/redux/reducers/viewReducer';
import IntlTekst, { intlString } from 'app/intl/IntlTekst';
import { Permisjonsregler, Dekningsgrad } from 'app/types';
import { injectIntl, InjectedIntlProps } from 'react-intl';

export interface Props {
	permisjonsregler: Permisjonsregler;
	dekningsgrad: Dekningsgrad;
	navnForelder1?: string;
	navnForelder2?: string;
}

const AktivitetskravInfo: React.StatelessComponent<
	Props & InjectedIntlProps
> = ({
	permisjonsregler,
	dekningsgrad,
	navnForelder1,
	navnForelder2,
	intl
}) => (
	<VeilederinfoContainer
		id={Infotekster.fordelingFellesperiode}
		visVeileder={false}
		type="info"
		stil="kunTekst">
		<div className="blokkPad-xxs">
			<IntlTekst
				id="skjema.fordeling.veiledning"
				values={{
					pakrevdForelder1:
						permisjonsregler.antallUkerForelder1FørFødsel +
						permisjonsregler[dekningsgrad].antallUkerMødrekvote,
					pakrevdForelder2: permisjonsregler[dekningsgrad].antallUkerFedrekvote,
					navnForelder1: navnForelder1 || intlString(intl, 'forelder1'),
					navnForelder2: navnForelder2 || intlString(intl, 'forelder2')
				}}
			/>
		</div>
		<Lenke href={EksterneLenker.nav_aktivitetskrav} target="_blank">
			<IntlTekst id="skjema.fordeling.veiledning.lenketekst" />
		</Lenke>
	</VeilederinfoContainer>
);

export default injectIntl(AktivitetskravInfo);
