import * as React from 'react';
import VeilederinfoContainer from 'app/connectedComponents/VeilederinfoContainer';
import IntlTekst from 'app/intl/IntlTekst';
import { Infotekster } from 'app/redux/reducers/viewReducer';

export interface Props {}

const DekningsgradInfo: React.StatelessComponent<Props> = (props) => (
	<VeilederinfoContainer
		id={Infotekster.sats}
		type="info"
		visVeileder={false}
		stil="kunTekst">
		<IntlTekst id="skjema.veiledning.sats" />
	</VeilederinfoContainer>
);

export default DekningsgradInfo;
