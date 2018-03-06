import * as React from 'react';
import Lenke from 'nav-frontend-lenker';
import VeilederinfoContainer from 'app/connectedComponents/VeilederinfoContainer';
import EksterneLenker from 'app/eksterneLenker';
import { Infotekster } from 'app/redux/reducers/viewReducer';
import IntlTekst from 'app/intl/IntlTekst';
import { Permisjonsregler } from 'app/types';

export interface Props {
	permisjonsregler: Permisjonsregler;
}

const AktivitetskravInfo: React.StatelessComponent<Props> = ({
	permisjonsregler
}) => (
	<VeilederinfoContainer
		id={Infotekster.fordelingFellesperiode}
		visVeileder={false}
		type="info"
		stil="kunTekst">
		<IntlTekst
			id="skjema.fordeling.veiledning"
			values={{
				pakrevdForelder1:
					permisjonsregler.antallUkerForelder1FørFødsel +
					permisjonsregler.antallUkerMødrekvote,
				pakrevdForelder2: permisjonsregler.antallUkerFedrekvote
			}}
		/>
		<br />
		<Lenke href={EksterneLenker.nav_aktivitetskrav} target="_blank">
			<IntlTekst id="skjema.fordeling.veiledning.lenketekst" />
		</Lenke>
	</VeilederinfoContainer>
);

export default AktivitetskravInfo;
