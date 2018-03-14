import * as React from 'react';
import { Permisjonsregler } from 'app/types';
import IntlTekst from 'app/intl/IntlTekst';
import Veilederinfo from 'app/elements/veilederinfo/Veilederinfo';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { getVarighetString } from 'app/intl/intlUtils';

export interface Props {
	forelderNavn: string;
	feriedager: number;
	permisjonsregler: Permisjonsregler;
}

const Ferieinfo: React.StatelessComponent<Props & InjectedIntlProps> = ({
	feriedager,
	permisjonsregler,
	forelderNavn,
	intl
}) => {
	if (feriedager <= permisjonsregler.maksFeriedagerEttÅr) {
		return (
			<Veilederinfo>
				<IntlTekst id="utsettelseskjema.veiledning.ferie" />
			</Veilederinfo>
		);
	}
	const ukerOgDager = getVarighetString(feriedager, intl);
	if (feriedager > permisjonsregler.maksFeriedagerMedOverføring) {
		return (
			<Veilederinfo type="feil">
				<IntlTekst
					id="utsettelseskjema.ferievarsel.ulovlig"
					values={{ ukerOgDager, forelderNavn }}
				/>
			</Veilederinfo>
		);
	} else if (feriedager > permisjonsregler.maksFeriedagerEttÅr) {
		return (
			<Veilederinfo type="advarsel">
				<IntlTekst
					id="utsettelseskjema.ferievarsel.kreveroverforing"
					values={{ ukerOgDager, forelderNavn }}
				/>
			</Veilederinfo>
		);
	}
	return null;
};

export default injectIntl(Ferieinfo);
