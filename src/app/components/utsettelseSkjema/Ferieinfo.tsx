import * as React from 'react';
import { Grunnfordeling } from 'app/types';
import Alertstripe from 'nav-frontend-alertstriper';
import IntlTekst from 'app/intl/IntlTekst';

export interface Props {
	forelderNavn: string;
	feriedager: number;
	grunnfordeling: Grunnfordeling;
}

const Ferieinfo: React.StatelessComponent<Props> = ({
	feriedager,
	grunnfordeling,
	forelderNavn
}) => {
	if (feriedager <= grunnfordeling.maksFeriedagerEttAr) {
		return null;
	}
	if (feriedager > grunnfordeling.maksFeriedagerMedOverforing) {
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
	} else if (feriedager > grunnfordeling.maksFeriedagerEttAr) {
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
