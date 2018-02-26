import * as React from 'react';
import { Permisjonsregler } from 'app/types';
import Alertstripe from 'nav-frontend-alertstriper';
import IntlTekst from 'app/intl/IntlTekst';

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
	if (feriedager <= permisjonsregler.maksFeriedagerEttAr) {
		return null;
	}
	if (feriedager > permisjonsregler.maksFeriedagerMedOverforing) {
		return (
			<div className="blokkPad-m">
				<Alertstripe type="advarsel">
					<IntlTekst
						id="utsettelseskjema.ferievarsel.ulovlig"
						values={{ feriedager, forelderNavn }}
					/>
				</Alertstripe>
			</div>
		);
	} else if (feriedager > permisjonsregler.maksFeriedagerEttAr) {
		return (
			<div className="blokkPad-m">
				<Alertstripe type="info">
					<IntlTekst
						id="utsettelseskjema.ferievarsel.kreveroverforing"
						values={{ feriedager, forelderNavn }}
					/>
				</Alertstripe>
			</div>
		);
	}
	return null;
};

export default Ferieinfo;
