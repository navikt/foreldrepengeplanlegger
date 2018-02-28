import * as React from 'react';
import { Permisjonsregler } from 'app/types';
import IntlTekst from 'app/intl/IntlTekst';
import Veilederinfo from 'app/elements/veilederinfo/Veilederinfo';

export interface Props {
	forelderNavn: string;
	feriedager: number;
	permisjonsregler: Permisjonsregler;
}

const Ferieinfo: React.StatelessComponent<Props> = ({
	feriedager,
	permisjonsregler,
	forelderNavn
}) => {
	if (feriedager <= permisjonsregler.maksFeriedagerEttÅr) {
		return null;
	}
	if (feriedager > permisjonsregler.maksFeriedagerMedOverføring) {
		return (
			<div className="blokkPad-m">
				<Veilederinfo type="feil">
					<IntlTekst
						id="utsettelseskjema.ferievarsel.ulovlig"
						values={{ feriedager, forelderNavn }}
					/>
				</Veilederinfo>
			</div>
		);
	} else if (feriedager > permisjonsregler.maksFeriedagerEttÅr) {
		return (
			<div className="blokkPad-m">
				<Veilederinfo type="advarsel">
					<IntlTekst
						id="utsettelseskjema.ferievarsel.kreveroverforing"
						values={{ feriedager, forelderNavn }}
					/>
				</Veilederinfo>
			</div>
		);
	}
	return null;
};

export default Ferieinfo;
